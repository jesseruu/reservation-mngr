import nodemailer from "nodemailer";
import * as aws from "@aws-sdk/client-ses";
import config from "../../config";
import debugLib from "debug";

const debug = debugLib('api:EmailService');

export class EmailService {
    public static sendEmail(email: string, name: string, seats: number) {
        debug('Start send email to %s', email);
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
              from: config.emailCredentials.email,
              to: email,
              subject: "Reservación realizada",
              html: `<h1>¡Hola ${name}!</h1>
              <p>Tu reserva se ha realizado correctamente.
              Con ${seats} numero de asiestos reservados!

              Gracias por elegirnos.</p>`
            },
            (error, info) => {
              if (error) {
                debug('Email send %j', error);
              } else {
                debug('Email send %s', info.messageId);
              }
            }
        );
    }
}