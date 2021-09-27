const mongoose= require ('mongoose');
const Schema= mongoose.Schema();
const personSchema={
    name:{ 
        type: String,
        required:true,
    },
    age:{
        type:Number,
    },
    favouriteFood:{
        type: Array,
    },
};

const Person = mongoose.model("contact",personSchema);

module.exports= Person;