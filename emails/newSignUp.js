export function welcomeEmailHTML(firstName, token) {
  const verifyUrl = `http://localhost:3000/verify-email/${token}`;
  const dashboardUrl = `http://localhost:3000/login`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
    body, html {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Arial, sans-serif;
    background-color: #fff7fa;
    color: #3a2a2a;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
    border-radius: 12px;
    padding: 32px;
  }

  h1 {
    color: #b30059;
    font-size: 30px;
    margin-bottom: 12px;
    text-align: center;
  }

  h2 {
    color: #b30059;
    font-size: 20px;
    margin-top: 28px;
    margin-bottom: 8px;
  }

  p {
    line-height: 1.6;
    font-size: 16px;
    margin-bottom: 16px;
  }

  .cta-button {
    align: center;
    display: inline-block;
    background: #b30059;
    color: #ffffff !important;
    padding: 10px 15px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: bold;
    margin-top: 20px;
    text-align: center;
  }

  .button-wrapper {
    text-align: center;
    margin-top: 20px;
  }

  .cta-button:hover {
    background: #8a0047;
  }

  .footer {
    text-align: center;
    margin-top: 40px;
    font-size: 13px;
    color: #7a6f6f;
  }

  .divider {
    height: 1px;
    background: #ffe3ec;
    margin: 24px 0;
  }

</style>

  </head>
<body>
  <table
    align="center"
    width="100%"
    border="0"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="padding:10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;font-size:1.1em;line-height:155%;background-color:#fab7b7;"
  >
    <tbody>
      <tr>
        <td align="center">

          <!-- INNER ROUNDED CARD -->
          <table
            align="center"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="max-width:600px;background-color:#ff8b8b;border-radius:36px;padding:20px;"
          >
            <tbody>
              <tr>
                <td align="center">

                  <!-- CONTENT CONTAINER -->
                  <div class="container">

                    <h1>Welcome to Amourly 💘</h1>

                    <p>
                      Omg hiiii ${firstName} — you absolute romantic menace.
                      You’ve officially joined <strong>Amourly</strong>, the personalised‑poetry‑delivery‑service
                      your significant other didn’t know they needed but will now brag about forever.
                    </p>

                    <p>
                      Think of us as your behind‑the‑scenes love‑gremlins.
                      Cute, chaotic, and dangerously good with words.
                    </p>

                    <div class="divider"></div>

                    <h2>So What Happens Now?</h2>
                    <p>
                      Simply verify your email below and we start crafting poetry that hits harder than a 3am “u up” text.
                      You get to sit back, sip something aesthetic, and watch the romance unfold.
                    </p>

                    <p style="text-align:center;">
                      👉 <a href="${verifyUrl}"  class="cta-button">Verify Here</a> 👈
                    </p>

                    <h2>Customise the Vibes</h2>
                    <p>
                      Add details about your partner, tweak your preferences, or just overshare
                      (we love that for you).
                    </p>

                    <p>
                      You can explore your dashboard, manage your subscription, or preview your
                      upcoming poetry drops right here:
                    </p>

                    <p style="text-align:center;">
                      👉 <a href="${dashboardUrl}" class="cta-button">Go to your Dashboard</a> 👈
                    </p>

                    <h2>What Happens Next?</h2>
                    <p>
                      We’ll start crafting personalised poems based on the details you’ve shared.
                      Expect charm, warmth, and a little edge — because love shouldn’t be boring.
                    </p>

                    <p>
                      Want to update your preferences or add more details about your partner?
                      You can do that anytime:
                    </p>

                    <p style="text-align:center;">
                      👉 <a href="${dashboardUrl}?tab=preferences" class="cta-button">Update Preferences</a> 👈
                    </p>

                    <div class="divider"></div>

                    <div class="sharefriend" style="text-align:center;">
                      <h2>Entice a friend to sign up and get a month on us!</h2>
                      <a href="${dashboardUrl}" class="cta-button">Hey, Checkout Amourly!</a>
                    </div>

                    <div class="footer">
                      <p>
                        Sent with chaotic affection by <strong>Amourly</strong> 💌  
                        If you didn’t sign up… awkward. Just ignore me like my last ex.
                      </p>
                    </div>

                  </div>
                  <!-- END CONTAINER -->

                </td>
              </tr>
            </tbody>
          </table>
          <!-- END INNER CARD -->

        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
  `;
}