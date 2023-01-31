const db = require("../configs/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const SECRET_KEY = "iaujshfklausfokjvuorjvksuirefkjauirjkauerfvkajbsrufoajckrabuv";
  try {
    
    const user = await db.query("SELECT * from users WHERE email = $1", [
      email,
    ]);

    const results = user.rows;

    if (results.length != 0) {
      return res.status(400).json({ exist: "User Exist!" });
    } else {

      console.log(req.body)
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(400).json({ error: "Not protected" });
        }

        const user = {
          name,
          email,
          password: hash,
        
        };

        var flag = 1;

        db.query(
          "INSERT INTO users(full_name, email, password) VALUES($1,$2,$3) RETURNING user_id",
          [user.full_name, user.email, user.password ],
          (err, results) => {
            if (err) {
              flag = 0;
              return res
                .status(400)
                .json({ error: "User Registration Failed!" });
            } else {
              flag = 1;
            }

            if (flag) {
              console.log(results.rows[0]);
              const token = jwt.sign(
                //Signing a jwt token
                {
                  id: results.rows[0].id,
                  email: user.email,
                  name: user.name
                },
                SECRET_KEY,
                {
                    expiresIn: '3h'
                }
              );
              res.status(200).json({message: 'Successfully Registered!!!'})
            }
          }
        );
      });
    }
  } catch (error) {
    res.status(500).send("Query Crashed at Register!!!");
  }
};

