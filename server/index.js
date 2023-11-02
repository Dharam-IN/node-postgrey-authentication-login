const express = require("express")
const app = express();
const cors = require("cors")

// middleware
app.use(express.json()); // req.body
app.use(cors())


// ROUTES

// Register and login routes

app.use("/auth", require("./routes/jwtAuth"));

// Dashboard Route
app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000,()=>{
    console.log("Serever is running on port 5000");
});

