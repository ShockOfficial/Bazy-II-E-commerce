const rolePermissions = (allowedRoles) => {
    return (req, res, next) => {
        if (allowedRoles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    };
};

module.exports = rolePermissions;