import express, { urlencoded } from "express";
import UserRouter from "./routes/UserRouter.js";
import { connectDB } from "./database/database.js";
import passport from "passport";
import { initializingPassport } from "./Passport/passportConfig.js";
import expressSession from "express-session"

const app = express();



connectDB();

initializingPassport(passport)

//middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(expressSession({
    secret:"secret",resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())




//ejs
app.set("view engine", "ejs");

//route
app.use("/", UserRouter);

//ejs routes
app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/register",(req,res)=>{
    res.render("register")
})
app.get("/login",(req,res)=>{
    res.render("login")
})

//listen app
app.listen(4000, () => {
  console.log("Server is Listening");
});
