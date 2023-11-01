const router = require("express").Router();
const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require('../utilis/jwtGenerator')

module.exports = router;

router.post('/register', async(req, res)=>{
    try {
        // 1. destructure the req.body (name, email, password)

        const {name, email, password} = req.body;
        // console.log(req.body)

        // 2. check if user exits (if user exist then throw error)

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        res.json(user.row)
        if (user.rows.length > 0) {
            return res.status(400).json({ error: "User with this email already exists" });
        }
        
        
        // 3. Bcypt the user password

        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptpassword = await bcrypt.hash(password, salt);

        // 4. enter the new user inside the database

        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptpassword]);
        // res.json(newUser.rows[0])

        // 5. genrating our jwt token

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({token})
        res.json({
            user: newUser.rows[0],
            token: token, // Send the JWT token along with the user data
          });
          

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
})

// login route 

router.post("/login", async(req, res)=>{
    try {
        
        // 1. destructure the req.body

        // 2. check if user don't exist (if not then throw error)

        // 3. check if incomming password is the same password database password

        // 4. give them the jwt token

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router
