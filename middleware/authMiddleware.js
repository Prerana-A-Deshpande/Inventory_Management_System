import jwt from 'jsonwebtoken';

const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            console.log("Auth Header:", authHeader);
            if (!authHeader) {
                return res.status(401).json({ message: "No token provided" });
            }
            const token = authHeader.split(" ")[1];
            console.log("Extracted Token:", token);
            if (!token) return res.status(401).json({ message: "No token provided" });
            //verifying token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Token:", decoded);
            req.user = decoded;

            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Forbidden: Access denied" });
            }
            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid or expired token" });
        }
    }
}
export default authMiddleware;