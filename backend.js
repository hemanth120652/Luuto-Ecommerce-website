const express = require('express')
const { open } = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const dbPath = path.join(__dirname, 'data.db')
const app = express()
app.use(express.json())

let db = null

const initilazationAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
  }
}
initilazationAndServer()

const authentication = (request, response, next) => {
  let jwtToken
  const authHeader = request.headers['authorization']
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(' ')[1]
  }
  if (jwtToken === undefined) {
    response.status(401)
    response.send('Invalid JWT Token')
  } else {
    jwt.verify(jwtToken, 'SECRET', async (error, payload) => {
      if (error) {
        response.status(401)
        response.send('Invalid JWT Token')
      } else {
        request.username = payload.username
        next()
      }
    })
  }
}

app.post('/register/', async (request, response) => {
  const { username, name, password, gender, location } = request.body

  if (password.length < 5) {
    response.status(400)
    response.send('Password is too short')
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const selectUserQuery = `SELECT * FROM user WHERE username = ?;`
  const dbUser = await db.get(selectUserQuery, [username])

  if (dbUser === undefined) {
    const createNewUser = `
      INSERT INTO user (username, name, password, gender, location) 
      VALUES (?, ?, ?, ?, ?);
    `
    await db.run(createNewUser, [username, name, hashedPassword, gender, location])
    response.status(200)
    response.send('User created successfully')
  } else {
    response.status(400)
    response.send('User already exists')
  }
})

app.post('/login/', async (request, response) => {
  const { username, password } = request.body
  const selectUserQuery = `SELECT * FROM user WHERE username = ?;`
  const dbUser = await db.get(selectUserQuery, [username])

  if (dbUser === undefined) {
    response.status(400)
    response.send('Invalid user')
  } else {
    const isPasswordCorrect = await bcrypt.compare(password, dbUser.password)
    if (isPasswordCorrect) {
      const payload = { username }
      const jwtToken = jwt.sign(payload, 'SECRET')
      response.send({ jwtToken })
    } else {
      response.status(400)
      response.send('Invalid password')
    }
  }
})
