const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const passport = require('passport')
const unauthenticated = require('../middleware/unauthenticated')
const authenticated = require('../middleware/authenticated')
const adminonly = require('../middleware/adminonly')
   
const router = express.Router()

router.get('/login', unauthenticated, (req, res)=>{
    let next = req.query.next
    if(!next) next = '/'
    res.render('login.ejs', {next: next})
})

router.get('/register', adminonly, (req, res)=>{
    res.render('register.ejs')
})

router.post('/register', adminonly, async (req, res)=>{
    try{
        hashed_pass = await bcrypt.hash(req.body.password, 10)
        
        const user = new User({
            name: req.body.name,
            email: req.body.email, 
            password: hashed_pass
        })
        if((await User.find({})).length === 0){
            user.admin = true
        }
        user.save()
        res.redirect('/')
    }catch{
        res.redirect('/account/register')
    }
})

router.post('/login', unauthenticated, passport.authenticate('local', {
    failureRedirect: '/account/login',
    failureFlash: true
}), (req, res)=> res.redirect(`${req.query.next}`))

router.post('/logout', authenticated, (req, res)=>{
    req.logOut()
    res.redirect('/')
})

router.get('/edit', authenticated, (req, res)=>{
    res.render('editprofile.ejs')
})

router.post('/edit', authenticated, async (req, res)=>{
    if(req.body.name.length > 26){
        req.flash('error', 'That name is too long. Try again with a shorter one')
        res.redirect('/account/edit')
        return
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)){
        req.flash('error', 'That email is invalid. Make sure you input a valid email address.')
        res.redirect('/account/edit')
        return
    }

    req.user.name = req.body.name
    req.user.email = req.body.email
    req.user.save()

    if(!req.body.oldpassword && !req.body.newpassword){
        req.flash('success', 'Your profile has been saved.')
    }else{
        if(!await bcrypt.compare(req.body.oldpassword, req.user.password)){
            req.flash('error', 'Invalid old password. Passwords not saved.')
        }else{
            if (req.body.newpassword){
                hashed_pass = await bcrypt.hash(req.body.newpassword, 10)
                req.user.password = hashed_pass
                req.user.save()
                req.flash('success', 'Your profile along with new password have been saved. Please sign in again.')
                req.logOut()
                res.redirect('/account/login')
                return
            }else{
                req.flash('error', 'You must enter a new password.')
            }
        }
    }
    res.redirect('/account/edit')
})

module.exports = router;