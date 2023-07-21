import express from "express"
import {  login, logout, profile, register } from "../controllers/User.js"
import passport from "passport"
import {  isAuthenticated } from "../Passport/passportConfig.js"

const router=express.Router()


router.post("/register",register)

router.post("/login",passport.authenticate("local",{failureRedirect:"/register",successRedirect:"/"}),login)

router.get("/profile",isAuthenticated,profile)

router.get("/logout",logout)

export default router