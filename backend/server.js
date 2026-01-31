import express from 'express'
import cors from 'cors'
import env from 'dotenv'


import DbConnection from './config/db.js';
import alertRoutes from "./routes/alertRoutes.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());
app.use(cors());
env.config();

DbConnection();

const PORT = process.env.PORT || 8080;

app.use(logger);

app.use("/alerts", alertRoutes);

app.get("/test", (req, res) => {
    res.json("Test successful")
})
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`)
});

