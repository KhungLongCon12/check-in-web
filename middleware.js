import { NextResponse } from 'next/server'

let locales = ['en', 'vi']

export function middleware(req) {
  let cookie = req.cookies.get('user_token');
  const { pathname, search } = req.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) 
  )
  let getLocale = "en";

  if(!pathnameHasLocale){
    if(pathname === `/`){
      return NextResponse.redirect(new URL(`/en/home/`, req.nextUrl))
    }
    else{
      return NextResponse.redirect(new URL(`/en${pathname}${search}`, req.nextUrl))
    }
  }else{
    getLocale = pathname.split("/")[1];
    if(pathname === `/${getLocale}`){
      return NextResponse.redirect(new URL(`/${getLocale}/home/`, req.nextUrl))
    }
  }
  if(cookie === undefined){
    const isProtectedRoute =
      pathname.match("/kol/profile/*") ||
      pathname.match("/admin/*") ||
      pathname.match("/brand/*") || 
      pathname.match("/chat/*");
    if (isProtectedRoute) {
        return NextResponse.redirect(new URL(`/${getLocale}/authentication`, req.nextUrl));
    }
  }else{
    const isLoggedIn = pathname === `/${getLocale}/authentication`;
    if(isLoggedIn)
    {
        return NextResponse.redirect(new URL(`/${getLocale}/home/`, req.nextUrl))
    }   
  }
  
  const response = NextResponse.next()
 
  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|images|video|fonts|.well-known).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}