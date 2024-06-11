import app from './app.js'
import dbClient from './db/dbClient.js'
import dotenv from 'dotenv'

dotenv.config()

dbClient()
  .then(() => {
    const port = process.env.PORT || 4080
    app.listen(port, () => console.log(`The Server is Running on port ${port}`))
  })
  .catch(error => console.log(`Error Connecting to server ${error}`))
