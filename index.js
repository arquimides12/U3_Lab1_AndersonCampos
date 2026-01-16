const express = require("express");
require("dotenv").config();
const sequelize = require("./config/db");
const User = require("./models/User");
const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes");
const app = express();
app.use(express.json());
// Rutas públicas
app.use("/auth", authRoutes);
// Rutas protegidas
app.use("/api", protectedRoutes);
// Ruta base
app.get("/", (req, res) => {
  res.send("API Roles funcionando correctamente");
});
// Iniciar servidor
async function start() {
  try {
    await sequelize.authenticate();
    console.log("✔ Conexión a la base de datos exitosa");
    // Sincronizar modelos
    await sequelize.sync({ alter: true });
    console.log("✔ Tablas sincronizadas");
    // Levantar servidor
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar la API:", error.message);
  }
}
start();
