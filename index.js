import express from 'express'
import cors from 'cors'
import { router as home } from './routes/index.js'


const app = express()


app.use("/", home)

app.use(express.json())
app.use(cors())

app.listen(3000, () => {
    console.log("App en puerto 3000")
})
