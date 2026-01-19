// services/subscriptionService.js
import db from "../db.js";

export default {
  async updateSubscription(email, subType, freqType) {
    await db.query(
      "UPDATE addresses SET sub_type = $1, freq_type = $2 WHERE account_email = $3",
      [subType, freqType, email]
    );
  },

  async getSubscription(email) {
    const result = await db.query(
      "SELECT sub_type, freq_type FROM addresses WHERE account_email = $1",
      [email]
    );
    return result.rows[0] || null;
  }
};