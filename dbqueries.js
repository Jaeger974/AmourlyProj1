import db from "../db.js";


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