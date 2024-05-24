import { AppShell, Stack } from '@mantine/core';
import { Outlet, NavLink } from 'react-router-dom';
import Logo from '../logo/Logo';
import classes from './Layout.module.css';
import { linkType } from './types';

const navLinks: linkType[] = [
  { path: '/movies', label: 'Movies' },
  { path: '/rated', label: 'Rated movies' },
];

function Layout() {
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
      <AppShell.Main bg='grey.1'>
        <Stack px={90} pb={82} pt={40} mih='100vh'>
          <Outlet />
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}

export default Layout;
