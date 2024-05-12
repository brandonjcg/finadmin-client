import {
  BanknotesIcon,
  HomeIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { ListItem, ListItemPrefix } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  title: string;
  path: string;
}

interface IconMap {
  [key: string]: JSX.Element;
}

const iconMap = {
  '/': <HomeIcon className="h-5 w-5" />,
  '/banks': <BanknotesIcon className="h-5 w-5" />,
  '/ecommerce': <ShoppingCartIcon className="h-5 w-5" />,
} as IconMap;

export const SidebarItem = ({ title, path }: Readonly<SidebarItemProps>) => {
  const icon = iconMap[path];

  return (
    <Link to={path}>
      <ListItem>
        <ListItemPrefix>{icon}</ListItemPrefix>
        {title}
      </ListItem>
    </Link>
  );
};
