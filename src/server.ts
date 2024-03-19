import express, { Application, Request, Response, NextFunction } from "express"
import rateLimit from "express-rate-limit"
import cors from "cors"
import pricingRouter from './routes/pricing'

const RYDEU_URI = "/api"

const app: Application = express()
app.use(express.json())
app.use(cors())

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 100
})
app.use(limiter)

app.use(`${RYDEU_URI}`, pricingRouter)

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
        success: false,
        data: "Invalid api endpoint" 
    })
})

const PORT: number = parseInt(process.env.PORT || '5000', 10);
const server = app.listen(PORT, () => {
    console.log(`Server Listening at PORT ${PORT}`);
})

process.on('unhandledRejection', (error: any, promise: Promise<any>) => {
    console.error(`Error ${error.message}`);
    server.close(() => {
        process.exit(1);
    });
});

