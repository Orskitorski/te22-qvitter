import express from "express"
import pool from "../db.js"

const router = express.Router()

router.get("/", async (req, res)=> {

    const [tweets] = await pool.promise().query(`SELECT tweet.*, user.name FROM tweet JOIN user ON tweet.author_id = user.id ORDER BY created_at DESC;`)
   
    res.render("tweets.njk", {
        title: "Qvitter",
        message: "Welcome to Qvitter!",
        tweets: tweets
    })
})

router.get("/favourites", async (req, res)=> {

    const [favourites] = await pool.promise().query(`SELECT favourites.*, tweet.message FROM favourites JOIN tweet ON favourites.id = tweet.id ORDER BY created_at DESC;`)
    const [fav_user] = await pool.promise().query(`SELECT favourites.*, user.name FROM favourites JOIN user ON favourites.user_id = user.id;`)

    res.render("favourites.njk", {
        title: "Qvitter",
        message: "Favourite Qveets",
        favourites: favourites,
    })
})

router.get("/:id/delete", async (req, res) => {
    
    const id = req.params.id

    if (!Number.isInteger(Number(id))) {
        return res.status(400).send("Invalid ID")
    }

    await pool.promise().query(`DELETE FROM tweet WHERE id = ?`, [id])

    res.redirect("http://localhost:3000/tweets")
})

router.get("/create", async (req, res) => {
    const [user] = await pool.promise().query(`SELECT * FROM user;`)

    res.render('tweet_form.njk', {
        title: "Qvitter",
        message: "New Qveet",
        user: user
    })
})

router.post('/', async (req, res) => {  
    const { author_id, message } = req.body

    const [tweet] = await pool.promise().query('insert into tweet (author_id, message) values (?, ?)', [author_id, message])

    res.redirect("http://localhost:3000/tweets")
})

export default router