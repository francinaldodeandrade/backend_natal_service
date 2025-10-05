import bcrypt, { hash } from "bcrypt";
import esquema from "../models/clietSchema.js"

//Cria um novo usuário//
const createCliet = async (req, res) => {
    if (req.body.Password) {
        const hash = bcrypt.hashSync(req.body.Password, 10)
        req.body.Password = hash
    } else {
        res.status(204).json({
            statusCode: 204,
            message: "Preencha todos os campos marcados como obrigatório",
            data: {}
        })
    }
    try {

        const newcliet = new esquema(req.body)

        console.log(newcliet); // imprimir os dados no terminal


        const clietSave = await newcliet.save();

        res.status(201).json({
            statusCode: 201,
            message: "cadastro realizado com sucesso",
            data: {
                clietSave
            }
        })


    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Não foi possivel realizar o cadastro",
            data: {
                error: error.message
            }
        })
    }
}

/*const createCliet = async (req, res) => { //defino que a função é assicrona

    const hash = bcrypt.hashSync(req.body.Password, 10);
    //console.log("senha antas de ser hasherizada", req.body.password);
    req.body.password = hash;        
    console.log("senha depois de hasherizada", hash);
    
    
    try{
        const newcliet = new esquema(req.body) // recebo o que vem do body da requisição e uso o esquema definido 
        const savecliet = await newcliet.save() //espero que o usuário seja salvo no banco
        
        res.status(201).send({
            statusCode:201,
            message:"Produto cadastrado com sucesso",
            data:{
            savecliet,
        }
        }) 

    } catch (err) {
         console.error(err)
         res.status(500).send({
            statusCode: 500,
            message:"Produto não cadastrado"
        })
         
    }

 
}*/

//Mostra todos os usuários//
const getAll = async (req, res) => {
    try {

        const clients = await esquema.find()

        if (!clients) {
            res.status(500).send({
            statusCode: 500,
            message:err.message 
        })
        } 
        
        res.status(200).send({
            statusCode:200,
            data:{
            clients,
        }
        }) 
        
        } catch (err) {
            console.error(err)
          }
        }


const getCliet = async (req, res) => {
    try {

        const clients = await esquema.find()

        res.status(200).json({
            statusCode: 200,
            message: "Buscando todos os clientes!",
            data: {
                clients
            }
        })

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Lista de cliente não encontrada na base de dados",
            data: {
                error: error.message
            }
        })
    }
}

//Encontra o usuário pelo ID//
const seaById = async (req, res) => {
    const Id = req.params.id
    try {

        const client = await esquema.findById({ _id: Id })

        res.status(200).json({
            
            statusCode: 200,
            message: "Cliente encotrado na base de dados!",
            data: {
                client
            }
        })

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "cliente não encontrado na base de dados",
            data: {
                error: error.message
            }
        })
    }
}

//Altera o usuário pelo ID//
const updById = async (req, res) => {
    try {

        const client = await esquema.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        });

        res.status(200).json({
            statusCode: 200,
            message: "Cadastro alterado com sucesso!",
            data: {
                client
            }
        })

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Não foi possível atualizar o cadastro",
            data: {
                error: error.message
            }
        })
    }
}

//Deleta usuário pelo ID//
const delById = async (req, res) => {
    try {

        const Id = req.params.id
        const client = await esquema.findOneAndDelete({_id: Id})

        if(cliet){
            res.status(200).json({
                statusCode: 200,
                message: "Cadastro removido da base de dados!",
                data: {
                    client
                }
            })
        }else{
            res.status(500).json({
                statusCode: 500,
                message: "Erro ao remover cadastro",
                data: { error: "cliente não encontrado"}
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
    createCliet,
    getCliet,
    seaById,
    updById,
    delById
}