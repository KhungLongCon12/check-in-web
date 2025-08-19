import baseUrl from "@/app/utils/baseUrls";
import { transport } from "@/app/utils/emailConfig";
// import {templateHeader, header, footer} from "./template";

export const confirmEmailAddress = async (user, password) => {
	
	const data = {
		to: user.email,
		from: "[Gomcn] <info@gomcn.net>",
		subject: "GOMCN Account Confirm",
		html: `
        <!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

    
            <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">

                    <table>
                        <tr>
                            <td>
                                <div class="text" style="padding: 0 2.5em; text-align: left;">
                                    <h4>Greetings, ${user.first_name}.</h4>
                                    <p>It is our pleasure to be a partner with <strong>${user.first_name}</strong>! We have created an account for you to login our <strong>GOMCN</strong>.</p>
                                    <p>Please use this credential to login your account:</p>
                                    <p>
                                        User Name: ${user.email}<br>
                                        Password: ${password}<br>
                                    </p>
                                    <p> Please click the below link to verify your email address and activate your account before signing in.</p>
                                    <p><a href="${baseUrl}/confirm-email?token=${user.reset_password_token}&email=${user.email}" style="text-decoration: underline;">Confirm My Email Address</a></p>

                                    <p>
                                        Regards, <br />
                                        <strong>GOMCN</strong> Support Team <br />
                                        All Rights Reserved by <strong>GOMCN.NET</strong>
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </table>

            </body>
        </html>
        `,
	};

	try {
		await transport.sendMail(data);
	} catch (error) {
		console.log(error);
	}
	transport.close();
};
