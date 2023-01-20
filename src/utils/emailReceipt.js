import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import sendgridTransport from 'nodemailer-sendgrid-transport'

class EmailReceipt {
    constructor(data) {
        this.to = data.email;
        this.orderNo = data.orderNo;
        this.name = data.name;
        this.email = data.email
        this.dateTime = data.dateTime
        this.hotel = data.hotel
        this.price =data.price
        this.quantity = data.quantity
        this.total = data.total
        this.paymentMethod = data.paymentMethod
        this.paid = data.paid
        this.from = `Book Me <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            return nodemailer.createTransport(
                sendgridTransport(
                    {
                        auth: {
                            api_key: `${process.env.SENDGRID_API_KEY}`
                        }
                    }
                )
            );
        }

    }

    // Send the actual email
    async send(template, subject, title) {
        // 1) Render HTML based on a ejs template
        const html = await ejs.renderFile(
            path.join(__dirname, `./../views/email/${template}.ejs`),
            {
                orderNo: this.orderNo,
                name: this.name,
                email: this.email,
                dateTime: this.dateTime,
                hotel: this.hotel,
                price: this.price,
                quantity: this.quantity,
                total: this.total,
                paymentMethod: this.paymentMethod,
                paid: this.paid
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
    async paying() {
        if (process.env.NODE_ENV !== 'test') {
            await this.send('receipt', 'Booking Receipt');
        }
    }
}

export default EmailReceipt;
