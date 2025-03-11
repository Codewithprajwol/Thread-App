import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { client, sender } from "./mailtrap.config.js"

export const sendVerificationEmail=async(email,verficationToken)=>{
    const recipients=[{email}]
    try{
       const response=await client.send({
            from:sender,
            to:recipients,
            subject:"Verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}',verficationToken),
            category:"Email Verification"
        })
        console.log('email sent successfully',response)

    }catch(error){
        console.log('error in sending email',error)
        throw new Error('error sending email',error)
    }
}