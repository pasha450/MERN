const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

module.exports.setFlash = function (req, res, next) {
    req.flash('info', 'Form submitted successfully!');

    res.locals.flash = {
        success: req.flash("success"),
        error: req.flash("error"),
    };
    next();
};
  
module.exports.verifyToken =  function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.SESSION_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

/**
 * prevent browser back button after logout.
 * @param {*} req
 * @param {*} res
 */
module.exports.preventBackButton = function (req, res, next) {
    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
  };