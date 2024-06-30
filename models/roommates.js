import { v4 as uuidv4 } from "uuid";
import fs from "node:fs/promises"
import path from "node:path";
import axios from "axios";

const expensesFile = path.join(import.meta.dirname, "../data/gastos.json")
const usersFile = path.join(import.meta.dirname, "../data/usuarios.json")

export const getRoommates = async () => {

    //Leemos la data
    const data = await fs.readFile(usersFile, "utf-8")
    //La transformamos a JSON con el parse
    const rommates = JSON.parse(data)
    return rommates
}

export const createRoommate = async () => {
    //Obtenemos la data de la app con axios
    const data = await axios.get("https://randomuser.me/api")
    const user = data.data.results[0]

    //Creamos el roommate con id desde uuid
    //Nombre y Email desde Api
    //Montos iniciales 0
    const roommate = {
        id: uuidv4(),
        nombre: `${user.name.first} ${user.name.last}`,
        email: user.email,
        debe: 0,
        recibe: 0
    }
    //Leemos la data del Json donde la enviaremos
    fs.readFile(usersFile, "utf-8")
        .then(data => {
            const rommatesJSON = JSON.parse(data)

            //Push para enviar la dara nueva
            rommatesJSON.roommates.push(roommate)

            return rommatesJSON
        })
        .then(rommates => {
            //Se reemplaza la data antigua con la nueva con el push anterior incluido
            fs.writeFile(usersFile, JSON.stringify(rommates))
        })
        .catch(error => {
            throw new Error('Cant create user')
        })

    return roommate
}
export const recalcularDeudas = async () => {
    const dataUsers = await fs.readFile(usersFile, "utf-8")
    const dataExpenses = await fs.readFile(expensesFile, "utf-8")

    // Obtiene los arreglos de roommates y de gastos
    let { roommates } = JSON.parse(dataUsers)
    const { gastos } = JSON.parse(dataExpenses)

    // Reseteamos roomates para calcular
    roommates = roommates.map(r => {
        r.debe = 0
        r.recibe = 0
        r.total = 0

        return r
    })

    // obtiene el largo del arreglo roommates, y lo asigna a totalRoommates
    const { length: totalRoommates } = roommates

    // itera sobre cada gasto
    gastos.forEach(gasto => {
        // obtiene el monto del gasto actual, y quien hizo el gasto
        // asignandolo a la variable "quienGasto"
        const { monto, roommate: quienGasto } = gasto
        const montoPorPersona = monto / totalRoommates

        // para este gasto particular, itera sobre los roommates y asigna 
        // Cuanto debe cada roommate y cuanto le deben a la persona que hizo el gasto
        roommates = roommates.map(roommate => {
            const { nombre } = roommate

            if (quienGasto == nombre) {
                roommate.recibe += montoPorPersona * (totalRoommates - 1)
            } else {
                roommate.debe -= montoPorPersona
            }

            roommate.total = roommate.recibe - roommate.debe

            return roommate
        })
    });

    // una vez terminado el ciclo de asignación, escribe nuevamente el archivo con los datos
    // de cuanto debe y cuando recibe cada roommate
    await fs.writeFile(usersFile, JSON.stringify({ roommates }))
}