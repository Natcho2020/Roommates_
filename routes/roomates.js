
import { Router } from 'express'
import { crearRoommate } from "../models/roommates.js"
import fs from 'node:fs/promises'
import path from 'node:path'

router.get("/roomates", (req, res) => {
})
router.post("/roomates", (req, res) => {
    try {
        const filePath = path.join(import.meta.dirname, "../roommates.json")
        fs.readFile(filePath, "utf-8")
            .then(data => {
                const roommatesJson = JSON.parse(roommate)
                roommatesJson.roommates.push(userData)
                return roommatesJson
            })
            .then(data => {
                fs.writeFile(filePath, JSON.stringify(data))
            })
        res.json(userData)
    } catch (error) {
        res.status(500).json({ error })
    }
})

export { router }





const router = Router()
