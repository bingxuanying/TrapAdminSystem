const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByEmail(username);
        if(user == null) {
            return done(null, false, {message: "No User Found"});
        }
        
        try {
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user);
            }
            else {
                return done(null, false, {message: "Password Incorrect"});
            }
        }
        catch(err) {
            return done(err);
        }
    };
    
    passport.use(new LocalStrategy({usernameField: "username"}, authenticateUser));
    
    passport.serializeUser((user, done) => { });
    passport.deserializeUser((id, done) => { });
};

module.exports = initialize