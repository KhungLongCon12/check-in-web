'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import axios from "axios";
import baseUrl from "@/app/utils/baseUrls";
import FormData from 'form-data';


export const handleLogin = async (t, user_id, fcm_token, routeNext, role ='') => {
	const cookieStore = await cookies();
	cookieStore.set("fcm_token", fcm_token);
	cookieStore.set("user_token", t, { maxAge: 86400 });
	cookieStore.set("user_id", user_id, { maxAge: 86400 });
};

function isRedirectError(error) {
	console.log(error.digest)
    return !!error.digest?.startsWith("NEXT_REDIRECT")
}

export const handleLogout = async () => {
	const cookieStore = await cookies();
	try{
		const fcm_token = cookieStore.get('fcm_token');
		if(fcm_token !== undefined){
			const payload = {fcm_token: cookieStore.get('fcm_token').value}
			const res = await axios.post(`${baseUrl}/api/users/signout`,payload,
				{headers: {
			"authorization": cookieStore.get('user_token').value,
			}});
		}
		cookieStore.delete("fcm_token");
		cookieStore.delete("user_token");
		cookieStore.delete("user_id");
		
	}catch(err){
	if (isRedirectError(err)) {
		console.error(err);
		throw err;
		}
	console.log(err)
	}finally{
		redirect(baseUrl);
	}
	
};

export const destroyCookie  = async (cookie_name="user_token") => {
	const cookieStore = await cookies()
	cookieStore.set(cookie_name,"",{maxAge:0})
};

export const handleRedirect = async (role ='', lang='en') => {
	if(role){
        switch(role){
          // case 'admin':
          // 	window.location.href = baseUrl+'/admin';
          // 	break;
          // case 'user':
          // 	window.location.href = baseUrl+'/user';
          default:
            redirect(`${baseUrl}/${lang}/home`);
        }
      }
};

export const getUser = async (token) =>{
	try{
	  const res = await axios.get(`${baseUrl}/api/users/update`,{headers: {
		"Authorization": token,
	  }});
	  return res
	 }catch(err){
	  // if(typeof(err.response) !== "undefined"){
	  //   if(err.response.data && err.response.data.message == "jwt expired"){   
	  //     console.log(err)
	  //     return null;
	  //   }
	  // }
	//   console.log(err)
	  return "";
	 }
  }
export const isCorrectRecapcha = async (captcha) =>{

	const SECRET_KEY = '0x4AAAAAAAJjXazvy1Bk8YFzT10_AZ76An8';

	
	// Validate the token by calling the
	// "/siteverify" API endpoint.
	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

	const payload = {secret: SECRET_KEY, response: captcha}
	const result = await axios.post(url, payload, {
		headers: {
			"Content-Type": "application/json; charset=utf-8" 
		}
	});

	if (result.data.success){
		return true;
	}
	return false;


	// const VERIFY_URL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_INVISIBLE_SECRET_KEY}&response=${captcha}`;

	
	// const payload = {
	// };
	// const response = await axios.post(VERIFY_URL, payload,{
		
	// 	headers: {
	// 		"Content-Type": "application/x-www-form-urlencoded; charset=utf-8" 
	// 	}}
	// 	);
	// return response.data && response.data.success;
	}