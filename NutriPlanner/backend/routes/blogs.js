import express from "express";
import { db } from "../database/db.js";

const router=express.Router();

router
    .route('/all')
    .get(async(req,res)=>{
        try{
        const resBody=await db.query('Select * from blogs');
        res.status(200).send(resBody.rows);
        }
        catch(error){
            console.log(error);
        }
    })

router
    .route('/:id')
    .get(async(req,res)=>{
        try{
            const id=req.params.id;
            const resBody=await db.query('Select * from blogs where id=$1',[id]);
            res.status(200).send(resBody[0].content);
        }
        catch(error){
            console.log(error);
        }
    })

router
    .route('/create')
    .post(async(req,res)=>{
        try{
            const {title,description,Content,author}=req.body;
            await db.query('Insert into blogs(title,description,content,author) values($1,$2,$3,$4)',[title,description,Content,author]);
            res.status(200).send("Successfully created blog post");
        }
        catch(error){
            console.log(error);
        }
    })

export default router;