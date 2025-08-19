import baseUrl from "@/app/utils/baseUrls";

export const header = () =>{
    return `
    <center style="width: 100%; background-color: #f1f1f1;">
        <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
        </div>
        <div style="max-width: 1024px; margin: 0 auto; background-color: #ffffff;" class="email-container">
          <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
          <tr>
                <td valign="top" class="bg_white " style="padding: 1em 2.5em 0 2.5em;">
                    <table role="presentation" class="header" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td   width="60%" class="logo" style="text-align: left;">
                                <a href=${baseUrl}>
                                <img
                                    src="https://finantaged.com/images/finantaged_header.png"
                                    alt="Finantaged"
                                    style="height: 34px; max-width: 600px; width: auto; margin-left: 20px;margin-bottom: 20px; display: block;"
                                />
                                
                                </a>
                            </td>
                            <td width="40%">
                                
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
                <tr>
                  <td valign="middle" class="hero bg_white" style="padding: 2em 4em 4em 4em;">
                  `;
}