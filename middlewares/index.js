const { jwtDecode } = require('jwt-decode');
const prisma = require('../prisma');

async function verifyToken(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(403).send({ message: 'No token provided.' });

    const token = header.split(' ')[1];

    try {
        const decoded = jwtDecode(token);
        // Check if the token is expired
        if (Date.now() >= decoded.exp * 1000) return res.status(401).send({ message: 'Token expired.' });

        const user = await prisma.user.findUnique({
            where: { employeeNumber: decoded.employeeNumber },
            select: { name },
        })

        if (!user) return res.status(401).send({ message: 'Unauthorized.' });

        req.userId = decoded._id;
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).send({ message: 'Unauthorized.' });
    }
}

module.exports = verifyToken;