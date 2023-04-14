const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
app.post('/',async (req, res) => {
  res.send(req.body)
})
let dbUsers = [];

const bcrypt = require('bcrypt');

//  The login system after including the bcrypt function is created to 
//  login with the encrypted password of the user
app.post('/login',async(req,res) => {
  const {username, password} = req.body
  const matched = dbUsers.find(element => element.username === username)
  if (!matched) {
      res.send("User not found")
      return
  }
  const hashmatch = await bcrypt.compare(password, matched.password)
  if (!hashmatch) {
      res.send("Password not matched")
      return
  } else {
  res.send(matched)
  }
});

//  The register system after including the bycrypt function in order to 
//  create a new user and encrypt the original password 
app.post('/register',async (req, res) => {

  const {username, password, name, email} = req.body
  const hash = await bcrypt.hash(password, 10)
  const regmatch = dbUsers.find(element => element.username === username)
      if (!regmatch) {
          dbUsers.push({
          username,
          password:hash,
          name,
          email
          })
          res.send("Registration success")
          return
      } else {
          res.send("Username is used")
      };
})

