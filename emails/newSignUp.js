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
</head>
<body style="margin:0;padding:0;background-color:#1a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Helvetica Neue',sans-serif;">

  <!-- OUTER WRAPPER -->
  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#1a0a0f;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- CARD TABLE (max-width via width attr) -->
        <table align="center" width="580" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;width:100%;background-color:#fff5f5;border-radius:24px;overflow:hidden;">

          <!-- HEADER ROW -->
          <tr>
            <td align="center" bgcolor="#c0344d" style="background-color:#c0344d;padding:40px 40px 32px;border-radius:24px 24px 0 0;">
              <p style="margin:0 0 10px 0;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#f8b4c0;">Your love story starts here</p>
              <h1 style="margin:0;font-size:32px;font-weight:700;color:#fff0f3;line-height:1.2;">Welcome to Amourly</h1>
              <p style="margin:8px 0 0 0;font-size:28px;">💘</p>
            </td>
          </tr>

          <!-- INTRO ROW -->
          <tr>
            <td style="padding:36px 40px 0;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background-color:#ffe0e5;border-left:4px solid #c0344d;border-radius:0 12px 12px 0;padding:18px 20px;">
                    <p style="margin:0 0 10px;font-size:15px;color:#5a1020;line-height:1.6;">Omg hiiii ${firstName} — you absolute romantic menace. You've officially joined <strong style="color:#c0344d;">Amourly</strong>, the personalised‑poetry‑delivery‑service your significant other didn't know they needed but will now brag about forever.</p>
                    <p style="margin:0;font-size:15px;color:#5a1020;line-height:1.6;">Think of us as your behind‑the‑scenes love‑gremlins. Cute, chaotic, and dangerously good with words.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- DIVIDER -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                <tr><td style="height:1px;background-color:#e8a0ad;font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          <!-- SECTION: VERIFY -->
          <tr>
            <td style="padding:28px 40px 0;">
              <p style="margin:0 0 10px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#c0344d;">So What Happens Now?</p>
              <p style="margin:0 0 10px;font-size:15px;color:#4a1822;line-height:1.6;">Simply verify your email below and we start crafting poetry that hits harder than a 3am "u up" text. You get to sit back, sip something aesthetic, and watch the romance unfold.</p>
            </td>
          </tr>
          <!-- VERIFY BUTTON -->
          <tr>
            <td align="center" style="padding:16px 40px 0;">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center" bgcolor="#c0344d" style="background-color:#c0344d;border-radius:50px;border:2px solid #a02a40;">
                    <a href="${verifyUrl}" style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:600;letter-spacing:0.06em;color:#fff0f3;text-decoration:none;">Verify Here</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECTION: CUSTOMISE -->
          <tr>
            <td style="padding:28px 40px 0;">
              <p style="margin:0 0 10px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#c0344d;">Customise the Vibes</p>
              <p style="margin:0 0 10px;font-size:15px;color:#4a1822;line-height:1.6;">Add details about your partner, tweak your preferences, or just overshare (we love that for you).</p>
              <p style="margin:0 0 10px;font-size:15px;color:#4a1822;line-height:1.6;">You can explore your dashboard, manage your subscription, or preview your upcoming poetry drops right here:</p>
            </td>
          </tr>
          <!-- DASHBOARD BUTTON (outlined) -->
          <tr>
            <td align="center" style="padding:16px 40px 0;">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center" style="border-radius:50px;border:2px solid #c0344d;">
                    <a href="${dashboardUrl}" style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:600;letter-spacing:0.06em;color:#c0344d;text-decoration:none;">Go to your Dashboard</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECTION: WHAT NEXT -->
          <tr>
            <td style="padding:28px 40px 0;">
              <p style="margin:0 0 10px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#c0344d;">What Happens Next?</p>
              <p style="margin:0 0 10px;font-size:15px;color:#4a1822;line-height:1.6;">We'll start crafting personalised poems based on the details you've shared. Expect charm, warmth, and a little edge — because love shouldn't be boring.</p>
              <p style="margin:0;font-size:15px;color:#4a1822;line-height:1.6;">Want to update your preferences or add more details about your partner? You can do that anytime:</p>
            </td>
          </tr>
          <!-- PREFERENCES BUTTON (outlined) -->
          <tr>
            <td align="center" style="padding:16px 40px 0;">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center" style="border-radius:50px;border:2px solid #c0344d;">
                    <a href="${dashboardUrl}?tab=preferences" style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:600;letter-spacing:0.06em;color:#c0344d;text-decoration:none;">Update Preferences</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- DIVIDER -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                <tr><td style="height:1px;background-color:#e8a0ad;font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          <!-- REFERRAL BLOCK -->
          <tr>
            <td style="padding:24px 40px 0;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center" bgcolor="#3d0a18" style="background-color:#3d0a18;border-radius:16px;padding:28px 24px;">
                    <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#ffc8d0;line-height:1.4;">Entice a friend to sign up and get a month on us!</h2>
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td align="center" bgcolor="#c0344d" style="background-color:#c0344d;border-radius:50px;border:2px solid #a02a40;">
                          <a href="${dashboardUrl}" style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:600;letter-spacing:0.06em;color:#fff0f3;text-decoration:none;">Hey, Checkout Amourly!</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding:24px 40px;border-top:1px solid #f0c4cc;margin-top:24px;">
              <!-- spacer -->
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#fff5f5" style="background-color:#fff5f5;padding:0 40px 28px;border-radius:0 0 24px 24px;">
              <p style="margin:0;font-size:13px;color:#9a4455;line-height:1.6;">Sent with chaotic affection by <strong style="color:#c0344d;">Amourly</strong> 💌<br>If you didn't sign up… awkward. Just ignore me like my last ex.</p>
            </td>
          </tr>

        </table>
        <!-- END CARD -->

      </td>
    </tr>
  </table>

</body>
</html>
  `;
}