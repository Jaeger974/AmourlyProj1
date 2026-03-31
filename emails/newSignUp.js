export function welcomeEmailHTML(firstName, token) {
  const verifyUrl = `http://localhost:3000/verify-email/${token}`;
  const dashboardUrl = `http://localhost:3000/login`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Welcome to Amourly</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background-color: #1a0a0f;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #2d1018;
  }

  .wrapper {
    width: 100%;
    padding: 40px 16px;
    background-color: #1a0a0f;
  }

  .card {
    max-width: 580px;
    margin: 0 auto;
    background-color: #fff5f5;
    border-radius: 24px;
    overflow: hidden;
  }

  /* Header band */
  .header {
    background-color: #c0344d;
    padding: 40px 40px 32px;
    text-align: center;
  }

  .header-eyebrow {
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #f8b4c0;
    margin-bottom: 10px;
  }

  .header h1 {
    font-size: 32px;
    font-weight: 700;
    color: #fff0f3;
    line-height: 1.2;
  }

  .header-heart {
    font-size: 28px;
    display: block;
    margin-top: 8px;
  }

  /* Body */
  .body {
    padding: 36px 40px;
  }

  .intro-block {
    background-color: #ffe0e5;
    border-left: 4px solid #c0344d;
    border-radius: 0 12px 12px 0;
    padding: 18px 20px;
    margin-bottom: 28px;
    color: #5a1020;
    font-size: 15px;
  }

  .intro-block p + p {
    margin-top: 10px;
  }

  .intro-block strong {
    color: #c0344d;
  }

  .divider {
    height: 1px;
    background: linear-gradient(to right, transparent, #e8a0ad, transparent);
    margin: 28px 0;
  }

  .section {
    margin-bottom: 28px;
  }

  .section h2 {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #c0344d;
    margin-bottom: 10px;
  }

  .section p {
    font-size: 15px;
    color: #4a1822;
    margin-bottom: 10px;
  }

  /* CTA Button */
  .cta-wrap {
    text-align: center;
    margin: 16px 0;
  }

  .cta-button {
    display: inline-block;
    background-color: #c0344d;
    color: #fff0f3 !important;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.06em;
    padding: 13px 28px;
    border-radius: 50px;
    border: 2px solid #a02a40;
  }

  .cta-button.secondary {
    background-color: transparent;
    color: #c0344d !important;
    border: 2px solid #c0344d;
  }

  /* Referral block */
  .referral {
    background-color: #3d0a18;
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    margin: 28px 0;
  }

  .referral h2 {
    font-size: 16px;
    font-weight: 700;
    color: #ffc8d0;
    margin-bottom: 14px;
    line-height: 1.4;
  }

  /* Footer */
  .footer {
    border-top: 1px solid #f0c4cc;
    padding: 20px 40px;
    text-align: center;
    background-color: #fff5f5;
  }

  .footer p {
    font-size: 13px;
    color: #9a4455;
    line-height: 1.6;
  }

  .footer strong {
    color: #c0344d;
  }

  @media (max-width: 600px) {
    .header, .body { padding-left: 24px; padding-right: 24px; }
    .footer { padding-left: 24px; padding-right: 24px; }
    .header h1 { font-size: 26px; }
  }
</style>
</head>
<body>
<div class="wrapper">
  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
    <tbody>
      <tr>
        <td align="center">
          <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;">
            <tbody>
              <tr>
                <td>
                  <div class="card">

                    <!-- HEADER -->
                    <div class="header">
                      <p class="header-eyebrow">Your love story starts here</p>
                      <h1>Welcome to Amourly</h1>
                      <span class="header-heart">💘</span>
                    </div>

                    <!-- BODY -->
                    <div class="body">

                      <!-- Intro -->
                      <div class="intro-block">
                        <p>Omg hiiii ${firstName} — you absolute romantic menace. You've officially joined <strong>Amourly</strong>, the personalised‑poetry‑delivery‑service your significant other didn't know they needed but will now brag about forever.</p>
                        <p>Think of us as your behind‑the‑scenes love‑gremlins. Cute, chaotic, and dangerously good with words.</p>
                      </div>

                      <div class="divider"></div>

                      <!-- Verify -->
                      <div class="section">
                        <h2>So What Happens Now?</h2>
                        <p>Simply verify your email below and we start crafting poetry that hits harder than a 3am "u up" text. You get to sit back, sip something aesthetic, and watch the romance unfold.</p>
                        <div class="cta-wrap">
                          <a href="${verifyUrl}" class="cta-button">Verify Here</a>
                        </div>
                      </div>

                      <!-- Customise -->
                      <div class="section">
                        <h2>Customise the Vibes</h2>
                        <p>Add details about your partner, tweak your preferences, or just overshare (we love that for you).</p>
                        <p>You can explore your dashboard, manage your subscription, or preview your upcoming poetry drops right here:</p>
                        <div class="cta-wrap">
                          <a href="${dashboardUrl}" class="cta-button secondary">Go to your Dashboard</a>
                        </div>
                      </div>

                      <!-- What's next -->
                      <div class="section">
                        <h2>What Happens Next?</h2>
                        <p>We'll start crafting personalised poems based on the details you've shared. Expect charm, warmth, and a little edge — because love shouldn't be boring.</p>
                        <p>Want to update your preferences or add more details about your partner? You can do that anytime:</p>
                        <div class="cta-wrap">
                          <a href="${dashboardUrl}?tab=preferences" class="cta-button secondary">Update Preferences</a>
                        </div>
                      </div>

                      <div class="divider"></div>

                      <!-- Referral -->
                      <div class="referral">
                        <h2>Entice a friend to sign up and get a month on us!</h2>
                        <a href="${dashboardUrl}" class="cta-button" style="background-color:#c0344d;border-color:#a02a40;">Hey, Checkout Amourly!</a>
                      </div>

                    </div>
                    <!-- END BODY -->

                    <!-- FOOTER -->
                    <div class="footer">
                      <p>Sent with chaotic affection by <strong>Amourly</strong> 💌<br>
                      If you didn't sign up… awkward. Just ignore me like my last ex.</p>
                    </div>

                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</body>
</html>
  `;
}