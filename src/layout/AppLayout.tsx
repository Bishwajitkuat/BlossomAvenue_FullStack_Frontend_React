import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <div className="flex h-screen w-screen min-w-[360px] flex-col">
      <Header />
      <main className="flex-1 h-full text-slate-900 font-sans font-light grow overflow-y-auto bg-gradient-to-br from-pink-50 to-pink-200">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
