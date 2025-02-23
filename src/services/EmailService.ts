import nodemailer from "nodemailer";
import * as aws from "@aws-sdk/client-ses";
import config from "../../config";

export class EmailService {
    public static async sendEmail(email: string, name: string, seats: number) {
        const ses = new aws.SES({
            apiVersion: "2010-12-01",
            region: "us-east-1",
            credentials: {
                accessKeyId: config.emailCredentials.accessKeyId,
                secretAccessKey: config.emailCredentials.secretAccessKey,
            },
        });
        const transporter = nodemailer.createTransport({
            SES: { ses, aws },
        });

        transporter.sendMail(
            {
              from: "ijesser@outlook.com",
              to: email,
              subject: "Reservación realizada",
              html: `<h1>¡Hola ${name}!</h1>
              <p>Tu reserva se ha realizado correctamente.
              Con ${seats}numero  de asiestos !

              Gracias por elegirnos</p>`
            },
            (error, info) => {
              if (error) {
                console.error('Error sending email:', error);
              } else {
                console.log('Email sent:', info.messageId);
              }
            }
        );
    }
}