require('dotenv').config()
const mongoose = require('mongoose')
const express = require ('express')
const routes = require ('./routes');
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')


const app = express()

app.use(express.json());
app.use(routes)

module.exports =app;