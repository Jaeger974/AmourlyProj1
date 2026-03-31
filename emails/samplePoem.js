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
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background-color: #e28fa9;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #faa1ba;
  }

  .wrapper {
    width: 100%;
    padding: 40px 16px;
    background-color: #1a0a0f;
    border-radius: 24px;
  }

  .card {
    max-width: 580px;
    margin: 0 auto;
    background-color: #fff5f5;
    border-radius: 24px;
    overflow: hidden;
  }

  /* Header */
  .header {
    background-color: #c0344d;
    padding: 36px 40px 28px;
    text-align: center;
    border-radius: 24px 24px 0 0;
  }

  .header-eyebrow {
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #f8b4c0;
    margin-bottom: 10px;
  }

  .header h1 {
    font-size: 28px;
    font-weight: 700;
    color: #fff0f3;
    line-height: 1.3;
  }

  .header-heart {
    font-size: 26px;
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

  .divider {
    height: 1px;
    background: linear-gradient(to right, transparent, #e8a0ad, transparent);
    margin: 28px 0;
  }

  /* Poem box */
  .poem-box {
    background-color: #3d0a18;
    border-radius: 16px;
    padding: 32px 28px;
    margin: 8px 0;
    text-align: center;
  }

  .poem-title {
    font-size: 20px;
    font-weight: 700;
    color: #ffc8d0;
    margin-bottom: 4px;
  }

  .poem-author {
    font-size: 13px;
    color: #e8a0ad;
    margin-bottom: 24px;
    letter-spacing: 0.04em;
  }

  .poem-content {
    font-size: 15px;
    color: #fff0f3;
    line-height: 1.85;
    white-space: pre-line;
    text-align: left;
    font-style: italic;
  }

  /* Opt-out section */
  .optout-block {
    margin-top: 8px;
    border-radius: 12px;
    padding: 18px 20px;
    background-color: #ffe0e5;
  }

  .optout-block p {
    font-size: 15px;
    color: #4a1822;
    margin-bottom: 18px;
  }

  /* CTA */
  .cta-wrap {
    text-align: center;
    margin: 4px 0 8px;
  }

  .cta-button {
    display: inline-block;
    background-color: transparent;
    color: #c0344d !important;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    padding: 12px 24px;
    border-radius: 50px;
    border: 2px solid #c0344d;
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
  }

  .footer strong {
    color: #c0344d;
  }

  @media (max-width: 600px) {
    .header, .body { padding-left: 24px; padding-right: 24px; }
    .footer { padding-left: 24px; padding-right: 24px; }
    .header h1 { font-size: 22px; }
    .poem-box { padding: 24px 20px; }
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
                      <p class="header-eyebrow">Someone's thinking of you</p>
                      <h1>You've been hit by an Amore</h1>
                      <span class="header-heart">💘</span>
                    </div>

                    <!-- BODY -->
                    <div class="body">

                      <!-- Greeting -->
                      <div class="intro-block">
                        <p>Oop — guess what. Someone just dropped an Amore on you like a chaotic emotional grenade.<br><br>
                        Yep. A real human being thought, "You know who deserves unsolicited tenderness today? <em>You.</em>"</p>
                      </div>

                      <div class="divider"></div>

                      <!-- Poem -->
                      <div class="poem-box">
                        <div class="poem-title">${poemTitle}</div>
                        <div class="poem-author">by ${poemAuthor}</div>
                        <div class="poem-content">${poemHTML}</div>
                      </div>

                      <div class="divider"></div>

                      <!-- Opt-out -->
                      <div class="optout-block">
                        <p>If you're not vibing with these poetic love‑bombs, you can tell Cupid to chill by clicking below.</p>
                        <div class="cta-wrap">
                          <a href="${unwantedEmail}" class="cta-button">Please stop emotionally ambushing me with poems.</a>
                        </div>
                      </div>

                    </div>
                    <!-- END BODY -->

                    <!-- FOOTER -->
                    <div class="footer">
                      <p>Sent with chaotic affection by <strong>Amourly</strong> 💘</p>
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