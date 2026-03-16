import db from "./db.js";


// New users should NOT be soft-delete filtered
export async function addNewUserData(email, firstName, lastName, username, hashedPassword) {
  return db.query(
    `INSERT INTO logins (email, firstname, lastname, username, password)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [email, firstName, lastName, username, hashedPassword]
  );
}

// New addresses also should not be soft-delete filtered
export async function addAddress(accountEmail, accountAddress, recipientAddress, subType, freqType) {
  return db.query(
    `INSERT INTO addresses (account_email, account_address, recipient_address, sub_type, freq_type)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [accountEmail, accountAddress, recipientAddress, subType, freqType]
  );
}


export async function updateSubscription(email, subType, freqType) {
  return db.query(
    `UPDATE addresses
     SET sub_type = $1, freq_type = $2
     WHERE account_email = $3
       AND deleted_at IS NULL
     RETURNING *`,
    [subType, freqType, email]
  );
}

export async function updateSubscriptionWithAddress(email, subType, freqType, fullAddress) {
  return db.query(
    `UPDATE addresses
     SET sub_type = $1, freq_type = $2, recipient_address = $3
     WHERE account_email = $4
       AND deleted_at IS NULL
     RETURNING *`,
    [subType, freqType, fullAddress, email]
  );
}

export async function updateUserProfile(email, firstName, lastName, username) {
  return db.query(
    `UPDATE logins
     SET firstname = $1, lastname = $2, username = $3
     WHERE email = $4
       AND deleted_at IS NULL
     RETURNING *`,
    [firstName, lastName, username, email]
  );
}

export async function updateUserAddress(emailToMatch, fullAddress, newAccountEmail = null) {
  if (newAccountEmail) {
    return db.query(
      `UPDATE addresses
       SET account_address = $1, account_email = $3
       WHERE account_email = $2
         AND deleted_at IS NULL
       RETURNING *`,
      [fullAddress, emailToMatch, newAccountEmail]
    );
  } else {
    return db.query(
      `UPDATE addresses
       SET account_address = $1
       WHERE account_email = $2
         AND deleted_at IS NULL
       RETURNING *`,
      [fullAddress, emailToMatch]
    );
  }
}

export async function changeUserPassword(email, hashedPassword) {
  return db.query(
    `UPDATE logins
     SET password = $1
     WHERE email = $2
       AND deleted_at IS NULL
     RETURNING *`,
    [hashedPassword, email]
  );
}

export async function updateRecipientDetails(email, recipientEmail, recipientAddress) {
  return db.query(
    `UPDATE addresses
     SET recipient_email = COALESCE($1, recipient_email),
         recipient_address = COALESCE($2, recipient_address)
     WHERE account_email = $3
       AND deleted_at IS NULL
     RETURNING *`,
    [recipientEmail, recipientAddress, email]
  );
}

export async function updateRecipientPreferences(email, preferences) {
  return db.query(
    `UPDATE addresses
     SET preferences = $1
     WHERE account_email = $2
       AND deleted_at IS NULL
     RETURNING *`,
    [preferences, email]
  );
}


export async function softDeleteUserByEmail(email) {
  try {
    const timestamp = new Date();

    const updatedAddresses = await db.query(
      `UPDATE addresses
       SET deleted_at = $1
       WHERE account_email = $2
       RETURNING *`,
      [timestamp, email]
    );

    const updatedLogin = await db.query(
      `UPDATE logins
       SET deleted_at = $1
       WHERE email = $2
       RETURNING *`,
      [timestamp, email]
    );

    return { updatedAddresses, updatedLogin };

  } catch (err) {
    console.error("Error soft deleting user:", err);
    throw err;
  }
}


export async function insertTransaction(email, finalPrice, sub_type, freq_type, description, fake = true) {
  return db.query(
    `INSERT INTO transactions
       (account_email, amount, description, sub_type, freq_type, fake)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [email, finalPrice, description, sub_type, freq_type, fake]
  );
}

export async function getUserTransactions(email) {
  return db.query(
    `SELECT *
     FROM transactions
     WHERE account_email = $1
     ORDER BY created_at DESC`,
    [email]
  );
}


export async function saveFeedback(reason, satisfaction, returnLikelihood, comments) {
  return db.query(
    `INSERT INTO delete_feedback
       (reason, satisfaction, return_likelihood, comments)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [reason, satisfaction, returnLikelihood, comments]
  );
}

export async function getRecipientEmailByAccountEmail(email) {
  const result = await db.query(
    `SELECT recipient_email 
     FROM addresses 
     WHERE account_email = $1 
       AND deleted_at IS NULL`,
    [email]
  );

  return result.rows[0]?.recipient_email || null;
}

export async function saveVerificationToken(email, token) {
  return db.query(
    `INSERT INTO email_verification_tokens (email, token)
     VALUES ($1, $2)`,
    [email, token]
  );
}

export async function getEmailByToken(token) {
  const result = await db.query(
    `SELECT email FROM email_verification_tokens WHERE token = $1`,
    [token]
  );
  return result.rows[0]?.email || null;
}

export async function deleteToken(token) {
  return db.query(
    `DELETE FROM email_verification_tokens WHERE token = $1`,
    [token]
  );
}

export async function verifyUserEmail(email) {
  return db.query(
    `UPDATE logins SET email_verified = true WHERE email = $1`,
    [email]
  );
}
