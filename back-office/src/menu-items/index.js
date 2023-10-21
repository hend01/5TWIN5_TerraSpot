// project import
import commande from './commande';
import dashboard from './dashboard';
import events from './events';
import produit from './produit';
import reclamation from './reclamation';
import terrain from './terrain';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, produit, commande,terrain, reclamation, events]
};

export default menuItems;
