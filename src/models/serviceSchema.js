import mongoose from "mongoose";

const esquema = new mongoose.Schema({
    
    id: mongoose.Schema.Types.ObjectId,

    Proc: {
        type: String
         },

    Prof: {
        type: String,
    },

    Date: {
        type:  mongoose.Schema.Types.Date,
        required: true,
    },

    Client:{
        type: String
       
    },

    Promo:{
        type: String
        
    },

    Price:{
        type: String
        
    }

},

   { timestamps: true } // armazena a data de cadastro
   );
   
   export default mongoose.model("service", esquema); // o mongoose cria uma coleção para usuários no BD*/