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
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import CreateOrderPage from "./pages/CreateOrderPage";
import Dashboard from "./pages/Dashboard";
import CreateProduct from "./pages/CreateProduct";
import Orders from "./pages/Orders";

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
              <Route element={<Dashboard />}>
                <Route path="" element={<Profile />} />
                <Route path="cart" element={<Cart />} />
                <Route path="createOrder" element={<CreateOrderPage />} />
                <Route path="orders" element={<Orders />} />
                <Route
                  path="orders/:orderId"
                  element={<h1>not implemented yet</h1>}
                />
                <Route
                  path="orders/create"
                  element={<h1>not implemented yet</h1>}
                />
                <Route
                  path="employee"
                  element={<EmployeeAdminProtectedRoutes />}
                >
                  <Route path="" element={<h1>not implemented yet</h1>} />
                  <Route path="products/create" element={<CreateProduct />} />
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
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{ margin: "10rem" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "1.2rem",
            lineHeight: "2",
            maxWidth: "20rem",
            padding: "1.5rem, 2.5rem",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
