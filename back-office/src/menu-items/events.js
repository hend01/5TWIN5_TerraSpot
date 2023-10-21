import { AppstoreOutlined, AppstoreAddOutlined } from '@ant-design/icons';

// icons
const icons = {
  AppstoreOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const events = {
  id: 'group-produit',
  title: 'Events',
  type: 'group',
  children: [
    {
      id: 'events-list',
      title: 'Liste des Evenements',
      type: 'item',
      url: '/events-list',
      icon: icons.AppstoreOutlined
    },
    {
      id: 'add-event',
      title: 'Ajouter Evenement',
      type: 'item',
      url: '/add-event',
      icon: icons.AppstoreAddOutlined
    }
  ]
};

export default events;
