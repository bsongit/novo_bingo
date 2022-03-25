const LocalStrategy = require('passport-local').Strategy;

async function initialize(passport, getUserByEmail){
    const authenticateUser = async (email,password, done) =>  {
        const user = await getUserByEmail(email);
        if(user == null){
            return done(null, false, {message : 'No user with that email!'})
        }
        try{
            const result = password == user.password
            if(result){
                return done(null, user)
            }
            else {
                return done(null, false, {message :  'Password incorrect!'})
            }
        }
        catch(error){
            return done(error);
        }

    }
    passport.use(new LocalStrategy({usernameField : 'email'}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => done(null, getUserByEmail(id)))
}

module.exports =  initialize