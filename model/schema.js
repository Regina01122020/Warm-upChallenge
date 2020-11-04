const mongoose = require('mongoose'); 
  
const studentSchema = new mongoose.Schema({ 

    Name: { 
        type: String,
        required: true  
    }, 

    Gender: { 
        type: String,
        required: true 
    },

    Age: {
        type: Number,
        requred: true
    },

    Course: {
        type: String,
        required: true
    }
    
});

module.exports = new mongoose.model('Student', studentSchema); 
