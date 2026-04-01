export function samplePoemHTML(recipientName, poemTitle, poemAuthor, poemHTML) {

const unwantedEmail =
`http://localhost:3000/unwanted-email?recipient=${encodeURIComponent(recipientName)}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Someone sent you an Amore 💘</title>
</head>
<body style="margin:0; padding:0; box-sizing:border-box; background-color:#1a0a0f; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif; font-size:16px; line-height:1.6; color:#2d1018;">

<div style="width:100%; padding:40px 16px; background-color:#1a0a0f;">
  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
    <tbody>
      <tr>
        <td align="center">
          <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;">
            <tbody>
              <tr>
                <td>

                  <div style="max-width:580px; margin:0 auto; background-color:#fff5f5; border-radius:24px; overflow:hidden;">

                    <!-- HEADER -->
                    <div style="background-color:#c0344d; padding:36px 40px 28px; text-align:center;">
                      <p style="font-size:12px; letter-spacing:0.18em; text-transform:uppercase; color:#f8b4c0; margin:0 0 10px 0;">
                        Someone's thinking of you
                      </p>

                      <h1 style="font-size:28px; font-weight:700; color:#fff0f3; line-height:1.3; margin:0;">
                        You've been hit by an Amore
                      </h1>

                      <span style="font-size:26px; display:block; margin-top:8px;">💘</span>
                    </div>

                    <!-- BODY -->
                    <div style="padding:36px 40px;">

                      <!-- Greeting -->
                      <div style="background-color:#ffe0e5; border-left:4px solid #c0344d; border-radius:0 12px 12px 0; padding:18px 20px; margin-bottom:28px; color:#5a1020; font-size:15px;">
                        <p style="margin:0;">
                          Oop — guess what. Someone just dropped an Amore on you like a chaotic emotional grenade.<br><br>
                          Yep. A real human being thought, "You know who deserves unsolicited tenderness today? <em>You.</em>"
                        </p>
                      </div>

                      <div style="height:1px; background:linear-gradient(to right, transparent, #e8a0ad, transparent); margin:28px 0;"></div>

                      <!-- Poem -->
                      <div style="background-color:#3d0a18; border-radius:16px; padding:32px 28px; margin:8px 0; text-align:center;">
                        <div style="font-size:20px; font-weight:700; color:#ffc8d0; margin-bottom:4px;">
                          ${poemTitle}
                        </div>

                        <div style="font-size:13px; color:#e8a0ad; margin-bottom:24px; letter-spacing:0.04em;">
                          by ${poemAuthor}
                        </div>

                        <div style="font-size:15px; color:#fff0f3; line-height:1.85; white-space:pre-line; text-align:left; font-style:italic;">
                          ${poemHTML}
                        </div>
                      </div>

                      <div style="height:1px; background:linear-gradient(to right, transparent, #e8a0ad, transparent); margin:28px 0;"></div>

                      <!-- Opt-out -->
                      <div style="margin-top:8px;">
                        <p style="font-size:15px; color:#4a1822; margin:0 0 18px 0;">
                          If you're not vibing with these poetic love‑bombs, you can tell Cupid to chill by clicking below.
                        </p>

                        <div style="text-align:center; margin:4px 0 8px;">
                          <a href="${unwantedEmail}" 
                             style="display:inline-block; background-color:transparent; color:#c0344d; text-decoration:none; font-size:13px; font-weight:600; letter-spacing:0.04em; padding:12px 24px; border-radius:50px; border:2px solid #c0344d;">
                            Please stop emotionally ambushing me with poems.
                          </a>
                        </div>
                      </div>

                    </div>
                    <!-- END BODY -->

                    <!-- FOOTER -->
                    <div style="border-top:1px solid #f0c4cc; padding:20px 40px; text-align:center; background-color:#fff5f5;">
                      <p style="font-size:13px; color:#9a4455; margin:0;">
                        Sent with chaotic affection by <strong style="color:#c0344d;">Amourly</strong> 💘
                      </p>
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