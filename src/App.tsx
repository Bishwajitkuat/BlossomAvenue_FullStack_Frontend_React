import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Product from "./pages/Product";
import ProtectedRoutes from "./features/Authorizations/ProtectedRoutes";
import Cart from "./pages/Cart";
import EmployeeAdminProtectedRoutes from "./features/Authorizations/EmployeeAdminProtectedRoutes";
import AdminProtectedRoutes from "./features/Authorizations/AdminProtectedRoutes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<Product />} />
            <Route path="user" element={<ProtectedRoutes />}>
              <Route
                path=""
                element={<h1>User profile: not implemented yet</h1>}
              />
              <Route path="cart" element={<Cart />} />
              <Route path="orders" element={<h1>not implemented yet</h1>} />
              <Route
                path="orders/:orderId"
                element={<h1>not implemented yet</h1>}
              />
              <Route
                path="orders/create"
                element={<h1>not implemented yet</h1>}
              />
              <Route path="employee" element={<EmployeeAdminProtectedRoutes />}>
                <Route
                  path=""
                  element={<h1>Employee dashboard not implemented yet</h1>}
                />
                <Route
                  path="products/create"
                  element={<h1>not implemented yet</h1>}
                />
                <Route
                  path="products/update/:productId"
                  element={<h1>not implemented yet</h1>}
                />
              </Route>
              <Route path="admin" element={<AdminProtectedRoutes />}>
                <Route
                  path=""
                  element={<h1>Admin dashboard not implemented yet</h1>}
                />
                <Route path="users" element={<h1>not implemented yet</h1>} />
                <Route
                  path="users/update/:userId"
                  element={<h1>not implemented yet</h1>}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
