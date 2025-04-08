import express from "express"
import pool from "../db.js"
import bcrypt from "bcrypt"

const router = express.Router()

router.get("/", async (req, res)=> {
   
    res.render("index.njk", {
        message: `Welcome to the "My Pocket Henrik" Forum!`,
    })
})

router.get("/login", (req, res) => {
    res.render("login.njk", { 
      title: "Login", 
      message: "Best service, legit.",
      error: ""
    })
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body

  const [dbpassword] = await pool.promise().query(`SELECT password FROM login WHERE name = ?`, [username])

  if (dbpassword.length == 0) {
    res.render("login.njk", {
      title: "Login", 
      message: "Best service, legit.", 
      error: "*Wrong username or password"
    })
  } else {
    bcrypt.compare(password, dbpassword[0].password, async function(err, result) {
      if (result == true){
        const [id] = await pool.promise().query(`SELECT id FROM login WHERE name = ?`, [username])
        req.session.login=true
        req.session.userId = id[0].id
        res.redirect("/news")
      }
      else {
        res.render("login.njk", {
          title: "Login", 
          message: "Best service, legit.", 
          error: "Wrong username or password"
        })
      }
    })
  }
})

router.get("/signup", (req, res) => {
    res.render("signup.njk", { 
      title: "Sign Up", 
      message: "Best service, legit.",
      error: ""
    })
})

router.post("/signup", async (req, res) => {
  const { username, password } = req.body

  const [dbpassword] = await pool.promise().query(`SELECT password FROM login WHERE name = ?`, [username])

  if (dbpassword.length == 0) {
    const hashedPW = await bcrypt.hash(password, 10)

    await pool.promise().query('INSERT INTO login (name, password) VALUES (?, ?)', [username, hashedPW])
    const [id] = await pool.promise().query(`SELECT id FROM login WHERE name = ?`, [username])
    req.session.userId = id[0].id
    req.session.login = true
    res.redirect("/")
  } else {
    res.render("signup.njk", {
        title: "Sign Up", 
        message: "Best service, legit.", 
        error: "*User already exists"
    })
  }
})

router.get("/logout", (req, res) => {
  req.session.destroy(function(err) {
    res.redirect("/")
  })
})

export default router