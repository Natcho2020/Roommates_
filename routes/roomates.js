import { Router } from 'express'
import path from 'node:path'
import { error } from 'node:console'
import { createRoommate, getRoommates } from '../models/roommates.js'

const router = Router()

router.get("/roommates", async (req, res) => {
    try {
        const rommates = await getRoommates()

        res.json(rommates)
    } catch (error) {
        console.error(error)
        res.send(error)
    }
})

router.post("/roommate", async (req, res) => {
    try {
        const roommate = await createRoommate()
        console.log(roommate)
        res.send(roommate)
    } catch (error) {
        error
    }
})




export { router }






