

// services/addressService.js
import db from "../db.js";

const addressCache = new Map();
const ADDRESS_TTL = 1000 * 30;

function cacheAddress(email, data) {
  addressCache.set(email, { data, expires: Date.now() + ADDRESS_TTL });
}

function getCachedAddress(email) {
  const entry = addressCache.get(email);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    addressCache.delete(email);
    return null;
  }
  return entry.data;
}

function invalidateAddress(email) {
  addressCache.delete(email);
}

function buildAddress(...parts) {
  return parts.filter(Boolean).join(", ");
}

export default {
  async getAddressByAccountEmail(email) {
    const cached = getCachedAddress(email);
    if (cached) return cached;

    const result = await db.query(
      "SELECT * FROM addresses WHERE account_email = $1",
      [email]
    );

    const address = result.rows[0] || null;
    if (address) cacheAddress(email, address);
    return address;
  },

  async createAddress({
    accountEmail,
    fullAddress,
    fullRecipientAddress,
    subType,
    recipientEmail,
    freqType
  }) {
    const result = await db.query(
      "INSERT INTO addresses (receipient_address, recipient_address, sub_type, recipient_email, account_email, freq_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [fullAddress, fullRecipientAddress, subType, recipientEmail, accountEmail, freqType]
    );

    const address = result.rows[0];
    cacheAddress(accountEmail, address);
    return address;
  },

  async updateRecipientAddress(email, line1, line2, city, postcode, country) {
    const fullRecipientAddress = buildAddress(line1, line2, city, postcode, country);

    await db.query(
      "UPDATE addresses SET recipient_address = $1 WHERE account_email = $2",
      [fullRecipientAddress, email]
    );

    invalidateAddress(email);
    return this.getAddressByAccountEmail(email);
  }
};