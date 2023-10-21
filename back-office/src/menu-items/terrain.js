import { AppstoreOutlined, AppstoreAddOutlined } from '@ant-design/icons';

// icons
const icons = {
  AppstoreOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const terrain = {
    id: 'group-terrains',
    title: 'Terrains',
    type: 'group',
    children: [
      {
        id: 'terrain-list',
        title: 'Liste des terrains',
        type: 'item',
        url: '/terrain-list',
        icon: icons.AppstoreOutlined
      },
      {
        id: 'terrain-add',
        title: 'Ajouter Terrain',
        type: 'item',
        url: '/add-terrain',
        icon: icons.AppstoreAddOutlined
      },
     
      
    ]
  };

export default terrain;
