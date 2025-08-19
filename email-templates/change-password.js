import baseUrl from "@/app/utils/baseUrls";
import { transport } from "@/app/utils/emailConfig";
// import {templateHeader, header, footer} from "./template";

export const changePasswordEmail = async (user, token) => {
	
	const data = {
		to: user.email,
		from: "[Gomcn] <info@gomcn.net>",
		subject: "Forgot password",
		html: `
        <!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

    
            <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">

                    <table>
                        <tr>
                            <td>
                                <div class="text" style="padding: 0 2.5em; text-align: left;">
                                    <h4>Dear ${user.first_name},</h4>
                                    <p>To reset your forgotten password, please click this link below:</p>
                                    <p><a href="${baseUrl}/change-password?token=${token}&email=${user.email}" style="text-decoration: underline;">Change Password</a></p>

                                    <p>
                                        Regards, <br />
                                        Gomcn Support Team <br />
                                        All Rights Reserved by Gomcn.net
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
