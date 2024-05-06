import React from 'react';
import { RoutePermittedRole } from '@crema/constants/AppEnums';
import Shops from '../../components/Shops/Shops';

export const accountPagesConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: '/shops',
    element: <Shops />,
  },
];
