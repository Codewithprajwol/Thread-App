import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, PASSWORD_UPDATE_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { client, sender } from "./mailtrap.config.js"

export const sendVerificationEmail=async(email,verficationToken)=>{
    const recipients=[{email}]
    if(email!='pforprajwol1234@gmail.com') return;
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

export const sendForgetPasswordEmail=async(email,resetUrl)=>{
    const recipients=[{email}]
    try{
            await client.send({
            from:sender,
            to:recipients,
            subject:"Change Password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}',resetUrl),
            category:"Password Reset"
        })

    }catch(error){
        console.log('error in forget password email',error);
        throw new Error('error forget password email',error);
    }
}

export const sendPasswordResetSuccessEmail=async(email)=>{
    try{
        const recipients=[{email}]

        await client.send({
            from:sender,
            to:recipients,
            subject:"Password Reset Success",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Password Reset Success"
        })

    }catch(err){
        console.log('error in password reset success email',err);
        throw new Error('error in password reset success email');
    }
}

export const sendPasswordUpdateSuccessEmail=async(email)=>{
    if(email!='pforprajwol1234@gmail.com') return;

    console.log('i also came here');
    const recipients=[{email}]
    try{
            await client.send({
            from:sender,
            to:recipients,
            subject:"Password Updated",
            html:PASSWORD_UPDATE_SUCCESS_TEMPLATE,
            category:"Password update"
        })

    }catch(error){
        console.log('error in update password email',error);
        throw new Error('error update password email',error);
    }
}