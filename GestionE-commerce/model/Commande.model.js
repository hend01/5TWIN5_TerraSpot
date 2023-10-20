const mongoose = require("mongoose");

const CommandeSchema = new mongoose.Schema(
  {
    nom_prenom: {
      type: String,
      required: true,
    },
    ville: {
      type: String,
      required: true,
    },
    adresse: {
      type: String,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    prix_totale: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    confirme: {
      type: String,
      enum: ["Oui", "Non"],
      default: "Non",
    },
    delivre: {
      type: String,
      enum: ["Oui", "Non"],
      default: "Non",
    },
    produits: [
      {
        produit: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Produit",
          required: true,
        },
        quantite: {
          type: Number,
          required: true,
        },
        taille: {
          type: String,
        },
        couleur: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commande", CommandeSchema);
