import { DeliveredProcedureOutlined } from '@ant-design/icons';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const commande = {
  id: 'group-commande',
  title: 'Commandes',
  type: 'group',
  children: [
    {
      id: 'commande-list',
      title: 'Liste des commandes',
      type: 'item',
      url: '/commande-list',
      icon: DeliveredProcedureOutlined
    }
  ]
};

export default commande;
