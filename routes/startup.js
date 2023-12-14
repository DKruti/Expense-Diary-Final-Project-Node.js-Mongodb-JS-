import express from "express";

export const startup = express.Router()

startup.get('/',(req,res)=>{
    res.send("hello folks")
})