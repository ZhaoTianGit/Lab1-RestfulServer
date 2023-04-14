const express = require('express')
const app = express()
const port = 3000
//To anable the Json in Client.http line12
//should defined before using it
app.use(express.json());

app.post('/', (req, res) => {
  let data = req.body
  res.send('Post Requested  ' + data.name);
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
let dbUsers =[
  {
      username: "lee",
      password: "passwordlee",
      name: "lee zhao tian",
      email: "lzt@gmail.com"
  },
  {
      username: "hee",
      password: "passwordhee",
      name: "hee yee cinn",
      email: "hyc@gmail.com"
  },
  {
      username: "wee",
      password: "passwordwee",
      name: "wee mao phin",
      email: "wmp@gmail.com"
  }
] 

//  This function created to check whether the correctness of username and password
//  if the input name and password is correct
function login(username, password){
  console.log("someone try to login with",username , password);
  let matched = dbUsers.find(Element =>
      Element.username == username
  )
  if(matched){
      if(matched.password == password){
          return matched
      }else{
          return "Password not matched"
      }
  }else {
      return "User not found"
  }
}

//  The username and password of registered user will be shown if the password is correct
app.post('/login', (req, res) => {
  let data = req.body
  res.send(
    login(
      data.username,
      data.password
    )
  );
})


// This function is used to create a new database for new register user 
function register(
  username, 
  password, 
  name, 
  email
  ){
  let regmatched = dbUsers.find(element =>
      element.username == username)
      if(regmatched){
          //console.log() is for server to read
          console.log("Server: User existed");
          //return is for user to read
          return "This user exist"
      }else {
  dbUsers.push({
      username: username,
      password: password,
      name: name,
      email :email
  })
  console.log("Successfully adding a new user");
  return "Registration Successful with the Username:" + username; 
}
}

//  This function will create a new data base for new user with the detail listed 
app.post('/register', (req, res) => {
  let data = req.body
  res.send(
    register(
      data.username,
      data.password,
      data.name,
      data.email
    )
  );
})