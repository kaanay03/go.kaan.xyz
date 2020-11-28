const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./models/user')

async function authenticate(email, password, done){
    const user = await User.findOne({email: email})
    if(!user){
        return done(null, false, {message: "A user with that email does not exist."})
    }

    try{
        if(await bcrypt.compare(password, user.password)){
            return done(null, user)
        }else{
            return done(null, false, {message: "Incorrect password."})
        }
    }catch(e){
        return done(e)
    }
}

function init_passport(passport){
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticate))
    passport.serializeUser((user, done)=> done(null, user.id))
    passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=> done(err, user))
    })
}

module.exports = init_passport