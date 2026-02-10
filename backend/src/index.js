import "./config/env.js"
import express from "express"
import cors from "cors"
import authRoute from "./routes/authRoute.js"
import assetRoute from "./routes/assetRoute.js"
import maintenanceRoute from "./routes/maintenanceRoute.js"
import vendorRoute from "./routes/vendorRoute.js"

const app = express();

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.use("/api/auth", authRoute)
app.use("/api/assets", assetRoute)
app.use("/api/maintenance", maintenanceRoute)
app.use("/api/vendors", vendorRoute)

app.get("/", (req, res) =>{
    res.send("API berjalan 🚀")
})

app.listen(4000, () => {
    console.log(`SERVER IS RUNNING ON : http://localhost:4000`)
})