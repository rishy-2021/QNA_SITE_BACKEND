const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  module.exports.sendMail = async function sendMail(str, data) {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.EMAIL_POST,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });

    var operation = "";

    if (str == "sendAcceptEmail") {
      operation = ` Congrets ${data.name} Your Question is Verified`;
    } else if (str == "sendRejectEmail") {
      operation = ` Soory ${data.name} Your question is Rejected`;
    }

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"crud app 👻" <process.env.USER>', // sender address
      to: data.email, // list of receivers
      subject: "Response From StackOverFlow", // Subject line
      // text: "Hello world?", // plain text body
      html: html({ operation }), // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://etereal.email/message/WaQKMgKddxQDoou...
  };
}

function html({ operation }) {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  // const escapedEmail = `${email.replace(/\./g, "&#8203;.")}`;
  // const escapedHost = `${host.replace(/\./g, "&#8203;.")}`;

  // Some simple styling options
  const backgroundColor = "#f9f9f9";
  const textColor = "#444444";
  const mainBackgroundColor = "#ffffff";
  const buttonBackgroundColor = "#346df1";
  const buttonBorderColor = "#346df1";
  const buttonTextColor = "#ffffff";
  // const operation= operation;
  // console.log(operation);

  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>"Notification From StackOverFlow"</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor};  border-radius: 10px;">
    <tr>
      <td align="center"  style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>${operation}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
       
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

main().catch(console.error);
