import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';
import Shops from '../../components/Shops/Shops';
import Account from '../../../modules/account/MyProfile'
import OrderTable from '../../components/Orders/OrderTable';
import Orders from '../../components/Orders';

export const accountPagesConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: '/shops',
    element: <Shops />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: '/my-profile',
    element: <Account />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: '/dashboards/order',
    element: <Orders />,
  },
];
