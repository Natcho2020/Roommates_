import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { router as roomates } from './routes/roomates.js'
import { router as gastos } from './routes/gastos.js'
import { router as home } from './routes/index.js'



const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//Importamps rutas
app.use('/', roomates)
app.use('/', home)
app.use('/', gastos)
app.listen(3000, () => {
    console.log("App en puerto 3000")
})
