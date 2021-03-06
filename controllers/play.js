const express = require("express")
const router = express.Router()
const User = require("../models/user")
const Puzzle = require("../models/puzzle")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.get("/", function (req, res) {
    console.log("GET /play ")
    if (req.session.username) {
        res.render("play.hbs", {
            username: req.session.username
        })
    } else {
        res.redirect("/")
    }
})

router.get("/online", function (req, res) {
    if (req.session.username) {
        res.render("online-mode", {
            username: req.session.username
        })
    } else {
        res.redirect("/")
    }
})

router.get("/offline", function (req, res) {
    console.log("GET /play/offline")

    if (req.session.username) {
        res.render("offline-mode", {
            username: req.session.username
        })
    } else {
        res.redirect("/")
    }
})

router.get("/bot", function (req, res) {
    console.log("GET /play/offline")

    if (req.session.username) {
        res.render("bot-mode", {
            username: req.session.username
        })
    } else {
        res.redirect("/")
    }
})


router.get("/puzzle", function (req, res) {
    if (req.session.username) {
        Puzzle.getAll().then((puzzles)=>{
            res.render("puzzle-levels", {
                username: req.session.username,
                puzzles:puzzles
            })
        })
    } else {
        res.redirect("/")
    }
})

router.get("/puzzle/:puzzle", function(req,res){
    let id = req.params.puzzle

    Puzzle.get(id).then(puzzle=>{
        res.render("puzzle-mode",{
            username: req.session.username,
            fen: puzzle.fen,
            moves: puzzle.moves
        })
    },err=>{
        console.log(err)
    })
})


module.exports = router