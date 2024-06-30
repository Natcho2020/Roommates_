import path from "node:path";
import { v4 as uuidv4 } from "uuid";
import fs from "node:fs/promises"

const expensesFile = path.join(import.meta.dirname, "../data/gastos.json")

export const getGastos = async () => {
    try {
        const data = await fs.readFile(expensesFile)
        const gastos = JSON.parse(data)

        return gastos
    } catch (error) {
        console.error(error)
        return error
    }
}

export const crearGasto = async (payload) => {
    try {
        const newGasto = {
            id: uuidv4(),
            roommate: payload.roommate,
            descripcion: payload.descripcion,
            monto: payload.monto,

        }
        const data = await fs.readFile(expensesFile, "utf-8")

        const expensesData = JSON.parse(data)

        expensesData.gastos.push(newGasto)

        fs.writeFile(expensesFile, JSON.stringify(expensesData))

        return expensesData
    } catch (error) {
        console.error(error)
        return error
    }
}
export const deleteGasto = async (id) => {
    try {
        console.log(id)
        const data = await fs.readFile(expensesFile, "utf-8")
        const expensesData = JSON.parse(data)
        const indice = expensesData.gastos.findIndex(gasto => (gasto.id === id))
        if (indice >= 0) {
            console.log(indice)
            expensesData.gastos.splice(indice, 1);
            await fs.writeFile(expensesFile, JSON.stringify(expensesData))
        } else {
            return
        }
    } catch (error) {
        console.error(error)
    }
}
export const updateGasto = async (id, payload) => {
    try {
        console.log(id)
        const data = await fs.readFile(expensesFile, "utf-8")
        const expensesData = JSON.parse(data)
        const indice = expensesData.gastos.findIndex(gasto => (gasto.id === id))
        if (indice >= 0) {
            console.log(indice)
            expensesData.gastos.splice(indice, 1, payload);
            await fs.writeFile(expensesFile, JSON.stringify(expensesData))
        } else {
            return
        }
    } catch (error) {
        console.error(error)
    }
}
