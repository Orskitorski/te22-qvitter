import express from "express"
import pool from "../db.js"

const router = express.Router()

router.get("/", async (req, res)=> {
    const [tweets] = await pool.promise().query(`select tweet.*, user.name from tweet join user on tweet.author_id = user.id order by created_at DESC;`)
    
    res.render("index.njk", {
        title: "Qvitter",
        message: "Welcome",
        tweets: tweets,
    })
})

router.get("/new", async (req, res) => {
    const [user] = await pool.promise().query(`select * from user;`)

    res.render('tweet_form.njk', {
        title: "Qvitter",
        message: "New Qveet",
        user: user
    })
})

router.post('/', async (req, res) => {  
    const { author_id, message } = req.body

    const [tweet] = await pool.promise().query('insert into tweet (author_id, message) values (?, ?)', [author_id, message])

    res.redirect("http://localhost:3000/")
})

export default router