import { DateTime } from "luxon";
import db from "../database/db.js";


export function getNextDate(currentDate, frequency) {
  try{
    const date = DateTime.fromJSDate(currentDate);

  switch (frequency) {
    case "biweekly":
      return date.plus({ weeks: 2 }).toJSDate();

    case "monthly":
      return date.plus({ months: 1 }).toJSDate();

    case "bimonthly":
      return date.plus({ months: 2 }).toJSDate();

    case "biannual":
      return date.plus({ months: 6 }).toJSDate();

    default:
      return currentDate; // fallback
  }
} catch (error) {
    console.error("Error calculating next date:", error);
    throw error;
}};


export async function refreshScheduledDate(email) {
  try{
    const result = await db.query(
    `SELECT scheduled_send_date, freq_type FROM addresses
     WHERE account_email = $1
       AND deleted_at IS NULL`,
    [email]
  );

  if (!result.rows.length) return null;

  const { scheduled_send_date, freq_type } = result.rows[0];

  const now = new Date();

  // If the scheduled date is today or in the past → roll it forward
  if (scheduled_send_date <= now) {
    const nextDate = getNextDate(scheduled_send_date, freq_type);

    await db.query(
      `UPDATE addresses
       SET scheduled_send_date = $1
       WHERE account_email = $2
         AND deleted_at IS NULL`,
      [nextDate, email]
    );
    return nextDate;
  }
  return scheduled_send_date;

} catch (error) {
    console.error("Error refreshing scheduled date:", error);
    throw error;
  }};

export async function nextPaymentDate(email) {
  try {
    const result = await db.query(
      `SELECT sign_up_date 
       FROM addresses
       WHERE account_email = $1
         AND deleted_at IS NULL`,
      [email]
    );

    if (!result.rows.length) return null;

    const signUpDate = result.rows[0].sign_up_date;
    if (!signUpDate) return null;

    // Convert to JS Date
    const date = new Date(signUpDate);

    // Add 1 month
    const nextPayment = new Date(date);
    nextPayment.setMonth(nextPayment.getMonth() + 1);

    return nextPayment;

  } catch (error) {
    console.error("Error fetching next payment date:", error);
    throw error;
  }
}
