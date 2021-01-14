const express = require("express")
const session = require("express-session")
const ConnectSessionKnex = require("connect-session-knex")(session)
const db = require ("./config")
const usersRouter = require("./users/users-router")

const server = express()

server.use(express.json())
server.use(session({
    resave: false, //avoid creating sessions that have not changed
    saveUninitialized: false,//GDPR laws against setting cookies automatically
    secret: "keep it secret, keep it safe", //sign the cookie
        store: new ConnectSessionKnex({
            knex: db, //configured instance of knex
            createtable: true //create a sessions table in the db if it doesn't exist
        })
}))

server.use('/api', usersRouter)

server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: "Something went wrong"
    })
})

module.exports = server;