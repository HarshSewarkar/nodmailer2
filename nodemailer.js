const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = "663488382422-rpn1e8casovhdb56q0lj5mg44qumss4a.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN = "1//04na5w1EFETgiCgYIARAAGAQSNwF-L9Ir4YN_gokvaPh2wcBOkpDwkDQU0UsMlErOs4hDPr-T9d3dUau0q9qP2uWM-hIfFuzNpqk";


const auth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
auth.setCredentials({ refresh_token: REFRESH_TOKEN });

async function mailer() {
  try {
    const ACCESS_TOKEN = await auth.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "sewatkarharsh@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
      },
    });

    const details = {
      from: "sewatkarharsh@gmail.com",
      to: "hsewatkar@gmail.com",
      subject: "Testing email sending with Nodemailer and Google APIs",
      text: "Hello, this is a test email.",
      html: "<h2>Hi, I am trying out Nodemailer and Google APIs.</h2>",
    };

    const result = await transport.sendMail(details); // Use sendMail, not mailer
    return result;
  } catch (err) {
    return err;
  }
}

mailer()
  .then((res) => {
    console.log("sent mail !", res);
  })
  .catch((err) => {
    console.error("Error sending mail:", err);
  });