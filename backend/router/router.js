const express=require('express')
const Note=require('../models/schema')

const router= express.Router()

//create


router.post('/',async(req,res)=>{

    try{
        const {title,content}=req.body
        const note=new Note({title,content})

        await note.save()
        res.status(201).json(note)




    }catch (error){
        res.status(500).json({message:error.message})
    }




})




//get all notes

  router.get('/',async (req,res)=>{

    try{
        const notes= await Note.find()
        res.json(notes)
    }catch(error){
        res.status(500).json({message:error.message})
    }




  })


  router.put('/:id',async(req,res)=>{

    try{


        const {id}=req.params
        const {title,content}=req.body
        const updateNote=await Note.findByIdAndUpdate(id,
            {title,content},
            {new:true}
        )
        res.json(updateNote)



    }catch(error){
        res.status(500).json({message:error.message})
    }




  })


  router.delete('/:id',async(req,res)=>{

    try{
        const {id}=req.params

        await Note.findByIdAndDelete(id)
        res.json({message: 'note deleted'})



    }catch(error){
        res.status(500).json({message:error.message})
    }

  })















module.exports=router