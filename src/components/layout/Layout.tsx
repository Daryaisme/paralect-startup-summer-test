import { FC } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { AppShell, Stack } from '@mantine/core';
import Logo from '../logo/Logo';
import { linkType } from './types';
import classes from './Layout.module.css';

const navLinks: linkType[] = [
  { path: '/movies', label: 'Movies' },
  { path: '/rated-movies', label: 'Rated movies' },
];

const Layout: FC = () => {
  return (
    <AppShell
      navbar={{
        width: 280,
        breakpoint: 'xs',
      }}
    >
      <AppShell.Navbar p={24} bg="purple.1" withBorder={false}>
        <Stack gap={80}>
          <Logo />

          <Stack gap={16} fz={16} className={classes.cl}>
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `${classes.link} ${isActive ? classes.link_active : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </Stack>
        </Stack>
      </AppShell.Navbar>
      
      <AppShell.Main bg="grey.1">
        <Stack px={90} pb={80} pt={40} mih="100vh">
          <Outlet />
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}

export default Layout;
