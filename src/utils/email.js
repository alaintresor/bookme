import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `Barefoot Nomad <${process.env.EMAIL_FROM}>`;
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
        firstName: this.firstName,
        url: this.url,
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

  async sendWelcome() {
    if (process.env.NODE_ENV !== 'test') {
      await this.send('welcome', 'Welcome to Barefoot nomad');
    }
  }

  async sendPasswordReset() {
    await this.send('passwordreset', 'Your password reset token');
  }
  async newReqManagerNotif() {
    if (process.env.NODE_ENV !== 'test') {
      await this.send('newRequest-manager', 'Trip request created.');
    }
  }
  async newReqRequesterNotif() {
    if (process.env.NODE_ENV !== 'test') {
      await this.send('newRequest-requester', 'Trip request created.');
    }
  }
  async updatedRequest() {
    if (process.env.NODE_ENV !== 'test') {
      await this.send('updatedRequest', 'Trip request updated!.');
    }
  }
  async deletedRequest() {
    if (process.env.NODE_ENV !== 'test') {
      await this.send('deletedRequest', 'Trip request deleted!.');
    }
  }
  async approvedRequest() {
    if (process.env.NODE_ENV !== 'test') {
      await this.send('approvedRequest', 'Trip request Approved.');
    }
  }
  async rejectedRequest() {
    if (process.env.NODE_ENV !== 'test') {
      await this.send('rejectedRequest', 'Trip request Rejected!.');
    }
  }
  async commentOnRequest() {
    if (process.env.NODE_ENV !== 'test') {
      await this.send('commentOnRequest', 'Commented on trip request.');
    }
  }
}

export default Email;
