const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

// Initialize slug
mongoose.plugin(slug);
var commentSchema = new mongoose.Schema({
    username:{type:String},
    comment:{type:String},
    timeCreated:{
        type:Date,
        default:()=>Date.now()
    },
});
var scheme = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    prep_time:{
        type:String,
        require:true
    },
    cook_time:{
        type:String,
        require:true
    },
    mode:{
        type:String,
        require:true
    },
    serves:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    ingredient:{
        type:String,
        require:true
    },
    method:{
        type:String,
        require:true
    },
    link:{
        type:String,
    },
    photo:{
        type:String,
        require:true
    },
    cook_name:{
        type:String
    },
    slug:{
        type:String,
        slug:"title",
        unique:true,
        slug_padding_size:2      
    },
    // comment:[String]
    comment:[commentSchema],
    
})

const RecipeDB= mongoose.model('recipedb',scheme)

module.exports = RecipeDB;