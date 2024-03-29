import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/users.js';

async function login(req, res) {
    const { email, password } = req.body;
  
    try {
        console.log('Attempting to log in with email:', email);
        const user = await User.findOne({ where: { email: email.toLowerCase() } });
  
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(404).json({ message: 'User not found' });
        }
  
        if (!user.password) {
            console.log('Password not set for user:', email);
            return res.status(500).json({ message: 'Password not set' });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
            console.log('Password mismatch for email:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        console.log('Login successful for email:', email);
  
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function signUp(req, res) {
    const { name, email, password, phoneNumber, city, country, username } = req.body;
  
    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create the new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            city,
            country,
            username
        });
  
        // Generate token for the new user
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
        return res.status(201).json({ newUser, token });
    } catch (error) {
        console.error('Error during sign up:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export { login, signUp };
