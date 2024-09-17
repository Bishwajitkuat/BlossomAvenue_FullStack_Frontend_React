import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <div className="flex h-screen w-screen min-w-[360px] flex-col">
      <Header />
      <main className="flex-1 grow overflow-y-auto bg-gradient-to-br from-zinc-400 to-zinc-900">
        <div className="max-w-[1280px] mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
