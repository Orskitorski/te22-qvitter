import express from "express"
import pool from "../db.js"

const router = express.Router()

router.get("/", async (req, res)=> {
    const [tweets] = await pool.promise().query(`select tweet.*, user.name from tweet join user on tweet.author_id = user.id;`)
    
    
    res.render("index.njk", {
        title: "Qvitter",
        message: "Welcome",
        tweets: tweets
    })
})

export default router