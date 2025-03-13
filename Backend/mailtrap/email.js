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

export const sendWelcomeEmail=async(email,name)=>{
    const recipients=[{email}]
    try{
        const response=await client.send({
             from:sender,
             to:recipients,
             template_uuid: "169c9d3e-0b33-4728-948c-0e077f5f6685",
             template_variables: {
               "company_info_name": "Thread",
               "name": name
             }
         })
         console.log('welcome email sent successfully',response)
 
     }catch(error){
         console.log('error in welcome email',error)
         throw new Error('error welcome email',error)
     }
}