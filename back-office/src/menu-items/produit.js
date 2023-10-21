import { AppstoreOutlined, AppstoreAddOutlined } from '@ant-design/icons';

// icons
const icons = {
  AppstoreOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const produit = {
  id: 'group-produit',
  title: 'Produits',
  type: 'group',
  children: [
    {
      id: 'produit-list',
      title: 'Liste des Produits',
      type: 'item',
      url: '/produit-list',
      icon: icons.AppstoreOutlined
    },
    {
      id: 'produit-add',
      title: 'Ajouter Produit',
      type: 'item',
      url: '/add-produit',
      icon: icons.AppstoreAddOutlined
    }
  ]
};

export default produit;
