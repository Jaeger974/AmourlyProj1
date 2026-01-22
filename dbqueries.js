import db from "../db.js";

// Update subscription
export async function updateSubscription(email, newSubType, newFreqType) {
  return db.query(
    `UPDATE addresses SET sub_type = $1, freq_type = $2 WHERE account_email = $3 RETURNING *`,
    [newSubType, newFreqType, email]
  );
}

// Update user profile
export async function updateUserProfile(email, firstName, lastName, username) {
  return db.query(
    `UPDATE logins SET firstname = $1, lastname = $2, username = $3 WHERE email = $4 RETURNING *`,
    [firstName, lastName, username, email]
  );
}

// Add a new address
export async function addAddress(accountEmail, accountAddress, recipientAddress) {
  return db.query(
    `INSERT INTO addresses (account_email, account_address, recipient_address) VALUES ($1, $2, $3) RETURNING *`,
    [accountEmail, accountAddress, recipientAddress]
  );
}