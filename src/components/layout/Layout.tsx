import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <AppShell>
      <AppShell.Navbar>Navbar</AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export default Layout;
