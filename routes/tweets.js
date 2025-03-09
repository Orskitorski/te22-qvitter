import express from "express"
import pool from "../db.js"
import { ExpressValidator } from "express-validator"

const router = express.Router()

router.get("/", async (req, res)=> {

    const [tweets] = await pool.promise().query(
        `SELECT tweet.*, user.name FROM tweet 
        JOIN user ON tweet.author_id = user.id 
        ORDER BY created_at DESC;`)
   
    res.render("tweets.njk", {
        message: "Welcome to Qvitter!",
        tweets: tweets
    })
})

router.get("/:id/favourites", async (req, res) => {
    const id = req.params.id

    if (!Number.isInteger(Number(id))) {
        return res.status(400).send("Invalid ID")
    }

    await pool.promise().query('INSERT INTO favourites (tweet_id, user_id) VALUES (?, ?)', [id, 1])

    res.redirect("http://localhost:3000/tweets/favourites")
})

router.get("/favourites", async (req, res)=> {

    const [favourites] = await pool.promise().query(
        `SELECT * FROM favourites 
        JOIN tweet ON favourites.tweet_id = tweet.id 
        JOIN user ON tweet.author_id = user.id 
        ORDER BY created_at DESC;`)

    res.render("favourites.njk", {
        message: "Favourite Qveets",
        favourites: favourites,
    })
})

router.get("/:id/unfavourite", async (req, res) => {
    const id = req.params.id
    console.log(id)

    if (!Number.isInteger(Number(id))) {
        return res.status(400).send("Invalid ID")
    }

    await pool.promise().query(`DELETE FROM favourites WHERE tweet_id = ?`, [id])

    res.redirect("http://localhost:3000/tweets/favourites")
})

router.get("/:id/delete", async (req, res) => {
    
    const id = req.params.id

    if (!Number.isInteger(Number(id))) {
        return res.status(400).send("Invalid ID")
    }

    await pool.promise().query(`DELETE FROM tweet WHERE id = ?`, [id])

    res.redirect("http://localhost:3000/tweets")
})

router.get("/:id/edit", async (req, res) => {
    const id = req.params.id

    if (!Number.isInteger(Number(id))) {
        return res.status(400).send("Invalid ID")
    }
    
    const [rows] = await pool.promise().query("SELECT * FROM tweet WHERE id = ?", [id])
    if (rows.length === 0) {
    return res.status(404).send("Tweet not found")
    }

    console.log(rows[0].message)

    res.render('edit.njk', {
        message: "Edit Qveet",
        rows: rows[0],
    })
})

router.post('/edit', async (req, res) => {
    
    const { message, id } = req.body

    await pool.promise().query(`UPDATE tweet SET message=? where id=?`, [message, id])

    res.redirect("http://localhost:3000/tweets")
})

router.get("/post", async (req, res) => {
    const [user] = await pool.promise().query(`SELECT * FROM user;`)

    res.render('post.njk', {
        message: "New Qveet",
        user: user
    })
})

router.post('/', async (req, res) => {  
    const { author_id, message } = req.body

    await pool.promise().query(`INSERT INTO tweet (author_id, message) values (?, ?)`, [author_id, message])

    res.redirect("http://localhost:3000/tweets")
})

export default router