import { DeliveredProcedureOutlined } from '@ant-design/icons';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const reclamation = {
  id: 'group-reclamation',
  title: 'Reclamations',
  type: 'group',
  children: [
    {
      id: 'reclamation-list',
      title: 'Liste des Reclamations',
      type: 'item',
      url: '/reclamation-list',
      icon: DeliveredProcedureOutlined
    }
  ]
};

export default reclamation;
