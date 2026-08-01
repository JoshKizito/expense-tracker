import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <AppNav />
      <main className="pb-20 md:pb-0 md:pl-56">
        <Outlet />
      </main>
    </div>
  );
}
