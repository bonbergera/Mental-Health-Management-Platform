const express = require('express');  
const nodemailer = require('nodemailer');  
const app = express();  
const port = 3000;  

// Middleware to parse incoming JSON data  
app.use(express.json());  

// Endpoint for the contact form submission  
app.post('/contact', (req, res) => {  
  const { name, email, message } = req.body;  

  // Create a transporter for sending the email  
  const transporter = nodemailer.createTransport({  
    service: 'gmail',  
    auth: {  
      user: 'your_email@gmail.com',  
      pass: 'your_password'  
    }  
  });  

  // Define the email options  
  const mailOptions = {  
    from: 'your_email@gmail.com',  
    to: 'recipient_email@example.com',  
    subject: 'New Message from Contact Form',  
    text: `  
      Name: ${name}  
      Email: ${email}  
      Message: ${message}  
    `  
  };  

  // Send the email  
  transporter.sendMail(mailOptions, (error, info) => {  
    if (error) {  
      console.log(error);  
      res.status(500).json({ message: 'Error sending the email' });  
    } else {  
      console.log('Email sent: ' + info.response);  
      res.status(200).json({ message: 'Email sent successfully' });  
    }  
  });  
});  

app.listen(port, () => {  
  console.log(`Server is running on port ${port}`);  
});