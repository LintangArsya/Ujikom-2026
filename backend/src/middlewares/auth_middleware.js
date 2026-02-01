import jwt, { decode } from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({
            msg: 'Token tidak ada'
        })
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                msg: 'Token tidak valid'
            })
        }

        req.user = decoded
        next();
    });
};

export const allowRoles = (...roles) => {
    return(req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
            msg: 'Akses ditolak'
            })
        }
        next();
    }
}