// import dotenv from "dotenv-safe"
// dotenv.config()

// import express from "express"
// const app = express()

// app.use(express.json())

// import cors from "cors"
// app.use(cors())

// import db from "./config/database.js";
// db.connect()

// const root = process.env.ROOT || "/";

// import routesUser from "./routes/usersRoutes.js"
// app.use(root, routesUser)

// import routesClient from "./routes/clietRoutes.js"
// app.use(root,routesClient)

// import routeService from './routes/serviceRoutes.js'
// app.use(root, routeService)



// export default app  

import express from "express";
import clientRoutes from "./src/routes/clientRoutes.js";

const app = express();

app.use(express.json());

// rotas
app.use("/api/clients", clientRoutes);

export default app;
