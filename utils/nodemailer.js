const nodemailer = require("nodemailer");

const sendmail = async (res, User , url ) => {
    try {
        
const transport = nodemailer.createTransport({
    service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: process.env.EMAIL_U, 
                pass: process.env.EMAIL_KEY,
    },
  });
  const mailOptions = {
    from: "SHOFY inventory management Private Ltd. <Shofy@media.pvt.ltd>",
    to: User.email,
    subject: "Password Reset Link",
    text: "Do not share this link to anyone",
    html: `<a href="${url}"class="text-4xl" >Reset Password Link</a>`,
};
  transport.sendMail(mailOptions, async (err, info) => {
    if (err) return res.send(err);
    // console.log(info);

    User.resetPasswordToken = 1;
    await User.save();

    res.redirect("/");
});
    } catch (error) {
        res.send(error);
        
    }
}

module.exports = sendmail;