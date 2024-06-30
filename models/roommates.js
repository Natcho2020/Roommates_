import { v4 as uuidv4 } from "uuid";
import fs from "node:fs/promises"
import path from "node:path";
import axios from "axios";

const usersFile = path.join(import.meta.dirname, "../data/usuarios.json")

export const getRoommates = async () => {
    const data = await fs.readFile(usersFile, "utf-8")
    const rommates = JSON.parse(data)
    return rommates
}

export const createRoommate = async () => {
    const data = await axios.get("https://randomuser.me/api")
    const user = data.data.results[0]
    const roommate = {
        id: uuidv4(),
        nombre: `${user.name.first} ${user.name.last}`,
        email: user.email,
        debe: 0,
        recibe: 0
    }

    fs.readFile(usersFile, "utf-8")
        .then(data => {
            const rommatesJSON = JSON.parse(data)
            rommatesJSON.roommates.push(roommate)

            return rommatesJSON
        })
        .then(rommates => {
            fs.writeFile(usersFile, JSON.stringify(rommates))
        })
        .catch(error => {
            throw new Error('Cant create user')
        })

    return roommate
}