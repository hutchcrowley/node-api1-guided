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

server.use(express.json())

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

// endpoint for creating a new resource
server.post('/users', (req, res) => {
  if (!req.body.name) {
    res.status(400).json({
      message: 'User not created'
    })
  }
  const newUser = db.createUser({
    name: req.body.name
  })
  res.status(201).json(newUser)
})

// endpoint to update a resource
server.put('/users/:id', (req, res) => {
  const user = db.getUserById(req.params.id)
  if (user) {
    const updatedUser = db.updateUser(user.id, {
      name: req.body.name || user.name
    })
    res.json(updatedUser)
  } else {
    res.status(400).json({
      message: 'User not found - cannot update'
    })
  }
})

server.delete('/users/:id', (req, res) => {
  const user = db.getUserById(req.params.id)

  if (user) {
    db.deleteUser(user.id)
    // respond with a 204, which is a successful empty response
    res.status(204).end()
  } else {
    res.status(404).json({
      message: 'User not found - cannot delete'
    })
  }
})

server.listen(3000, () => {
  console.log('server started at port 3000')
})
