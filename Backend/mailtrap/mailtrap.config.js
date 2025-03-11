import { MailtrapClient } from "mailtrap";
import 'dotenv/config'

const TOKEN = process.env.MAILTRAP_TOKEN;

export const client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Krishna",
};

// async function sendTestEmail() {
//     try {
//       const response = await client.send({
//         from: sender,
//         to: recipients,
//         subject: "You are awesome!",
//         text: "Congrats for sending test email with Mailtrap!",
//         category: "Integration Test",
//       });
//       console.log(response); // Success handler
//     } catch (error) {
//       console.error(error); // Error handler
//     }
//   }
  
//   // Call the function to send the email
//   sendTestEmail();