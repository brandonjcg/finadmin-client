import { useState } from 'react';
import {
  IconButton,
  Typography,
  List,
  Drawer,
  Card,
} from '@material-tailwind/react';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { SidebarItem } from './SidebarItem';

export const Sidebar = ({
  routes,
}: {
  routes: { title: string; path: string }[];
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              <Link to="/">Home</Link>
            </Typography>
          </div>
          <List>
            <hr className="my-2 border-blue-gray-50" />
            {routes.map((route) => (
              <SidebarItem
                key={route.title}
                title={route.title}
                path={route.path}
              />
            ))}
          </List>
        </Card>
      </Drawer>
    </>
  );
};
