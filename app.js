import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Force absolute path to .env
dotenv.config({ path: join(__dirname, ".env") });

console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL);


import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import { Strategy } from "passport-local";

import db from "./db.js";
import UserService from "./services/userService.js";
import AddressService from "./services/addressService.js";
import SubscriptionService from "./services/subscriptionService.js";

console.log("ENV PATH CHECK:", join(__dirname, ".env"));


const PORT = process.env.PORT || 3000;
const app = express();
const saltRounds = 10;



app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/static_files')));


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

// Simple in-memory cache for user data
const userCache = new Map();

// Helper to set cache with TTL
function cacheUser(email, data) {
  userCache.set(email, {
    data,
    expires: Date.now() + 1000 * 30 // 30 seconds TTL
  });
}

// Helper to get cached user
function getCachedUser(email) {
  const entry = userCache.get(email);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    userCache.delete(email);
    return null;
  }
  return entry.data;
}

// Flash message helper
app.use((req, res, next) => {
  res.locals.flash = req.session.flash || null;
  delete req.session.flash;
  next();
});

// Helper to set flash messages
function setFlash(req, type, text) {
  req.session.flash = { type, text };
}


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

  res.render("PS_login", { message, logoutMessage });
});


app.get("/register", (req, res) => {
    res.render("PS_register");
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

app.get("/payment", ensureAuthenticated, async (req, res, next) => {
  try {
    const email = req.user.email;

    const user = await UserService.getUserByEmail(email);
    const address = await AddressService.getAddressByAccountEmail(email);

    res.render("payment", {
      signupData: user,
      signupData2: address,
      price: req.session.price
    });
  } catch (err) {
    next(err);
  }
});



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.get("/youraccount", ensureAuthenticated, async (req, res, next) => {
  try {
    const email = req.user.email;

    const user = await UserService.getUserByEmail(email);
    const address = await AddressService.getAddressByAccountEmail(email);

    res.render("PS_account", {
      signupData: user,
      signupData2: address,
      price: req.session.price
    });
  } catch (err) {
    next(err);
  }
});


app.get("/accountchanges", ensureAuthenticated, async (req, res) => {
  try {
    res.render("PS_account-options");

  } catch (err) {
    console.error("DB retrieval error: Account changes", err);
    res.status(500).send("Server error: account changes");
  }
});

app.get("/changepayment", (req, res) => {
    res.render("PS_changepayment");
});

app.get("/forgotpassword", (req, res) => {
    res.render("PS_forgotpassword");
});

app.get("/changesubscription", ensureAuthenticated, async (req, res) => {
  try {
    const email = req.user.email;

    const result = await db.query(
      "SELECT sub_type, freq_type FROM addresses WHERE account_email = $1",
      [email]
    );

    const subscription = result.rows[0];

    res.render("changesubscription", {
      currentSub: subscription.sub_type,
      currentFreq: subscription.freq_type,
      signupData2: result.rows[0]
    });

  } catch (err) {
    console.error("Error loading subscription:", err);
    res.status(500).send("Server error");
  }
});

app.get("/newsignup", (req, res) => {
  const choice = req.query.choice || "option1";
    res.render("PS_newsignupform", { choice });
});

//API route test for render.com free hosting
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Render free hosting!" });
});


app.get("/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/auth/google/secrets",
  passport.authenticate("google", {
    successRedirect: "/yourdashboard",
    failureRedirect: "/login",
  })
);


app.get("/logout", (req, res) => {
  req.logout(() => {
    setFlash(req, "success", "You have been logged out");
    res.redirect("/login");
  });
});

app.get("/login-failed", (req, res) => {
  setFlash(req, "error", "Invalid email or password");
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});




app.post('/save-date', (req, res) => {
  const { date } = req.body;
  console.log('Received date:', date);
  // Save to DB or session here
  res.status(200).send({ message: 'Date saved successfully' });
});

app.post("/login", passport.authenticate("local", {
  failureRedirect: "/login-failed"
}));

app.post('/yourdashboard', async (req, res) => {
  console.log("Dashboard session:", req.session);
  const {finalPrice } = req.body;

  if (finalPrice) {
    req.session.price = finalPrice;
    console.log("Price saved:", finalPrice);
  }

  try {
    const email = req.user.email;

    const newRecipientEmail = req.body['recipient-email'];
    const newRecipientAddress = req.body['recipient-address'];

    // Update only the fields that were actually provided
    await db.query(
      `UPDATE addresses 
       SET recipient_email = COALESCE($1, recipient_email),
           recipient_address = COALESCE($2, recipient_address)
       WHERE account_email = $3`,
      [newRecipientEmail, newRecipientAddress, email]
    );

    res.sendStatus(200);

  } catch (err) {
    console.error("Dashboard update error:", err);
    res.status(500).send("Server error");
  }

});

app.post("/payment", ensureAuthenticated, async (req, res) => {
  try {
    // Payment logic here...

    setFlash(req, "success", "Payment completed successfully");
    res.redirect("/yourdashboard");

  } catch (err) {
    console.error("Payment error:", err);
    setFlash(req, "error", "Payment failed");
    res.redirect("/payment");
  }
});

app.post("/changesubscription", ensureAuthenticated, async (req, res) => {
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

    let fullAddress = null;

if (sub_type === "option3") {
  fullAddress = [address1, address2, city, postcode]
    .filter(Boolean)
    .join(", ");

  await db.query(
    "UPDATE addresses SET sub_type = $1, freq_type = $2, recipient_address = $3 WHERE account_email = $4",
    [sub_type, freq_type, fullAddress, email]
  );
} else {
  await db.query(
    "UPDATE addresses SET sub_type = $1, freq_type = $2 WHERE account_email = $3",
    [sub_type, freq_type, email]
  );

  console.log("Full address being saved:", fullAddress);
}

    res.redirect("/yourdashboard?updated=true");

  } catch (err) {
    console.error("Error updating subscription:", err);
    res.status(500).send("Server error");
  }
});

app.post("/accountchanges", ensureAuthenticated, async (req, res, next) => {
  try {
    const email = req.user.email;
    const { type, field1, field2, field3, field4 } = req.body;

    switch (type) {
      case "email": {
        const updatedUser = await UserService.updateEmail(email, field1);
        req.user.email = updatedUser.email;
        break;
      }

      case "address": {
        await AddressService.updateRecipientAddress(
          email,
          field1,
          field2,
          field3,
          field4,
          null
        );
        break;
      }

      case "password": {
        await UserService.updatePassword(email, field2);
        break;
      }

      case "username": {
        await UserService.updateUsername(email, field1);
        req.user.username = field1;
        break;
      }

      case "name": {
        await UserService.updateName(email, field1, field2);
        req.user.firstname = field1;
        req.user.lastname = field2;
        break;
      }
    }

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});


//At this point i have experienced many issues with stale session data, UI not updating session, desync bugs and manual session updates here.
// I fixed this issue by overhauling from session memory to direct DB queries except for user.id.
// This decision was made on the basis of reducing errors and complexity.
// This also future-proofs my app for scaling with multiple server instances.

app.post("/newsignup", async (req, res, next) => {
  try {
    const { finalPrice } = req.body;

    const {
      email,
      password,
      firstName,
      lastName,
      username,
      addressLine1,
      addressLine2,
      city,
      postcode,
      recipientEmail,
      recipientAddressLine1,
      recipientAddressLine2,
      recipientCity,
      recipientPostcode,
      recipientCountry,
      choice,
      freqchoice
    } = req.body;

    const fullAddress = [addressLine1, addressLine2, city, postcode]
      .filter(Boolean)
      .join(", ");

    const fullAddressRecipient = [
      recipientAddressLine1,
      recipientAddressLine2,
      recipientCity,
      recipientPostcode,
      recipientCountry
    ]
      .filter(Boolean)
      .join(", ");

    const user = await UserService.createUser({
      firstName,
      lastName,
      email,
      password,
      username
    });

    await AddressService.createAddress({
      accountEmail: email,
      fullAddress,
      fullRecipientAddress: fullAddressRecipient,
      subType: choice,
      recipientEmail,
      freqType: freqchoice
    });

    req.login(user, (err) => {
      if (err) return next(err);
      req.session.price = finalPrice;
      res.redirect("/payment");
    });

  } catch (err) {
    next(err);
  }
});



passport.use("local",
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

passport.use("google",
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

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  const status = err.status || 500;
  const message = err.message || "Server error";

  // If you’re using flash:
  if (req.session) {
    req.session.flash = { type: "error", text: message };
  }

  if (req.originalUrl.startsWith("/api")) {
    return res.status(status).json({ error: message });
  }

  res.status(status).redirect("back");
});

app.listen(PORT, () => console.log(`Server running at localhost:${PORT}`));