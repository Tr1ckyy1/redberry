import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <>
      <Header />
      <main className="px-14">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
