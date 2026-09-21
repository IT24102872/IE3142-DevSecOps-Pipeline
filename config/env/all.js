// default app configuration
const port = process.env.PORT || 4000;
let db = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/nodegoat";

module.exports = {
    port,
    db,
    cookieSecret: process.env.SESSION_SECRET || "dev-only-cookie-secret-change-in-prod",
    cryptoKey: process.env.CRYPTO_KEY || "dev-only-crypto-key-change-in-prod",
    cryptoAlgo: "aes256",
    hostName: "localhost",
    environmentalScripts: []
};