"use server"

import { error } from "node:console";
import transporter from "./nodemailer.js";
import { success } from "better-auth";

interface SendEmailActionProps {
    to : string;
    subject : string;
    meta : {
        description : string;
        link : string;
    }
}

const styles = {
    container : "max-width:500px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:6px;",
    heading : "font-size:20px;color:#333;",
    description : "font-size:16px;",
    button : "display:inline-block;margin-top:15px;padding:10px 20px;background:#007bff;color:#fff;text-decoration:none;border-radius:4px;margin-top:20px;",
    buttonHover : "background:#0056b3;",
}

export async function sendEmailAction({
    to,
    subject,
    meta,
} : SendEmailActionProps){
    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to,
        subject: `ToGather.v1 - ${subject}`,
        html: `
        <div style = "${styles.container}">
            <h1 style = "${styles.heading}">${subject}</h1>
            <p style = "${styles.description}">${meta.description}</p>
            <a href = "${meta.link}" style = "${styles.button}">Verify Email</a>
        </div>`
    };

    try{
        await transporter.sendMail(mailOptions);
        return { success: true}
    }catch(error){
        console.log("sendEmailAction " + error);
        return { success: false};
    }
}