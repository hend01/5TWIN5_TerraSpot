const express = require("express");
const {
  createCommande,
  getCommandes,
  getCommandeById,
  updateCommande,
  deleteCommande,
} = require("../controllers/commandeController");
const router = express.Router();

// Créer une nouvelle commande
router.post("/commandes", createCommande);

// Obtenir la liste de toutes les commandes
router.get("/commandes", getCommandes);

// Obtenir une commande par son ID
router.get("/commandes/:id", getCommandeById);

// Mettre à jour une commande par son ID
router.put("/commandes/:id", updateCommande);

// Supprimer une commande par son ID
router.delete("/commandes/:id", deleteCommande);

module.exports = router;
