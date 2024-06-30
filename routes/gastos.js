import { Router } from "express";
import path from "node:path"
import { v4 as uuidv4 } from "uuid";
import fs from "node:fs/promises"
import { getGastos, crearGasto, deleteGasto, updateGasto } from "../models/gastos.js"
import { recalcularDeudas } from "../models/roommates.js"


const router = Router()

router.get("/gastos", async (req, res) => {
    try {

        const gastos = await getGastos()
        res.json(gastos)

    } catch {
        res.status(500).json({
            status: 500,
            message: 'Error interno de servidor'
        })
    }
})

router.post("/gasto", async (req, res) => {
    const payload = req.body
    console.log(payload)
    try {
        const gasto = await crearGasto(payload)
        recalcularDeudas();
        res.send(gasto)

    } catch (error) {
        // respondemos con error interno
        res.status(500).json({
            message: "Error interno de servidor",
            status: 500
        })
    }
}
)
router.delete("/gasto", async (req, res) => {

    const id = req.query.id
    try {
        await deleteGasto(id)
    } catch (error) {
        // respondemos con error interno
        res.status(500).json({
            message: "Error interno de servidor",
            status: 500
        })
    }
}
)

router.put("/gastos", async (req, res) => {
    // Obtenemos id del queryString y payload del body
    const id = req.query.id
    const payload = req.body
    //Verificamos que los querys contengan información , ya que se cae por el html 
    const traeValores = !Object.values(payload).some(value => value == '')
    console.log(id)
    if (traeValores) {

        try {
            //Funcion de actualizar situada en los models 
            await updateGasto(id, payload)
            res.status(200).json({
                message: 'Gasto Modificado'
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Error interno de servidor'
            })
        }
    }
}
)


export { router }