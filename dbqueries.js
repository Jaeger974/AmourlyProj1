import e from "connect-flash";
import db from "./db.js";


export async function addNewUserData(email, firstName, lastName, username, hashedPassword) {
  return db.query(
    `INSERT INTO logins (email, firstname, lastname, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [email, firstName, lastName, username, hashedPassword]
  );
}

export async function updateSubscription(email, subType, freqType) {
  return db.query(
    `UPDATE addresses 
     SET sub_type = $1, freq_type = $2
     WHERE account_email = $3
     RETURNING *`,
    [subType, freqType, email]
  );
}

// Update subscription with address change
export async function updateSubscriptionWithAddress(email, subType, freqType, fullAddress) {
  return db.query(
    `UPDATE addresses 
     SET sub_type = $1, freq_type = $2, recipient_address = $3
     WHERE account_email = $4
     RETURNING *`,
    [subType, freqType, fullAddress, email]
  );
}

// Update user profile
export async function updateUserProfile(email, firstName, lastName, username) {
  return db.query(
    `UPDATE logins SET firstname = $1, lastname = $2, username = $3 WHERE email = $4 RETURNING *`,
    [firstName, lastName, username, email]
  );
}

export async function updateUserAddress(emailToMatch, fullAddress, newAccountEmail = null) {
  if (newAccountEmail) {
    return db.query(
      `UPDATE addresses
       SET account_address = $1, account_email = $3
       WHERE account_email = $2
       RETURNING *`,
      [fullAddress, emailToMatch, newAccountEmail]
    );
    
  } else {
    return db.query(
      `UPDATE addresses
       SET account_address = $1
       WHERE account_email = $2
       RETURNING *`,
      [fullAddress, emailToMatch]
    );
  }
}

export async function changeUserPassword(email, hashedPassword) {
  return db.query(
    `UPDATE logins SET password = $1 WHERE email = $2 RETURNING *`,
    [hashedPassword, email]
  );
}


export async function updateRecipientDetails(email, recipientEmail, recipientAddress) {
  return db.query(
    `UPDATE addresses
     SET recipient_email = COALESCE($1, recipient_email),
         recipient_address = COALESCE($2, recipient_address)
     WHERE account_email = $3
     RETURNING *`,
    [recipientEmail, recipientAddress, email]
  );
}

// Add a new address
export async function addAddress(accountEmail, accountAddress, recipientAddress) {
  return db.query(
    `INSERT INTO addresses (account_email, account_address, recipient_address) VALUES ($1, $2, $3) RETURNING *`,
    [accountEmail, accountAddress, recipientAddress]
  );
}

export async function deleteUserByEmail(email) {
  try {
    const deletedAddresses = await db.query(
      `DELETE FROM addresses WHERE account_email = $1 RETURNING *`,
      [email]
    );

    const deletedLogin = await db.query(
      `DELETE FROM logins WHERE email = $1 RETURNING *`,
      [email]
    );

    return { deletedAddresses, deletedLogin };

  } catch (err) {
    console.error("Error deleting user:", err);
    throw err;
  }
}

export async function insertTransaction(email, amount, sub_type, freq_type, description, fake = true) {
  return db.query(
    `INSERT INTO transactions 
       (account_email, amount, description, sub_type, freq_type, fake)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [email, amount, description, sub_type, freq_type, fake]
  );
}

export async function getUserTransactions(email) {
  return db.query(
    `SELECT * FROM transactions
     WHERE account_email = $1
     ORDER BY created_at DESC`,
    [email]
  );
}