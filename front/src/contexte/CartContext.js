import React, { createContext, useContext, useEffect, useState } from "react";

// Créez un contexte initial
const CartContext = createContext();

const initialCart = localStorage.getItem("shopping-cart") ? JSON.parse(localStorage.getItem("shopping-cart")) : [];

// Créez un fournisseur pour le contexte
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cart));
  });
  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    // Vérifiez d'abord si le produit est déjà dans le panier
    const existingProductIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      // Si le produit existe déjà dans le panier, incrémente la quantite_demande
      if (
        cart[existingProductIndex].quantite_demande <
        cart[existingProductIndex].quantite
      ) {
        const updatedCart = [...cart]; // Créez une copie du panier
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantite_demande:
            updatedCart[existingProductIndex].quantite_demande + 1,
        };
        setCart(updatedCart);
      } else {
        // Vous pouvez afficher une notification ici pour informer que la quantité maximale a été atteinte
        console.log("La quantité maximale est atteinte pour ce produit");
      }
    } else {
      // Si le produit n'existe pas encore dans le panier, l'ajoute avec quantite_demande à 1
      setCart([...cart, { ...product, quantite_demande: 1 }]);
    }
  };

  // Fonction pour diminuer la quantité d'un produit dans le panier
  const decreaseFromCart = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId && item.quantite_demande > 1) {
        // Créez une copie de l'objet produit pour éviter les modifications indésirables
        return { ...item, quantite_demande: item.quantite_demande - 1 };
      }
      return item;
    });

    setCart(updatedCart);
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decreaseFromCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Un hook pour utiliser le contexte du panier dans un composant
export const useCart = () => {
  return useContext(CartContext);
};
