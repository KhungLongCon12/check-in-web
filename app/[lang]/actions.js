'use server'
import { cookies } from 'next/headers'

export const destroyCookie  = async (cookie_name="user_token") => {
	const cookieStore = await cookies()
	cookieStore.set({name: 'user_token',
        value: '',
        maxAge: 0,});
};