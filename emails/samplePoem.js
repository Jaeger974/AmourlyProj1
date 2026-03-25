export function samplePoemHTML(email, recipientName, poemTitle, poemAuthor, poemHTML) {

const unwantedEmail = `http://localhost:3000/unwanted-email?recipient=${encodeURIComponent(recipientName)}    &poem=${encodeURIComponent(poemTitle)}  &author=${encodeURIComponent(poemAuthor)}`;


  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
<style>
  body, html {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Arial, sans-serif;
    background-color: #fff7fa;
    color: #3a2a2a;
  }

  @media (prefers-color-scheme: dark) {
    body, html {
      background-color: #2b2b2b !important;
      color: #f2f2f2 !important;
    }
    .poem-box {
      background: #3a3a3a !important;
    }
    .cta-button {
      background: #ff4f9a !important;
    }
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

  .poem-box {
    background: #ffe3ec;
    padding: 20px;
    border-radius: 12px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .poem-title {
    font-size: 24px;
    color: #b30059;
    text-align: center;
    margin-bottom: 6px;
  }

  .poem-author {
    font-size: 16px;
    text-align: center;
    color: #7a6f6f;
    margin-bottom: 16px;
  }

  .cta-button {
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
  <div class="container">

    <p>Hey you! You’ve received a surprise Amore from <strong>${email}</strong>.  
    Yes, someone out there is thinking about you. Stay humble.</p>

    <div class="divider"></div>

    <div class="poem-box">
      <div class="poem-title">${poem.title}</div>
      <div class="poem-author">by ${poem.author}</div>
      <p>${poemHTML}</p>
    </div>

    <div class="divider"></div>

    <p>
      If you’re not vibing with these poetic love‑bombs, you can tell Cupid to chill by clicking below.
    </p>

    <div class="button-wrapper">
      <a href="${unwantedEmail}" class="cta-button">
        I don’t want these emails sent to me anymore.
      </a>
    </div>

    <div class="footer">
      <p>Sent with chaotic affection by <strong>Amourly</strong> 💘</p>
    </div>

  </div>

</html>
  `;
}