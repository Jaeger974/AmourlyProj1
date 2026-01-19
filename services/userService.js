//Whilst working on my backend, i cam across the concept of user service layering. Due to the benefits of cleaner code and one-place user management, I have refactored my code to include a user service layer. I have also developed a subscription and address service layer for similar reasons.


// services/userService.js
import db from "../db.js";
const bcrypt = import("bcrypt");

const userCache = new Map();
const USER_TTL = 1000 * 30; // 30 seconds

function cacheUser(email, data) {
  userCache.set(email, { data, expires: Date.now() + USER_TTL });
}

function getCachedUser(email) {
  const entry = userCache.get(email);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    userCache.delete(email);
    return null;
  }
  return entry.data;
}

function invalidateUser(email) {
  userCache.delete(email);
}

function validateEmail(email) {
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    const err = new Error("Invalid email format");
    err.status = 400;
    throw err;
  }
}

function validatePassword(password) {
  if (!password || password.length < 8) {
    const err = new Error("Password must be at least 8 characters");
    err.status = 400;
    throw err;
  }
}

export default {
  async getUserByEmail(email) {
    validateEmail(email);

    const cached = getCachedUser(email);
    if (cached) return cached;

    const result = await db.query(
      "SELECT * FROM logins WHERE email = $1",
      [email]
    );

    const user = result.rows[0] || null;
    if (user) cacheUser(email, user);
    return user;
  },

  async createUser({ firstName, lastName, email, password, username }) {
    validateEmail(email);
    validatePassword(password);

    const hash = await bcrypt.hash(password, 10);

    const check = await db.query(
      "SELECT * FROM logins WHERE email = $1",
      [email]
    );
    if (check.rows.length > 0) {
      const err = new Error("Email already exists");
      err.status = 409;
      throw err;
    }

    const result = await db.query(
      "INSERT INTO logins (firstname, lastname, email, password, username) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstName, lastName, email, hash, username]
    );

    const user = result.rows[0];
    cacheUser(email, user);
    return user;
  },

  async updateEmail(oldEmail, newEmail) {
    validateEmail(newEmail);

    await db.query(
      "UPDATE logins SET email = $1 WHERE email = $2",
      [newEmail, oldEmail]
    );
    await db.query(
      "UPDATE addresses SET account_email = $1 WHERE account_email = $2",
      [newEmail, oldEmail]
    );

    invalidateUser(oldEmail);
    const updated = await this.getUserByEmail(newEmail);
    return updated;
  },

  async updatePassword(email, newPassword) {
    validateEmail(email);
    validatePassword(newPassword);

    const hash = await bcrypt.hash(newPassword, 10);

    await db.query(
      "UPDATE logins SET password = $1 WHERE email = $2",
      [hash, email]
    );

    invalidateUser(email);
  },

  async updateName(email, firstName, lastName) {
    validateEmail(email);

    await db.query(
      "UPDATE logins SET firstname = $1, lastname = $2 WHERE email = $3",
      [firstName, lastName, email]
    );

    invalidateUser(email);
  },

  async updateUsername(email, username) {
    validateEmail(email);

    await db.query(
      "UPDATE logins SET username = $1 WHERE email = $2",
      [username, email]
    );

    invalidateUser(email);
  }
};