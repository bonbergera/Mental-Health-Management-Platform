// Backend server code  

app.post('/signin', async (req, res) => {  
    const { email, password } = req.body;  
  
    try {  
      // Query the database to find the user's account  
      const user = await db.users.findOne({ email });  
  
      if (user && await bcrypt.compare(password, user.passwordHash)) {  
        // Generate a session token or cookie and send it back to the client  
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);  
        res.json({ success: true, token });  
      } else {  
        res.status(401).json({ success: false, message: 'Invalid email or password' });  
      }  
    } catch (error) {  
      console.error('Error:', error);  
      res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });  
    }  
  });