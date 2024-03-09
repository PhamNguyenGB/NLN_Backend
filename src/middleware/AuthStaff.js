import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(' ')[1];
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json("Token is invalid");
            }
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("Bạn chưa đăng nhập!");
    }
};

const checkVerifyTokenAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role == 'admin') {
            next();
        } else {
            return res.status(403).json({
                Mess: 'Bạn không có quyền truy cập',
                ErrC: 1,
            });
        }
    });
};

module.exports = {
    verifyToken,
    checkVerifyTokenAdmin,
};