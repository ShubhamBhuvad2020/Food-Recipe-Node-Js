const { render } = require('ejs');
const express = require('express');
const shuffle = require('shuffle-array');
const route= express.Router();


const RecipeDB = require('../model/model')
// Home Route
route.get("/",(req,res)=>{
    const name = "Dipak"
    res.render('index')
});
// menu Route
route.get("/menu",async (req,res)=>{
    await RecipeDB.find((err,recipe)=>{
        if(!err){
            var shuffleRecipe= shuffle(recipe)
            res.render('menu',{data:shuffleRecipe})
        }else{
            res.send("Data Not Found!")
        }
    })

    res.render('menu')
});
// Post Route
route.get("/post/:id",async(req,res)=>{
    // console.log(req.params.id);
  await RecipeDB.findOne({_id:req.params.id},(err,recipePost)=>{
        if(!err){
            // res.send(recipePost)
            res.render('post',{post:recipePost})
            // console.log(recipePost);
        }else{
            res.send("Recipe was not found!")
        }
    })
    // res.render('post')
});
//  Post Comment
route.post("/comment",async (req,res)=>{
    // save recipe post comment in database
    console.log(req.body.username,req.body.comment,req.body.post_id);
    await RecipeDB.findByIdAndUpdate({_id:req.body.post_id},{
        $push:{
            comment:[{
                username:req.body.username,
                comment:req.body.comment}]
        }
    })
    res.redirect(`/post/${req.body.post_id}`)
});
// admin login
route.get("/admin-login",(req,res)=>{
    res.render('admin-login')
})
route.post("/admin-login",async(req,res)=>{
    // console.log(req.body.username , req.);
    const username = await req.body.username;
    const password =await req.body.password;
    if (username == "Admin" && password=="admin"){
        res.redirect('admin')
    }else{
        res.redirect('/')
    }
})
// admin Route
route.get("/admin",(req,res)=>{
    RecipeDB.find((err,recipes)=>{
        if(!err){
            var shuffleRecipe= shuffle(recipes)
            res.render('admin',{Recipes:shuffleRecipe});
        }else{
            res.send("Data Not Found!")
        }
    })
    // res.render('admin')
});
route.get("/admin/add",(req,res)=>{
    res.render('add')
})
// admin add Route post
route.post("/admin/add",(req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({message:'content cannot be empty.'});
        return;
    }
    // new recipe post
    const recipe = new RecipeDB({
        title:req.body.Title,
        type:req.body.TypeRecipe,
        prep_time:req.body.PrepTime,
        cook_time:req.body.CookTime,
        mode:req.body.Mode,
        serves:req.body.Serves,
        description:req.body.Description,
        ingredient:req.body.Ingredient,
        method:req.body.Method,
        link:req.body.link,
        photo:req.body.Photo,
        cook_name:req.body.CookName
    })

    // save recipe post in database 
    recipe.save();
    res.redirect('/menu')
});
// admin post Route
route.get("/admin/post/:id",(req,res)=>{
    RecipeDB.findOne({_id:req.params.id},(err,recipePost)=>{
        if(!err){
            res.render('post',{post:recipePost})
        }else{
            res.send("Recipe was not found!")
        }
    })
});
//admin get edit post with id
route.get("/admin/edit/:id",async(req,res)=>{
    // res.send(req.params.id)
    await RecipeDB.findOne({_id:req.params.id},(err,recipe)=>{
        // console.log(recipe);
        res.render('edit',{recipe:recipe})
    })

})
// update post 
route.post("/admin/edit/:id",async(req,res)=>{
        
        
     // new recipe post
        let recipe = {};
        recipe.title=req.body.Title,
        recipe.type=req.body.TypeRecipe,
        recipe.prep_time=req.body.PrepTime,
        recipe.cook_time=req.body.CookTime,
        recipe.mode=req.body.Mode,
        recipe.serves=req.body.Serves,
        recipe.description=req.body.Description,
        recipe.ingredient=req.body.Ingredient,
        recipe.method=req.body.Method,
        recipe.link=req.body.link,
        recipe.photo=req.body.Photo,
        recipe.cook_name=req.body.CookName
    
    let query = {_id:req.params.id}
    // save recipe post in database 
    RecipeDB.update(query,recipe,err =>{
        if(!err){
            res.redirect(`/admin/post/${req.params.id}`)
        }
    })
    
})
// admin delete Route
route.get("/admin/delete/:id",(req,res)=>{
    // console.log(req.params.id);
    RecipeDB.deleteOne({_id:req.params.id},(err,deletePost)=>{
        // res.send("Data Succesfully deleted.")
        res.redirect('/admin')
    })
});
// search route
route.get('/search',async(req,res)=>{
    var regex = new RegExp(req.query.search,'i');
    var search = req.query.search
   await RecipeDB.find({title:regex})
    .then(result =>{
        res.render('search',{recipes:result,search:search});
        // console.log(result);
    })
     
    // console.log(req.query.search);
})
// share recipe route
route.get('/share-recipe',(req,res)=>{
    res.redirect('/admin/add')
})

module.exports = route;