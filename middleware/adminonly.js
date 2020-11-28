const User = require('../models/user')

async function adminonly(req, res, next){
    if((await User.find({})).length === 0){
        return next()
    }
    if (req.user && req.user.admin){
        return next()
    }
 
    res.status(403).render('403.ejs')
}

module.exports = adminonly