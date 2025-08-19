import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
	// Yes. SMTP!
	service: "SMTP",
	host: "smtp.gmail.com",//"email-smtp.ap-southeast-1.amazonaws.com", // Amazon email SMTP hostname
	secureConnection: true, // use SSL
	port: 587,//465, // port for secure SMTP
	auth: {
		user: "info@gomcn.net",//process.env.AWS_SES_USER, // Use from Amazon Credentials
		pass: "vvcphriqqwkchxnn",//process.env.AWS_SES_PASSWORD, // Use from Amazon Credentials
	},
});

