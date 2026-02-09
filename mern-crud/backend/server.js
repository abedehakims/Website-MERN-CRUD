import express from "express";
import db from "./app/models/index.js";
import mybini_routes from "./app/routes/mybini_routes.js";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes simple
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Mybini application." });
});

// Routes mybini
mybini_routes(app);

// Sync database
db.sequelize.sync().then(() => {
    console.log("Synced Mybini Database");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})