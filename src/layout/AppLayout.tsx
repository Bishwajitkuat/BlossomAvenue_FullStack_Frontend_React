import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <div className="flex h-screen w-screen min-w-[360px] flex-col">
      <Header />
      <main className="flex-1 text-slate-900 font-sans font-light grow overflow-y-auto bg-gradient-to-br from-pink-50 to-pink-200">
        <div className="max-w-[1280px] mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
