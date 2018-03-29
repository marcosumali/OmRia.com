const nodemailer = require('nodemailer');

nodemailer.createTestAccount((err, account) => {

    // let sessionData = req.session;
    // console.log('ini dari nodemailer session',sessionData)

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'youremailserviceid@gmail.com', // generated ethereal user
            pass: 'katakunci' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"OmRia.com" <youremailserviceid@gmail.com>', // sender address
        to: 'marco.sumali90@gmail.com', // list of receivers
        subject: 'Hello New OmRia.com', // Subject line
        text: 'Welcome to OmRia.com - where your islamic transporation are our priorotoes ;D', // plain text body
        // html: '<b></b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});