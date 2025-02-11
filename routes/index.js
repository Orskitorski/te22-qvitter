import express from "express"
import pool from "../db.js"

const router = express.Router()

router.get("/", async (req, res)=> {
    const [tweets] = await pool.promise().query(`SELECT tweet.*, user.name FROM tweet JOIN user ON tweet.author_id = user.id ORDER BY created_at DESC;`)
    
    res.render("index.njk", {
        title: "Qvitter",
        message: "Welcome",
        tweets: tweets,
    })
})

router.get("/create", async (req, res) => {
    const [user] = await pool.promise().query(`SELECT * FROM user;`)

    res.render('tweet_form.njk', {
        title: "Qvitter",
        message: "New Qveet",
        user: user
    })
})

router.get("/:id/delete", async (req, res) => {
    
    const id = req.params.id

    await pool.promise().query(`DELETE FROM tweet WHERE id = ?`, [id])

    res.redirect("http://localhost:3000/")
})

router.post('/', async (req, res) => {  
    const { author_id, message } = req.body

    const [tweet] = await pool.promise().query('insert into tweet (author_id, message) values (?, ?)', [author_id, message])

    res.redirect("http://localhost:3000/")
})

export default router