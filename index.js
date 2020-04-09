// const http = require('http')

// //endpoint function contains a route handler function. Takes a single parameter, a callback function
// // callback takes two parameters, first handles the request from the client.
// // second callback parameter handles the response from the server to the client
// const server = http.createServer((req, res) => {
//   // Status code - 200 means Successful/ OK
//   res.statusCode = 200

//   // tell the client that we're sending back some JSON data.
//   // application is the MIME type. json is the actual content type
//   res.setHeader('Content-Type', 'application/json')

//   // the client now expects JSON data, this will send it out
//   res.write(JSON.stringify({ message: 'hello, world' }))

//   //  send the response off
//   res.end()
// })

// server.listen(8080, () => {
//   console.log('server started at port: 8080')
// })
//this code is an example of creating a web server at a low level ( without a framework )

// this next code is an example of creating a server using a framework, in this case, express

const express = require('express')
const db = require('./database.js')

const server = express()

// define a route using express' built=in routing
// now we can create specific route handlers for every needed endpoint
server.get('/', (req, res) => {
  res.json({ message: 'hello, world' })
})

// get the users database
server.get('/users', (req, res) => {
  const users = db.getUsers()
  res.json(users)
})

server.post('/users', (req, res) => {
  const newUser = db.createUser({
    name: 'Bill Doe Baggins'
  })
  res.json(newUser)
})

// get a specific user by id  (in URL)
server.get('/users/:id', (req, res) => {
  const userId = req.params.id
  const user = db.getUserById(userId)

  if (user) {
    res.json(user)
  } else {
    res.status(404).json({
      message: 'User not found!'
    })
  }
})

// endpoint to create a new thing
server.post('/users', (req, res) => {
  const newUser = db.createUser({
    name: 'Bob Doe'
  })
  res.status(201).json(newUser)
})

server.listen(3000, () => {
  console.log('server started at port 3000')
})
