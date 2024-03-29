import bcrypt from 'bcrypt'
import {getPosts, getOnePost, addPost, deletePost, editPost} from '../models/posts.js'


export default{
    getPosts: async (req,res)=>{
        try{
            res.send(await getPosts())            
        }catch(err){
            console.error(err);
            res.json({
                msg: 'An error has occurred when retrieving the data.'
            })
        }
    },

    getOnePost: async (req,res)=>{
        try{
            res.send(await getOnePost(+req.params.post_ID))
        }catch(err){
            console.error(err);
            res.json({
                msg: 'An error has occurred when retrieving the data.'
            })
        }
    },
  
    addPost: async (req,res)=>{
        const {post_Title, post_Content, post_Date, user_ID} = req.body
        const post = await addPost(post_Title, post_Content, post_Date, user_ID)

        try{
            res.send(await getPosts())
        }catch(err){
            console.error(err);
            res.json({
                msg: 'An error has occurred when retrieving the data.'
            })
        }
    },

    deletePost: async (req,res)=>{
        await deletePost(req.params.post_ID)
        console.log(req.params.post_ID);

        try{
            res.send(await deletePost(req.params.post_ID))
        }catch(err){
            console.error(err);
            res.json({
                msg: 'An error has occurred when retrieving the data.'
            })
        }
    },

    editPost: async (req,res)=>{
        const [post] = await getOnePost(+req.params.post_ID)
        let {post_Title, post_Content, post_Date, user_ID} = req.body

        post_Title ? post_Title = post_Title: {post_Title} = post
        post_Content ? post_Content = post_Content: {post_Content} = post
        post_Date ? post_Date = post_Date: {post_Date} = post
        user_ID ? user_ID = user_ID: {user_ID} = post

        console.log(post);
        await editPost(post_Title, post_Content, post_Date, user_ID, +req.params.post_ID) 
        res.json(await getPosts())
    }

}
