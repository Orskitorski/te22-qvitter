import express from "express"
import pool from "../db.js"

const router = express.Router()

router.get("/", async (req, res)=> {
   
    res.render("index.njk", {
        title: "Qvitter",
        message: "Welcome to Qvitter!",
    })
})

export default router