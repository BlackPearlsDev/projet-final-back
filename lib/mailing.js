import nodemailer from 'nodemailer';
import {google} from 'googleapis';

const OAuth2 = google.auth.OAuth2;

// infos à obtenir sur le "https://developers.google.com/oauthplayground" et le console cloud plateform
const clientId = '585511587607-jddrtitgb93hog3jhoqe0c183rhjucdl.apps.googleusercontent.com';
const clientSecret = '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';
const refreshToken = '1//04cg_nBy-JueLCgYIARAAGAQSNwF-L9IrsVI2rzK1FeO9WqjqS6-BtNjZkw_3aweSq7iF1PxF-DpvaACarEJ-Lrw60R48mKI9bEk';
const accessToken = 'ya29.a0AVA9y1t4FX_7ktgR5yZohrijqw0YwPG4C3v1nywL9QkYXmq1-pH_9XO5mp0jX6TWBw4Y7ijaff_lyPQSO3ur6vMKRocTuzuoMJoe9QZNJqBTVlwQ53g8zZ-rTDVrhcLmpn3dPn-kNNy84WEMSO9uThgkQmzzaCgYKATASARISFQE65dr8JxZ09WfXaJJeCtUZegqJYg0163';

export default (mailTo, subject, title, text, uuid) => {

    const oauth2Client = new OAuth2(
        clientId, clientSecret, "https://developers.google.com/oauthplayground"
    )
    
    oauth2Client.setCredentials({
        refresh_token: refreshToken,
    });

   console.log(mailTo, subject, title, text, uuid);           
        
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "proeslros2@gmail.com", // le mail de l'user autorisé sur la plateforme google cloud 
            clientId: clientId, // client Id
            clientSecret: clientSecret, // client secret
            refreshToken: refreshToken,
            accessToken: accessToken,
        },
    })

    const mailOptions = { 
        from: '"projet-final" <projectfinal@gmail.com>', // sender address 
        to: mailTo, // list of receivers
        subject: subject, // Subject line
        text: "", // plain text body
        html: `<b>${title}</b><p>${text}<p><a href='http://localhost:3000/user/${uuid}/validateAccount/'>Valider mon compte</a>`, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("ça rate");
            return console.log(error);
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
        });
}