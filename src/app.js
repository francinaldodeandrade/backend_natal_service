<<<<<<< HEAD
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

=======
import express from "express";
import cors from "cors";
import clientRoutes from "./routes/clientRoutes.js";

const app = express();

// middlewares
app.use(cors());
>>>>>>> 2eda5205d21347beec58aa80450f99ac3f1bce97
app.use(express.json());

// rotas
app.use("/api/clients", clientRoutes);

<<<<<<< HEAD
export default app;
=======
import webhookRoutes from "./webhook.js";
app.use("/webhook", webhookRoutes);


export default app;

>>>>>>> 2eda5205d21347beec58aa80450f99ac3f1bce97
