import express from 'express';
import axios from 'axios';
const router=express.Router();

router
    .route('/')
    .post(async(req,res)=>{
        try{
        const {morning,afternoon,evening,night}=req.body;
        let food=[];
        food.push(morning);
        food.push(afternoon);
        food.push(evening);
        food.push(night);
        const resBody=await axios.post('http://localhost:5000/food_info',{food : food});
        // console.log(resBody.data);
        const foods = resBody.data;
        const foodsArray = Object.keys(foods).map(food => ({ name: food, nutrients: foods[food] }));
        console.log(foodsArray[0]);
        res.status(200).send(foodsArray);
        }catch(error){
            console.log(error);
        }
    })

export default router;