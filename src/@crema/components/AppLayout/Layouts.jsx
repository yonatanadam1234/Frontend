import Default from './DefaultLayout';
import { NavStyle } from '@crema/constants/AppEnums';
import BitBucket from './BitBucket';
import Standard from './Standard';
import DrawerLayout from './DrawerLayout';
import MiniSidebar from './MiniSidebar';
import MiniSidebarToggle from './MiniSidebarToggle';
import HeaderUserLayout from './UserHeader';
import HeaderUserMiniLayout from './UserMiniHeader';
import HorDefault from './HorDefault';
import HorHeaderFixed from './HorHeaderFixed';
import HorDarkLayout from './HorDarkLayout';

const Layouts = {
  [NavStyle.DEFAULT]: MiniSidebar,
  [NavStyle.BIT_BUCKET]: BitBucket,
  [NavStyle.STANDARD]: Standard,
  [NavStyle.DRAWER]: DrawerLayout,
  [NavStyle.MINI]: Default,
  [NavStyle.MINI_SIDEBAR_TOGGLE]: MiniSidebarToggle,
  [NavStyle.DEFAULT]: HeaderUserLayout,
  [NavStyle.HEADER_USER_MINI]: HeaderUserMiniLayout,
  [NavStyle.H_DEFAULT]: HorDefault,
  [NavStyle.HOR_HEADER_FIXED]: HorHeaderFixed,
  [NavStyle.HOR_DARK_LAYOUT]: HorDarkLayout,
};
export default Layouts;
