

export function samplePoemHTML(recipientName, poemTitle, poemAuthor, poemHTML) {

const unwantedEmail = `http://localhost:3000/unwanted-email?recipient=${encodeURIComponent(recipientName)}    &poem=${encodeURIComponent(poemTitle)}  &author=${encodeURIComponent(poemAuthor)}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>



</style>
</head>
<p>Hi ${recipientName}! You've received a surprise Amore from ${email}.</p>
    <h1>${poem.title}</h1>
    <h3>by ${poem.author}</h3>
    <p>${poemHTML}</p>


    
    <p>If you dont want to receive Amores anymore, you can let us know that cupid missed the mark by clicking the link below:</p>
    <a href="${unwantedEmail}">View Your Amore</a>

</body>
</html>
  `;
}