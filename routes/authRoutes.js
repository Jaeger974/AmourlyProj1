import express from "express";
const router = express.Router();

import {getEmailByToken, deleteToken, verifyUserEmail, getRecipientEmailByAccountEmail} from "../database/dbqueries.js";
import sendEmail from "../services/emailExampleService.js";

// middleware/auth.js
export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}


router.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;

    const email = await getEmailByToken(token);
    if (!email) {
      return res.status(400).send("Invalid or expired token");
    }

    await verifyUserEmail(email);
    await deleteToken(token);

    req.flash("alert", {
      type: "success",
      text: "Your email has been verified!"
    });

    res.redirect("/account");

  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).send("Server error");
  }
});

router.post("/send-recipient-email", ensureAuthenticated, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const recipientEmail = await getRecipientEmailByAccountEmail(userEmail);

    if (!recipientEmail) {
      req.flash("alert", { type: "danger", text: "No recipient email found." });
      return res.redirect("/account");
    }

    await sendEmail(
      recipientEmail,
      "You've Been Gifted a Poetry Subscription",
      `<p>You’ve been gifted a poetry subscription!</p>`
    );

    req.flash("alert", { type: "success", text: "Recipient email sent!" });
    res.redirect("/account");

  } catch (err) {
    console.error("Recipient email error:", err);
    res.status(500).send("Server error");
  }
});

export default router;
