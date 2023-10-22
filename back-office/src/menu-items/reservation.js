import { DeliveredProcedureOutlined } from '@ant-design/icons';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const reservation = {
  id: 'group-reservation',
  title: 'reservations',
  type: 'group',
  children: [
    {
      id: 'reservation-list',
      title: 'Liste des reservations',
      type: 'item',
      url: '/reservation-list',
      icon: DeliveredProcedureOutlined
    }
  ]
};

export default reservation;
