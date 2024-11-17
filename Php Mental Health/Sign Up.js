// Backend server code  

const bcrypt = require('bcrypt');  

app.post('/signup', async (req, res) => {  
  const { name, email, password } = req.body;  

  try {  
    // Check if the email already exists in the database  
    const existingUser = await db.users.findOne({ email });  
    if (existingUser) {  
      return res.status(400).json({ success: false, message: 'Email already registered' });  
    }  

    // Hash the password  
    const passwordHash = await bcrypt.hash(password, 10);  

    // Create a new user in the database  
    const newUser = await db.users.create({  
      name,  
      email,  
      passwordHash  
    });  

    // Generate a session token or cookie and send it back to the client  
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);  
    res.status(201).json({ success: true, token });  
  } catch (error) {  
    console.error('Error:', error);  
    res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });  
  }  
});