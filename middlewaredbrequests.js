import db from "./db.js";


// middleware/loadUserData.js
export default async function loadUserData(req, res, next) {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect("/login");
    }

    const email = req.user.email;

    // Fresh login info
    const userResult = await db.query(
      "SELECT firstname, lastname, email, username FROM logins WHERE email = $1",
      [email]
    );

    // Fresh subscription + address info
    const addressResult = await db.query(
      "SELECT * FROM addresses WHERE account_email = $1",
      [email]
    );

    // Make available to EJS
    res.locals.user = userResult.rows[0];
    res.locals.subscription = addressResult.rows[0] || null;
    res.locals.price = req.session.price;

    next();
  } catch (err) {
    console.error("loadUserData middleware error:", err);
    res.status(500).send("Server error");
  }
};
