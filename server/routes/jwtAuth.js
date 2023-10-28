const router = require("express").Router();
const pool = require("../db")

module.exports = router;

router.post('/register', async(req, res)=>{
    try {
        // 1. destructure the req.body (name, email, password)

        const {name, email, password} = req.body;

        // 2. check if user exits (if user exist then throw error)

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        // res.json(user.row)
        if(user.rows.length !== 0){
            return res.status(401).send("User already exits");
        };
        
        // 3. Bcypt the user password

        // 4. enter the new user inside the database

        // 5. genrating our jwt token

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
})
