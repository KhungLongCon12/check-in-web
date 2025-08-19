import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { cookies } from "next/headers";
import Provider from "@/app/components/provider";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { getUser } from "@/app/utils/auth";

export const dynamic = "auto";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "vi" }];
}

export default async function RootLayout({ children, params }) {
  const cookieStore = await cookies();
  let token_value = "";
  let user = "";
  if (cookieStore.has("user_token")) {
    const user_token = cookieStore.get("user_token");
    token_value = user_token.value;

    const res = await getUser(token_value);
    if (res != "") {
      user = res.data.user;
    } else {
    }
  }
  let language = (await params).lang;
  if (language !== "en" && language !== "vn") {
    language = "en";
  }

  return (
    <html lang={language}>
      {/* <head>
        <link rel="icon" href="/favicon.ico?qwe" type="image/x-icon" sizes="100x87"/>
      </head> */}
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider token={token_value} user={user}>
          <GoogleTagManager gtmId="G-8GZWKQ0Z65" />
          {children}
        </Provider>
      </body>
    </html>
  );
}
