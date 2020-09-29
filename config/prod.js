// production keys
module.exports = {
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    redirectDomain: process.env.REDIRECT_DOMAIN,
    googleClientID: process.env.GOOGLE_CLIENT_ID, 
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    facebookClientID: process.env.FACEBOOK_CLIENT_ID, 
    facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET
};