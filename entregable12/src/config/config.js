import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program
  .option("-d", "Variable para debug", false)
  .option("-p <port>", "Puerto del servidor", 9090)
  .option("--mode <mode>", "Modo de trabajo", "develop");
program.parse();

console.log("Mode Option: ", program.opts().mode);

const environment = program.opts().mode;

dotenv.config({
  path:
    environment === "production"
      ? "./src/.env.production"
      : "./src/.env.development",
});

export default {
  port: process.env.PORT,
  mongoUrl: process.env.MONGODB_URI,
  privateKey: process.env.PRIVATE_KEY,
  gmailAccount: process.env.GMAIL_ACCOUNT,
  gmailAppPassword: process.env.GMAIL_APP_PASSWD,
};
