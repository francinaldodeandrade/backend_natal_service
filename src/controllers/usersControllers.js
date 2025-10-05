//import bcrypt from "bcrypt"
import esquema from "../models/userSchema.js"
//AQUI EU MONTO O CRUD

const getAll = (req, res) =>{
    res.status(200).send({
    message:"comunicação com o back-end estabelecida",
    texto:"servidor local em execução nesta porta de comunicação"
    })
    
        console.log("comunicação com navegador estabelecida")
    
    }

//GET = lista todos os usuérios do banco de dados

const readGet = async (req, res) => {
    try{

       const allProd = await esquema.find() // o esquema do produto importado faz uma busca de todos os produtos no banco de dados
       
   if (!allProd) {
    res.status(500).send({
    statusCode: 500,
    message:err.message 
})
} 

res.status(200).send({
    statusCode:200,
    data:{
    allProd,
}
}) 

} catch (err) {
    console.error(err)
  }
}

const createProd = async (req, res) => { //defino que a função é assicrona
    //console.log("requisição", req);
    try{
        const newProd = new esquema(req.body) // recebo o que vem do body da requisição e uso o esquema definido 
        
        console.log(newProd); // imprimir os dados no terminal

        const savedProd = await newProd.save() //espero que o usuário seja salvo no banco
        
        res.status(201).send({
            statusCode:201,
            message:"Produto cadastrado com sucesso",
            data:{
            savedProd,
        }
        }) 

    } catch (err) {
         console.error(err)
         res.status(500).send({
            statusCode: 500,
            message:"Produto não cadastrado"
        })
         
    }

 
}

//busca de produtos

const SearchById = async (req, res) => {
    try {

        const product = await esquema.findById(req.params.id).exec();

        res.status(200).json({
            statusCode: 200,
            message: "Consulta realizada com sucesso!",
            data: {
                product
            }
        })

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao executar a consulta",
            data: {
                error: error.message
            }
        })
    }
}

//atualizar produtos

const updateById = async (req, res) => {
    try {

        const product = await esquema.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        });

        res.status(200).json({
            statusCode: 200,
            message: "Alteração realizada com sucesso!",
            data: {
               product
            }
        })

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao executar a consulta",
            data: {
                error: error.message
            }
        })
    }
}

//remove produto

const removeById = async (req, res) => {
    try {

        const product = await esquema.findByIdAndRemove(req.params.id)

        if(product){
            res.status(200).json({
                statusCode: 200,
                message: "Produto removido!",
                data: {
                    product
                }
            })
        }else{
            res.status(500).json({
                statusCode: 500,
                message: "Erro ao executar a consulta",
                data: { error: "product not exist"}
            })
        }
        

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Erro ao executar a consulta",
            data: {
                error: error.message
            }
        })
    }
}


export default {
    getAll,
    createProd,
    SearchById,
    updateById,
    removeById,
    readGet
}



