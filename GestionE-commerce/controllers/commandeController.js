const Commande = require("../model/Commande.model");
const Produit = require("../model/Produit.model");

exports.createCommande = async (req, res) => {
  try {
    const { nom_prenom, ville, adresse, tel, note, produits , prix_totale } = req.body;

    // Créez un tableau pour stocker les ID des produits à mettre à jour
    const produitsToUpdate = [];

    // Parcourez la liste des produits dans la commande
    for (const produitInfo of produits) {
      const produitId = produitInfo.produit;
      const produitQuantite = Number(produitInfo.quantite); // Convertissez en nombre

      // Récupérez le produit associé à la commande
      const produit = await Produit.findById(produitId);

      if (!produit) {
        return res
          .status(404)
          .json({ error: `Produit avec ID ${produitId} non trouvé` });
      }

      // Vérifiez si la quantité demandée est disponible
      if (Number(produit.quantite) < produitQuantite) {
        // Convertissez en nombre
        return res.status(400).json({
          error: `Quantité insuffisante pour le produit ${produit.titre}`,
        });
      }

      // Décrémentez la quantité du produit
      produit.quantite = produit.quantite - produitQuantite;

      // Ajoutez l'ID du produit à la liste des produits à mettre à jour
      produitsToUpdate.push({ _id: produitId, quantite: produit.quantite });
    }

    // Enregistrez la commande
    const nouvelleCommande = new Commande({
      nom_prenom,
      ville,
      adresse,
      tel,
      note,
      produits,
      prix_totale,
    });

    const commandeEnregistree = await nouvelleCommande.save();

    // Mettez à jour tous les produits en une seule opération
    await Produit.bulkWrite(
      produitsToUpdate.map((update) => ({
        updateOne: {
          filter: { _id: update._id },
          update: { $set: { quantite: update.quantite } },
        },
      }))
    );

    res.status(201).json(commandeEnregistree);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir la liste de toutes les commandes
exports.getCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find().populate("produits.produit"); // Remarquez la méthode .populate()
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir une commande par son ID
exports.getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id).populate("produits.produit"); // Remarquez la méthode .populate()
    if (!commande) {
      return res.status(404).json({ error: "Commande non trouvée" });
    }
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une commande par son ID
exports.updateCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!commande) {
      return res.status(404).json({ error: "Commande non trouvée" });
    }
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une commande par son ID
exports.deleteCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndRemove(req.params.id);
    if (!commande) {
      return res.status(404).json({ error: "Commande non trouvée" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
