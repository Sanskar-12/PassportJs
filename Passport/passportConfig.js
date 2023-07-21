import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/User.js";

export const initializingPassport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false);
        }

        if (user.password !== password) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );

  passport.serializeUser((user, done)=>{
    return done(null,user.id)
  });

  passport.deserializeUser(async(id, done)=>{

    try {
        const user=await User.findById(id)
        return done(null,user)
    } catch (error) {
        return done(error,false)
    }
  });
};


export const isAuthenticated=(req,res,next)=>{
    if(req.user){
        return next()
    }
    res.redirect("/login")
}