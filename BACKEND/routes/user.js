const express = require("express")
const jwt = require("jsonwebtoken");
const { authenticateJwt } = require("../middleware/user");
const { User } = require("../db")
const router = express.Router();
const bcrypt = require("bcrypt")
const generateOtp = require("../utils/generateOtp");
const sendEmail = require("../config/nodemaile");

const SECRET = process.env.SECRET;

// Store OTPs temporarily (in production, use a database or Redis)
const otpStore = {};

// Route to initiate signup
router.post('/signup-init', async (req, res) => {
    const { username, email, password } = req.body;
    
    if([username, email, password].some(field => field === undefined)){
        return res.status(400).json({
            msg : "All fields are required"
        });
    }

    try {
        const existingUser = await User.findOne({ username });
        if(existingUser) {
            return res.status(403).json({message : "User already exists"});
        }

        const existingEmail = await User.findOne({ email });
        if(existingEmail) {
            return res.status(403).json({message : "Email already in use"});
        }

        // Generate OTP
        const otp = generateOtp();
        
        // Store OTP with user data temporarily
        otpStore[email] = {
            otp,
            username,
            password,
            createdAt: new Date()
        };
        
        // Send OTP via email
        try {
            await sendEmail(email, otp);
            res.json({
                message: "OTP sent to your email",
                email
            });
        } catch (emailError) {
            console.error("Email sending error:", emailError);
            res.status(500).json({
                message: "Failed to send OTP email"
            });
        }
    } catch(error) {
        console.error("Signup init error:", error);
        res.status(500).json({ message: "Error initiating signup" });
    }
});

// Route to verify OTP and complete signup
router.post('/signup-verify', async (req, res) => {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
        return res.status(400).json({
            message: "Email and OTP are required"
        });
    }
    
    try {
        // Check if OTP exists and is valid
        const storedData = otpStore[email];
        
        if (!storedData) {
            return res.status(400).json({
                message: "OTP expired or invalid. Please request a new one."
            });
        }
        
        // Check if OTP matches
        if (storedData.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }
        
        // Check if OTP is expired (15 minutes)
        const otpAge = new Date() - new Date(storedData.createdAt);
        if (otpAge > 15 * 60 * 1000) {
            delete otpStore[email];
            return res.status(400).json({
                message: "OTP expired. Please request a new one."
            });
        }
        
        // Create user
        const hashedPassword = await bcrypt.hash(storedData.password, 10);
        const newUser = new User({
            username: storedData.username,
            email,
            password: hashedPassword
        });
        
        await newUser.save();
        
        // Clean up OTP store
        delete otpStore[email];
        
        // Generate token
        const token = jwt.sign({
            userId: newUser._id,
        }, SECRET, { expiresIn: '4h' });
        
        res.json({
            message: "User created successfully",
            token
        });
    } catch (error) {
        console.error("Signup verification error:", error);
        res.status(500).json({ message: "Error creating user" });
    }
});

// Route to initiate signin
router.post("/signin-init", async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }
    
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(403).json({
                message: "Account doesn't exist or incorrect credentials"
            });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(403).json({
                message: "Invalid username or password"
            });
        }
        
        // Generate OTP
        const otp = generateOtp();
        
        // Store OTP
        otpStore[user.email] = {
            otp,
            userId: user._id,
            createdAt: new Date()
        };
        
        // Send OTP via email
        try {
            await sendEmail(user.email, otp);
            res.json({
                message: "OTP sent to your email",
                email: user.email
            });
        } catch (emailError) {
            console.error("Email sending error:", emailError);
            res.status(500).json({
                message: "Failed to send OTP email"
            });
        }
    } catch (error) {
        console.error("Signin init error:", error);
        res.status(500).json({
            message: "Error signing in", error
        });
    }
});

// Route to verify OTP and complete signin
router.post("/signin-verify", async (req, res) => {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
        return res.status(400).json({
            message: "Email and OTP are required"
        });
    }
    
    try {
        // Check if OTP exists and is valid
        const storedData = otpStore[email];
        
        if (!storedData) {
            return res.status(400).json({
                message: "OTP expired or invalid. Please request a new one."
            });
        }
        
        // Check if OTP matches
        if (storedData.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }
        
        // Check if OTP is expired (15 minutes)
        const otpAge = new Date() - new Date(storedData.createdAt);
        if (otpAge > 15 * 60 * 1000) {
            delete otpStore[email];
            return res.status(400).json({
                message: "OTP expired. Please request a new one."
            });
        }
        
        // Generate token
        const token = jwt.sign({
            userId: storedData.userId
        }, SECRET, { expiresIn: "4h" });
        
        // Clean up OTP store
        delete otpStore[email];
        
        res.json({
            message: "Logged in successfully",
            token
        });
    } catch (error) {
        console.error("Signin verification error:", error);
        res.status(500).json({
            message: "Error signing in", error
        });
    }
});

module.exports = router;
