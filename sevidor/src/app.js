import express from "express"
import morgan from "morgan"
import authRoutes from "./routes/user.routes.js"
import taskRoutes from "./routes/task.routes.js"
import carrito from './routes/carrito.routes.js';
import cookieParser from "cookie-parser"
import cors from 'cors'

const app = express()
app.use( cors({
    origin: "http://localhost:5173",
    credentials: true
}) )
app.use( express.json() )
app.use( morgan( "dev" ) )
app.use( cookieParser() )
app.use( "/api", authRoutes )
app.use( "/api", taskRoutes )
app.use('/api', carrito);

app.use('/uploads', express.static('uploads') )


export default app