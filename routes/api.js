const express = require('express')

const router = express.Router();


const BlogPost = require('../models/blogPost')

router.get('/', (req,res) => {
    console.log('inside /api/ get route')
    BlogPost.find({})
        .then((data) => {
            console.log('retreived data is: ', data)
            res.json(data)
            return 'hi'
        })
        .then((secondData)=>{
            // console.log('first data? ', data)
            console.log('second data: ', secondData)
        })
        .catch((err)=>{
            console.log('retrieval error: ', err)
        })
})
router.get('/plums', (req,res) => {
    BlogPost.find({})
        .then((data) => {
            console.log('retreived data is: ', data)
            res.json(data)
            return 'hello'
        })
        .then((secondData)=>{
            console.log('first data? ', data)
            console.log('second data: ', secondData)
        })
        .catch((err)=>{
            console.log('retrieval error: ', err)
        })
})
router.post('/save', (req,res) => {
    console.log('in save')
    console.log('req.body is ', req.body)
    const data = req.body
    const newBlogPost = new BlogPost(data)

    newBlogPost.save((error)=>{
        if(error){
            return res.json(500).json({msg: 'Sorry, internal server error'})
            
        }
        return res.json({msg: 'DATA HAS BEEN SAVED' })
    })
    // res.json({
    //     msg: 'data received'
    // })
})

module.exports = router;