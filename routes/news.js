import express from "express"
import pool from "../db.js"
import { ExpressValidator } from "express-validator"

const router = express.Router()

router.get("/", async (req, res)=> {
    const [posts] = await pool.promise().query(
        `SELECT posts.*, login.name FROM posts 
        JOIN login ON posts.author_id = login.id 
        ORDER BY created_at DESC;`)
    if (req.session.login) {
        res.render("news.njk", {
            message: `Welcome to the "My Pocket Henrik" Forum!`,
            posts: posts
        })
    } else {
        res.redirect("/login")
    }
})

router.get("/:id/delete", async (req, res) => {
    
    const id = req.params.id

    if (!Number.isInteger(Number(id))) {
        return res.status(400).send("Invalid ID")
    }

    await pool.promise().query(`DELETE FROM posts WHERE id = ?`, [id])

    res.redirect("/news")
})

router.get("/:id/edit", async (req, res) => {
    const id = req.params.id

    if (!Number.isInteger(Number(id))) {
        return res.status(400).send("Invalid ID")
    }
    
    const [rows] = await pool.promise().query("SELECT * FROM posts WHERE id = ?", [id])
    if (rows.length === 0) {
    return res.status(404).send("Post not found")
    }

    res.render('edit.njk', {
        message: "Edit Post",
        rows: rows[0],
    })
})

router.post('/edit', async (req, res) => {
    
    const { message, id } = req.body

    await pool.promise().query(`UPDATE posts SET message=? where id=?`, [message, id])

    res.redirect("/news")
})

router.get("/post", async (req, res) => {
    const [user] = await pool.promise().query(`SELECT * FROM login;`)

    if (req.session.login) {
        res.render('post.njk', {
            message: "New Post",
            user: user
        })
    } else {
        res.redirect("/login")
    }
})

router.post("/post", async (req, res) => {  
    const { message } = req.body

    await pool.promise().query(`INSERT INTO posts (author_id, message) values (?, ?)`, [req.session.userId, message])

    res.redirect("/news")
})

export default router