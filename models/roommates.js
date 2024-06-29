import { v4 as uuidv4 } from "uuid";
import fs from "node:fs/promises"
import path from "node:path";
import axios from "axios";


const dataRoommates = path.join(import.meta.dirname, "../roommates.json")

const crearRoommate = async () => {
    const data = await axios.get("https://randomuser.me/api")
    const user = data.data.results[0]
    const roommate = {
        id: uuidv4(),
        nombre: `${user.name.first} ${user.name.last}`,
        email: user.email,
        debe: 0,
        recibe: 0
    }

    fs.readFile(dataRoommates, "utf-8")
        .then(data => {
            const rommatesJSON = JSON.parse(data)
            rommatesJSON.roommates.push(roommate)

            return rommatesJSON
        })
        .then(rommates => {
            fs.writeFile(dataRoommates, JSON.stringify(rommates))
        })
        .catch(error => {
            throw new Error('Error al crear Usuario')
        })
    console.log(roommate)
    return roommate
}
export { crearRoommate }