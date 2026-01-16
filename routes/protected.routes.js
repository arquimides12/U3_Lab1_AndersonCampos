const express = require("express");
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/role");

const router = express.Router();

//  Cualquier usuario autenticado
router.get("/perfil", auth, (req, res) => {
  res.json({
    message: "Acceso permitido",
    user: req.user,
  });
});

// Solo ADMIN
router.get("/admin", auth, allowRoles("admin"), (req, res) => {
  res.json({ message: "Panel de administración" });
});

// 🔹 ADMIN o DOCENTE
router.get("/docente", auth, allowRoles("admin", "docente"), (req, res) => {
  res.json({ message: "Zona docente" });
});

module.exports = router;
