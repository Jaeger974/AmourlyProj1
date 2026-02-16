import dotenv from "dotenv";
dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import { Strategy } from "passport-local";
import express from "express";
import flash from "connect-flash";
import loadUserData from "./middlewaredbrequests.js";
import { ensureAuthenticated } from "./auth.js";
import { addNewUserData, updateSubscription, updateUserAddress, updateSubscriptionWithAddress, updateRecipientDetails, updateUserProfile } from "./dbqueries.js";
import db from "./db.js";

const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const saltRounds = 10;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/static_files')));
app.use(flash());


app.use(
  session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
   cookie: {
     maxAge: 1000 * 60 * 60,
     httpOnly: true,
     secure: process.env.NODE_ENV === "production", // only HTTPS in prod
    sameSite: "lax" 
   }// 60 MINUTE SESSION DURATION
})
);

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
    res.render("PoetrySub");
});

app.get("/login", (req, res) => {
  const message = req.query.msg === "emailExists"
    ? "This email is already registered. Please log in."
    : null;

  const logoutMessage = req.query.loggedout === "true"
    ? "You are successfully logged out."
    : null;

  res.render("PS_login", { 
    message, 
    logoutMessage, 
    flash: req.flash("alert")[0] || null 
});  
   });
   

app.get("/register", (req, res) => {
    res.render("PS_register", { 
      flash: req.flash("alert")[0] || null 
    });
});

app.get("/HowitWorks", (req, res) => {

  const faqs = [
    { question: "How often are emails sent?", answer: "You can choose the frequency of your poem deliveries during the signup process. Options typically include monthly, bi-monthly, or quarterly deliveries." },
    { question: "Can I customize my Amore?", answer: "Yes! You can provide details about your relationship and preferences to help our poets create personalized verses that resonate with your unique story." },
    { question: "What if I want to change my subscription plan?", answer: "You can easily upgrade or downgrade your subscription plan at any time through your account settings." },
    { question: "Is there a trial period available?", answer: "We currently do not offer a trial period, but we do have a satisfaction guarantee. If you're not happy with your subscription, please contact our support team for assistance." },
    { question: "How do I cancel my subscription?", answer: "You can cancel your subscription at any time through your account settings free of charge. Please note that we do not offer refunds for already delivered poems." },
    { question: "Can I gift a subscription to someone else?", answer: "Yes, you can purchase a subscription as a gift for someone else. During the signup process, simply provide the recipient's details for delivery." },
    { question: "How is my information used?", answer: "We take your privacy seriously and use industry-standard security measures to protect your personal information. Your recipient's email will include your name and email so they can know who sent the Amore." }, 
    { question: "Can I pause my subscription?", answer: "No, we do not currently offer subscription pauses but we do offer effortless recipient changes. Perhaps your mother, aunt or an old flame might appreciate an Amore." }
  ];

  res.render("PS_HowitWorks", { faqs });
});

app.get("/payment", loadUserData, (req, res) => {
  try{
    if (!res.locals.user ) {
      return res.redirect("/newsignup"); // fallback if no data
    } 
  console.log("Signup Data in Session:");
  res.render("PS_payment");
}catch(err)
{
      console.error("Error in /payment route:", err);
      return res.status(500).send("Server error");
    }

});



app.get("/yourdashboard", ensureAuthenticated, loadUserData, (req, res) => {
  const flashMessage = req.flash("alert")[0] || null;


  res.render("PS_account", {
      user: res.locals.user,
      subscription: res.locals.subscription,
      flash: flashMessage,
    });
      if (!res.locals.subscription) {
    return res.redirect("/changesubscription");
}
  }
);



app.get("/changedetails", ensureAuthenticated, loadUserData, (req, res) => {
  const flashMessage = req.flash("alert")[0] || null;

  res.render("changedetails", {
    flash: flashMessage,
    user: res.locals.user,
    subscription: res.locals.subscription
  });
});

app.get("/changepassword", (req, res) => {
  const flashMessage = req.flash("alert")[0] || null;

    res.render("PS_changepassword", {
  flash: flashMessage,
});

});

app.get("/forgotpassword", (req, res) => {
  const flashMessage = req.flash("alert")[0] || null;

    res.render("PS_forgotpassword", {
  flash: flashMessage,
});
});

app.get("/changesubscription", ensureAuthenticated, loadUserData, async (req, res) => {
  const flashMessage = req.flash("alert")[0] || null;
  
  try {

    const subscription = res.locals.subscription;
    
    res.render("changesubscription", {
      currentSub: subscription.sub_type,
      currentFreq: subscription.freq_type,
      flash: flashMessage
    });

  } catch (err) {
    console.error("Error loading subscription:", err);
    res.status(500).send("Server error with subscription data");
  }
});

app.get("/newsignup", (req, res) => {
  const choice = req.query.choice || "option1";
  const flashMessage = req.flash("alert")[0] || null;

    res.render("PS_newsignupform", { 
      choice, 
      flash: flashMessage
      });
});

//API route test for render.com free hosting
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Render free hosting!" });
});


app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    successRedirect: "/yourdashboard",
    failureRedirect: "/login",
  })
);


app.get("/logout", (req, res, next) => {
  const flashMessage = req.flash("alert")[0] || null;

  req.logout(function(err) {
    if (err) { return next(err); }

    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      }
      res.clearCookie("connect.sid");
      // Redirect with a flag

      
      res.redirect("/login?loggedout=true", {
      flash: flashMessage,
      });
    });
  });
});



app.post('/save-date', (req, res) => {
  const { date } = req.body;
  console.log('Received date:', date);
  // Save to DB or session here
  res.status(200).send({ message: 'Date saved successfully' });
});



app.post("/login",
  passport.authenticate("local", {
    successRedirect: "/yourdashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.post("/yourdashboard", ensureAuthenticated, async (req, res) => {
  console.log("Dashboard session:", req.session);

  const { finalPrice } = req.body;

  if (finalPrice) {
    req.session.price = finalPrice;
    console.log("Price saved:", finalPrice);
  }

  try {
    const email = req.user.email;

    const newRecipientEmail = req.body["recipient-email"];
    const newRecipientAddress = req.body["recipient-address"];

    // Use your new DB helper function
    await updateRecipientDetails(email, newRecipientEmail, newRecipientAddress);

    res.sendStatus(200);

  } catch (err) {
    console.error("Dashboard update error:", err);
    res.status(500).send("Server error");
  }
});

app.post("/account/update-email", ensureAuthenticated, async (req, res) => {
  try {
    const accountEmail = req.user.email;
    const newRecipientEmail = req.body.email;

    if (!newRecipientEmail || !newRecipientEmail.includes("@")) {
      req.flash("alert", {
        type: "error",
        text: "Please enter a valid email address."
      });
      return res.status(400).json({ ok: false });
    }

    await updateRecipientDetails(
      accountEmail,
      newRecipientEmail,
      null // address unchanged
    );

    req.flash("alert", {
      type: "success",
      text: "Your email has been updated successfully."
    });

    return res.json({ ok: true });

  } catch (err) {
    console.error("Email update error:", err);

    req.flash("alert", {
      type: "error",
      text: "Something went wrong while updating your email."
    });

    return res.status(500).json({ ok: false });
  }
});

app.post("/account/update-address", ensureAuthenticated, async (req, res) => {
  try {
    const accountEmail = req.user.email;
    const newAddress = req.body.address;

    if (!newAddress || newAddress.trim().length < 5) {
      req.flash("alert", {
        type: "error",
        text: "Please enter a valid address."
      });
      return res.status(400).json({ ok: false });
    }

    await updateRecipientDetails(
      accountEmail,
      null,          // email unchanged
      newAddress     // update address only
    );

    req.flash("alert", {
      type: "success",
      text: "Your address has been updated successfully."
    });

    return res.json({ ok: true });

  } catch (err) {
    console.error("Address update error:", err);

    req.flash("alert", {
      type: "error",
      text: "Something went wrong while updating your address."
    });

    return res.status(500).json({ ok: false });
  }
});

app.post("/changedetails/update-details", ensureAuthenticated, async (req, res) => {
  try {
    const originalEmail = req.user.email.trim().toLowerCase();
    const { firstName, lastName, email, address, username } = req.body;

    const newEmail = email.trim().toLowerCase();

    // Basic validation
    if (!firstName || !lastName || !newEmail || !username || !address) {
      req.flash("alert", {
        type: "error",
        text: "All fields are required."
      });
      return res.redirect("/yourdashboard");
    }

     await updateUserProfile(originalEmail, firstName, lastName, username);

    if (newEmail !== originalEmail) {
          const addrRes = await updateUserAddress(originalEmail, address, newEmail);
          if (!addrRes || addrRes.rowCount === 0) {
            // No address row matched originalEmail — try matching by newEmail as fallback
            await updateUserAddress(newEmail, address);
          }
        } else {
          // Email unchanged — update address normally
          await updateUserAddress(originalEmail, address);
        }

            console.log('New account email saved:', newEmail);
            console.log('New name saved:', firstName, lastName);
            console.log('New address saved:', address);

    // Success flash message
    req.flash("alert", {
      type: "success",
      text: "Your account details have been updated successfully."
    });

    return res.redirect("/yourdashboard");

  } catch (err) {
    console.error("Account update error:", err);

    req.flash("alert", {
      type: "error",
      text: "Something went wrong while updating your details."
    });

    return res.redirect("/yourdashboard");
  }
});

app.post("/newsignup", async (req, res) => {
  try {
    const { email, firstname, lastname, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await addNewUserData(email, firstname, lastname, username, hashedPassword);
 
    req.flash("alert", {
        type: "success",
        text: "Your details have been saved. Please proceed to payment to complete your subscription!"
      });

    res.redirect("/payment");
    console.log("New user registered:", email, username);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Server error");
  }
});

app.post("/changesubscription", ensureAuthenticated, loadUserData, async (req, res) => {
  try {
    const email = req.user.email;
    const { sub_type, freq_type, address1, address2, city, postcode } = req.body;

    const validSubs = ["option1", "option2", "option3"];
    const validFreqs = ["option1", "option2", "option3", "option4"];

    if (!validSubs.includes(sub_type) || !validFreqs.includes(freq_type)) {
      return res.status(400).send("Invalid subscription type or frequency");
    }

    const pricing = {
      option1: 3.99,
      option2: 9.99,
      option3: 24.99
    };

    const freqMultiplier = {
      option1: 2.4,
      option2: 1,
      option3: 0.7,
      option4: 0.6
    };

    const newPrice = pricing[sub_type] * freqMultiplier[freq_type];
    req.session.price = newPrice.toFixed(2);

    // Build full address only for option3
    let fullAddress = null;

    if (sub_type === "option3") {
      fullAddress = [address1, address2, city, postcode]
        .filter(Boolean)
        .join(", ");

      await updateSubscriptionWithAddress(email, sub_type, freq_type, fullAddress);

    } else {
      await updateSubscription(email, sub_type, freq_type);
    }

     req.flash("alert", {
        type: "success",
        text: "Your subscription has been changed successfully!"
      });

    res.redirect("/yourdashboard?updated=true");

  } catch (err) {
    console.error("Error updating subscription:", err);
    res.status(500).send("Server error");
  }
});


passport.use(
  "local",
  new Strategy({ usernameField: 'email' }, async function verify(email, password, cb) {
    try {
      const result = await db.query("SELECT * FROM logins WHERE email = $1", [
        email,
      ]);
      if (result.rows.length > 0) {

        const user = result.rows[0];
        const storedHashedPassword = user.password;

        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {

            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }

          }
        });
      } else {
        return cb(null, false, { message: "User not found" });
      }
    } catch (err) {
      console.log(err);
      return cb(err);
    }
  }));

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const result = await db.query("SELECT * FROM logins WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO logins (email, password) VALUES ($1, $2)",
            [profile.email, "google"]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);


passport.serializeUser((user, cb) => {
cb(null, user.id); // store only ID
});

passport.deserializeUser(async (id, cb) => {
  try {
    const result = await db.query("SELECT * FROM logins WHERE id = $1", [id]);
    cb(null, result.rows[0]);
  } catch (err) {
    cb(err);
  }
});


app.listen(PORT, () => console.log(`Server running at localhost:${PORT}`));