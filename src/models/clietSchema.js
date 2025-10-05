import mongoose, {Schema} from "mongoose";

const esquema = new Schema({
    
    id: mongoose.Schema.Types.ObjectId,

   Name: {
        type: String,
        required: true, },

    Sname: {
        type: String,
        required: true,
    },

    RedeS:{
        type: String,
        required: true,
        
    },

    Fone:{
        type: String,
        required: true,
    },
   
   Password: {
        type:  String,
        required: true,
    },

    ConfPass:{
        type: String,
        
    },

    Nasc:{
        type: String,
        
    },

    ZipCode:{
        type: String,
        
    },

    street:{
        type: String,
        
    },

    number:{
        type: String,
        
    },

    Neighborhood:{
        type: String,
        
    },

    City:{
        type: String,
        
    },

    State:{
        type: String,
        
    }

    

},

   { timestamps: true } // armazena a data de cadastro
   );
   
   export default mongoose.model("cliets", esquema); // o mongoose cria uma coleção para usuários no BD*/