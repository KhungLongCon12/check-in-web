# check-in-web

Web checking support for Gx.Đông Quang

# Init Hosting web

run firebase init

# Deploy Hosting web

You must have to input url in firebase.json if custom url

{
"hosting": {
"public": "src",
"site": "diemdanhdongquang", // Input site url here
"ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
"rewrites": [
{
"source": "**",
"destination": "/index.html"
}
]
}
}

firebase deploy --only hosting:[site]
