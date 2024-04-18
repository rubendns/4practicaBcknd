import dotenv from 'dotenv';
import program from '../process.js';

const enviroment = program.opts().mode.toUpperCase();

console.log("Enviroment: ", enviroment === "DEV" ? "Development Mode" : "Production Mode");

dotenv.config({
    path: enviroment === "DEV" ? "./src/config/.env.development" : "./src/config/.env.production"
});

export default {
    enviroment: enviroment,
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWD
};
