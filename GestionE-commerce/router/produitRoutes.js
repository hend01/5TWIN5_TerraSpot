const express = require("express");
const { addProduit, getAllProduits, deleteProduit, getProduitById, updateProduit, getAllCategories, getAllProduit, getAllCategorie, mostRated, getAllProduitByRating, getAllProduitByDate, getProduitsByCategories, getProduitsByPrice, search, getRandomProducts } = require("../controllers/produitController.js");
const router = express.Router();

router.post("/addProduit", addProduit);
router.delete("/deleteProduit/:id", deleteProduit);
router.get("/getAllProduits", getAllProduits);
router.get("/getAllProduit", getAllProduit);
router.get("/getProduitById/:produitId", getProduitById);
router.get("/getProduitsById/:produitId",  getProduitById);
router.put("/updateProduit/:id", updateProduit);
router.get("/getAllCategories" ,getAllCategories);
router.get("/getAllCategorie" ,getAllCategorie);
router.post("/mostRated" ,mostRated);
router.get("/getAllProduitByRating" ,getAllProduitByRating);
router.get("/getAllProduitByDate" ,getAllProduitByDate);
router.get("/getProduitsByCategories/:categories" ,getProduitsByCategories);
router.get("/getProduitsByPrice" ,getProduitsByPrice);
router.get("/search" ,search);
router.get("/getRandomProducts" ,getRandomProducts);






module.exports = router;
