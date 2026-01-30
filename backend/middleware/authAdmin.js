import jwt from 'jsonwebtoken'

// admin authentication middleware

const authAdmin = async (req, res, next) => {
    try {
        // Add your custom authentication logic here if needed
        // For example, you can check for a specific header or query parameter

        // Assuming no authentication is required
        next();

    } catch (error) {
        console.error("Authentication Error:", error.message);
        return res.status(401).json({ success: false, message: "Authentication failed." });
    }
}
// authAdmin.post('/add-doctor', authAdmin, (req, res) => {
//     console.log("Request received:", req.body);
//     // Your existing add doctor logic
//     res.status(200).json({ success: true, message: "Doctor added successfully" });
// });


export default authAdmin
