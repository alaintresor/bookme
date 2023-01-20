import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import sendgridTransport from 'nodemailer-sendgrid-transport'
// bookmerwanda@gmail.com
class EmailRequest {
    constructor(data, hotel) {
        this.to = "bookmerwanda@gmail.com";
        this.fname = data.fname;
        this.lname = data.lname;
        this.email = data.email;
        this.phone = data.phone;
        this.arriveTime = data.arriveTime;
        this.arriveDate = data.arriveDate;
        this.dayNumber = data.dayNumber;
        this.roomType = data.roomType;
        this.roomNumber = data.roomNumber;
        this.price=data.price
        this.hotel = hotel;
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
                fname: this.fname,
                lname: this.lname,
                arriveTime: this.arriveTime,
                arriveDate: this.arriveDate,
                dayNumber: this.dayNumber,
                roomType: this.roomType,
                roomNumber: this.roomNumber,
                hotel: this.hotel,
                phone: this.phone,
                email: this.email,

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
            await this.send('bookingRequest', 'Booking Request');
        }
    }
}

export default EmailRequest;
