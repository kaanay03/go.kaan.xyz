function authenticated(req, res, next){
    if (req.isAuthenticated()){
        return next()
    }

    res.redirect(`/account/login?next=${req.baseUrl}`)
}

module.exports = authenticated