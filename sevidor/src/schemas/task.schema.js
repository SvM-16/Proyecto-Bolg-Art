import { z } from "zod"

export const createTaskSchema = z.object( {
    nombre: z.string( {
        required_error: "Nombre is required"
    } ),
    description: z.string( {
        required_error: "Description is required"
    } ),
    propietario: z.string( {
        required_error: "Propietario is required"
    } ),
    precio: z.string( {
        required_error: "Precio is required"
    } ),
    Urlimagen: z.string( {
        required_error: "Urlimagen is required"
    } ),
    date: z.string().datetime().optional()
} )