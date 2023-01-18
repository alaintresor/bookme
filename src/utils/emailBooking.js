import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

class EmailBooking {
    constructor(data, hotel) {
        this.to = data.email;
        this.fname = data.fname;
        this.hotel = hotel;
        this.from = `Book Me <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            // Sendgrid
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false,
                },
                secure: false,
            });
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    // Send the actual email
    async send(template, subject, title) {
        // 1) Render HTML based on a ejs template
        const html = await ejs.renderFile(
            path.join(__dirname, `./../views/email/${template}.ejs`),
            {
                fname: this.fname,
                hotel: this.hotel
            },
        );
        // 2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: html,
        };
        // 3) Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }
    async booking() {
        if (process.env.NODE_ENV !== 'test') {
            await this.send('booking', 'booking confirmation');
        }
    }
}

export default EmailBooking;
