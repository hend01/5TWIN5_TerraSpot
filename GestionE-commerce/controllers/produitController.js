const Produit = require("../model/Produit.model");

// Contrôleur pour afficher tous les produits
exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.find();
    res.json(produits);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des produits.",
    });
  }
};

// Contrôleur pour télécharger et ajouter un nouveau produit
exports.addProduit = async (req, res) => {
  try {
    const {
      titre,
      description,
      couleur,
      quantite,
      prix,
      taille,
      categorie,
      marque,
      description_detaillee,
    } = req.body;

    // Vérifier si les champs requis sont fournis
    if (!titre || !description || !quantite || !prix || !categorie) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs requis." });
    }

    if (!req.body.images || !Array.isArray(req.body.images)) {
      return res.status(400).json({
        message:
          "Veuillez fournir les URLs des images pour la galerie de photos.",
      });
    }

    // Créer un nouveau produit avec les données fournies
    const produit = new Produit({
      titre,
      description,
      couleur,
      quantite,
      prix,
      taille,
      categorie,
      marque,
      description_detaillee,
    });

    // Ajouter les URLs des images à la galerie
    for (const imageUrl of req.body.images) {
      produit.images.push({
        secure_url: imageUrl,
      });
    }

    // Enregistrer la galerie avec les images fournies
    await produit.save();

    res
      .status(201)
      .json({ message: "Le produit a été ajouté avec succès.", produit });
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit :", error);
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de l'ajout du produit." });
  }
};

// Contrôleur pour supprimer un produit par son ID
exports.deleteProduit = async (req, res) => {
  try {
    const produitId = req.params.id;

    // Vérifier si le produit existe avant de le supprimer
    const produit = await Produit.findById(produitId);
    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    // Supprimer le produit
    await Produit.findByIdAndRemove(produitId);

    res.json({ message: "Produit supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la suppression du produit.",
    });
  }
};

// Route pour récupérer un produit par son ID
exports.getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.produitId);

    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    res.json(produit);
  } catch (error) {
    console.error("Erreur lors de la récupération du produit par ID :", error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération du produit par ID.",
    });
  }
};

// Contrôleur pour mettre à jour un produit en fonction de son identifiant unique
exports.updateProduit = async (req, res) => {
  try {
    const produitId = req.params.id; // Récupérez l'identifiant du produit depuis les paramètres de la requête

    // Vérifiez si le produit existe avant de le mettre à jour
    const produit = await Produit.findById(produitId);
    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    // Récupérez les données de mise à jour depuis le corps de la requête
    const {
      titre,
      description,
      couleur,
      quantite,
      prix,
      taille,
      categorie,
      marque,
      description_detaillee,
      images, // Si vous souhaitez également mettre à jour les images, assurez-vous de les inclure dans le corps de la requête
    } = req.body;

    // Mettez à jour les propriétés du produit avec les nouvelles données
    produit.titre = titre || produit.titre;
    produit.description = description || produit.description;
    produit.couleur = couleur || produit.couleur;
    produit.quantite = quantite || produit.quantite;
    produit.prix = prix || produit.prix;
    produit.taille = taille || produit.taille;
    produit.categorie = categorie || produit.categorie;
    produit.marque = marque || produit.marque;
    produit.description_detaillee =
      description_detaillee || produit.description_detaillee;

    // Mettez à jour les images si elles sont fournies dans la requête
    if (images && Array.isArray(images)) {
      produit.images = images.map((image) => ({ secure_url: image }));
    }

    // Enregistrez les modifications apportées au produit
    await produit.save();

    res.json({ message: "Produit mis à jour avec succès.", produit });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la mise à jour du produit.",
    });
  }
};

// Contrôleur pour afficher tous les categorie
exports.getAllCategories = async (req, res) => {
  try {
    // Utilisez la méthode distinct de Mongoose pour récupérer toutes les catégories uniques
    const categories = await Produit.distinct("categorie");
    res.json(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des produits.",
    });
  }
};

// Contrôleur pour afficher toutes les catégories avec le nombre de produits
exports.getAllCategorie = async (req, res) => {
  try {
    // Utilisez la méthode distinct de Mongoose pour récupérer toutes les catégories uniques
    const categories = await Produit.distinct("categorie");

    // Créez un tableau pour stocker les catégories avec le nombre de produits
    const categoriesAvecCompte = [];

    // Parcourez chaque catégorie pour compter le nombre de produits
    for (const categorie of categories) {
      const count = await Produit.countDocuments({ categorie });
      categoriesAvecCompte.push({ nom: categorie, nombreDeProduits: count });
    }

    res.json(categoriesAvecCompte);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des produits.",
    });
  }
};

// Contrôleur pour afficher tous les produits
exports.getAllProduit = async (req, res) => {
  try {
    const produits = await Produit.find();
    res.json(produits);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des produits.",
    });
  }
};



// Fonction pour mettre à jour les produits avec les moyennes des avis
async function updateProductsWithAverageRatings() {
  try {
    // Calculez la moyenne des avis pour chaque produit
    const averageRatings = await calculateAverageRatingsForProducts();

    // Récupérez la liste des produits
    const products = await Produit.find();

    // Créez un objet pour stocker les moyennes des avis par produit
    const productRatingsMap = {};
    averageRatings.forEach((rating) => {
      productRatingsMap[rating._id] = rating.averageRating;
    });

    // Mettez à jour chaque produit avec sa moyenne respective
    for (const product of products) {
      const averageRating = productRatingsMap[product._id] || 0; // Valeur par défaut si aucune moyenne trouvée
      product.averageRating = averageRating;
      await product.save(); // Enregistrez la mise à jour dans la base de données
    }
  } catch (error) {
    throw error;
  }
}

// Fonction pour récupérer la liste des produits avec les moyennes des avis
exports.mostRated = async (req, res) => {
  try {
    // Mettez à jour les produits avec les moyennes des avis
    await updateProductsWithAverageRatings();

    // Récupérez la liste des produits mise à jour
    const products = await Produit.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Route pour trier les produits par "Most Rated"
exports.getAllProduitByRating = async (req, res) => {
  try {
    const products = await Produit.find().sort({ averageRating: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Route pour trier les produits par "Date"
exports.getAllProduitByDate = async (req, res) => {
  try {
    const products = await Produit.find().sort({ date: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProduitsByCategories = async (req, res) => {
  const selectedCategories = req.params.categories.split(",");

  // Filtrer les produits en fonction des catégories sélectionnées
  Produit.find({ categorie: { $in: selectedCategories } })
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      console.error(
        "Erreur lors de la récupération des produits par catégorie :",
        error
      );
      res.status(500).json({ error: "Erreur serveur" });
    });
};

// Exemple de route pour filtrer les produits par prix
exports.getProduitsByPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;

    // Votre logique de filtrage ici, par exemple en utilisant une requête à la base de données
    const filteredProducts = await Produit.find({
      prix: { $gte: minPrice, $lte: maxPrice },
    });

    res.json(filteredProducts);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des produits par prix :",
      error
    );
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.search = async (req, res) => {
  try {
    const searchTerm = req.query.q; // Récupérez les termes de recherche depuis la requête GET

    // Utilisez une requête Mongoose pour rechercher des produits qui correspondent aux termes de recherche
    const results = await Produit.find({
      $or: [
        { titre: { $regex: searchTerm, $options: "i" } }, // Recherche insensible à la casse dans le titre
        { description: { $regex: searchTerm, $options: "i" } }, // Recherche insensible à la casse dans la description
        // Ajoutez d'autres champs à rechercher si nécessaire
      ],
    });

    res.json(results); // Renvoyer les résultats de la recherche au format JSON
  } catch (error) {
    console.error("Erreur lors de la recherche de produits :", error);
    res.status(500).json({ error: "Erreur lors de la recherche de produits" });
  }
};

// Fonction pour obtenir 4 produits au hasard
exports.getRandomProducts = async (req, res) => {
  try {
    // Récupérez tous les produits depuis la base de données
    const allProducts = await Produit.find();
    // Si le nombre total de produits est inférieur ou égal à 2, renvoyez-les tous
    if (allProducts.length <= 2) {
      return res.status(200).json(allProducts);
    }

    // Mélangez la liste des produits de manière aléatoire
    const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());

    // Sélectionnez les 2 premiers produits mélangés
    const randomProducts = shuffledProducts.slice(0, 2);

    // Envoyez les produits en tant que réponse JSON
    res.status(200).json(randomProducts);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des produits au hasard :",
      error
    );
    res
      .status(500)
      .json({
        message:
          "Une erreur s'est produite lors de la récupération des produits au hasard.",
      });
  }
};
