const router = require("express").Router();
const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require('../utilis/jwtGenerator')
const validinfo = require("../middleware/validinfo")

module.exports = router;

router.post('/register', validinfo, async(req, res)=>{
    try {
        // 1. destructure the req.body (name, email, password)

        const {name, email, password} = req.body;
        // console.log(req.body)

        // 2. check if user exits (if user exist then throw error)

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        // res.json(user.row)
        if (user.rows.length > 0) {
            return res.status(400).json({ error: "User with this email already exists" });
        }
        
        
        // 3. Bcypt the user password

        const bcryptpassword = await bcrypt.hash(password, 10)
        

        // 4. enter the new user inside the database

        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptpassword]);

        // 5. genrating our jwt token

        const token = jwtGenerator(newUser.rows[0].user_id);
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

router.post("/login", validinfo, async(req, res)=>{
    try {
        
        // 1. destructure the req.body

        const {email, password} = req.body;

        // 2. check if user don't exist (if not then throw error)

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])

        if(user.rows.length === 0){
            return res.status(401).send("Password or Email is incorrect")
        }
        // 3. check if incomming password is the same password database password

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        // console.log(validPassword)

        if(!validPassword){
            return res.status(500).send("Password or email is incorrect")
        }

        // 4. give them the jwt token

        const token = jwtGenerator(user.rows[0].user_id)
        res.json({token});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router
