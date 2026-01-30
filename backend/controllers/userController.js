import validator from 'validator'
import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'

// api to register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please fill all the fields" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        res.json({ success: true, message: "User registered successfully", user })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api for user login
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            req.session.userId = user._id;

            req.session.save(err => {
                if (err) {
                    console.error("Session save error:", err);
                    return res.status(500).json({ success: false, message: "Session save failed" });
                }
                console.log("Session after login:", req.session);
                res.json({ success: true, message: "Login Successfully" });
            });
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api to get user profile data
const getProfile = async (req, res) => {

    try {
        if (!req.session || !req.session.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: Please log in" });
        }

        const userData = await userModel.findById(req.session.userId).select('-password');

        if (!userData) {
            console.log("User not found in database");
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, userData })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "servor message" })
    }
}

// api to update user profile
const updateProfile = async (req, res) => {
    try {
        console.log("Update Profile API Called");

        const { userId, name, phone, address, dob, gender } = req.body;
        console.log("Request Data:", req.body);

        if (!name || !phone || !address || !dob) {
            return res.json({ success: false, message: "Please fill all the fields" })
        }

        if (!userId || userId === "null") {
            return res.status(400).json({ success: false, message: "User ID is missing" });
        }

        let parsedAddress;
        try {
            parsedAddress = address ? JSON.parse(address) : null;
            if (!parsedAddress || typeof parsedAddress !== "object") {
                throw new Error();
            }
        } catch (error) {
            return res.status(400).json({ success: false, message: "Invalid address format" });
        }
        if (!parsedAddress || !parsedAddress.line1 || !parsedAddress.line2) {
            return res.status(400).json({ success: false, message: "Address fields are required" });
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })


        let imageUrl = null; 

        if (req.file) {
            console.log("Uploading image to Cloudinary...");
            const imageUpload = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "image",
            });
            imageUrl = imageUpload.secure_url;
            console.log("Image updated successfully:", imageUrl);
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { name, phone, address: parsedAddress, dob, gender,...(imageUrl && { image: imageUrl }) },
            { new: true } 
        );

        console.log("Updated User:", updatedUser);

        res.json({ success: true, message: "Profile updated successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, getProfile, updateProfile }