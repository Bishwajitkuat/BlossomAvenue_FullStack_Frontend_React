import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import useGetCart from "../../hooks/Cart/useGetCart";
import useClearCart from "../../hooks/Cart/useClearCart";
import CartDetail from "../../features/Cart/CartDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock hooks
jest.mock("../../hooks/Cart/useGetCart");
jest.mock("../../hooks/Cart/useClearCart");

describe("CartDetail Component", () => {
  const mockClearCart = jest.fn();
  const mockUseGetCart = useGetCart as jest.Mock;
  const mockUseClearCart = useClearCart as jest.Mock;

  const createTestQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

  beforeEach(() => {
    mockUseClearCart.mockReturnValue({
      isCartClearLoading: false,
      clearCart: mockClearCart,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithQueryClient = (ui: React.ReactElement) => {
    const queryClient = createTestQueryClient();
    return render(
      <QueryClientProvider client={queryClient}>
        <Router>{ui}</Router>
      </QueryClientProvider>
    );
  };

  test("renders the loader when the cart is loading", () => {
    mockUseGetCart.mockReturnValue({
      isCartLoading: true,
      cartError: null,
      cart: null,
    });

    renderWithQueryClient(<CartDetail />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("renders cart items when available", () => {
    const cartData = {
      cartItems: [
        {
          cartItemsId: 1,
          price: 50,
          quantity: 2,
        },
        {
          cartItemsId: 2,
          price: 30,
          quantity: 1,
        },
      ],
    };

    mockUseGetCart.mockReturnValue({
      isCartLoading: false,
      cartError: null,
      cart: cartData,
    });

    renderWithQueryClient(<CartDetail />);

    expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: 130.00€/i)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("displays the NoItemInCart component when the cart is empty", () => {
    const emptyCartData = {
      cartItems: [],
    };

    mockUseGetCart.mockReturnValue({
      isCartLoading: false,
      cartError: null,
      cart: emptyCartData,
    });

    renderWithQueryClient(<CartDetail />);

    expect(
      screen.getByText(/You have no item in the cart/i)
    ).toBeInTheDocument();
  });

  test('handles "Clear Cart" button click', () => {
    const cartData = {
      cartItems: [
        {
          cartItemsId: 1,
          price: 50,
          quantity: 2,
        },
      ],
    };

    mockUseGetCart.mockReturnValue({
      isCartLoading: false,
      cartError: null,
      cart: cartData,
    });

    renderWithQueryClient(<CartDetail />);

    const clearCartButton = screen.getByRole("button", { name: /clear cart/i });
    fireEvent.click(clearCartButton);

    expect(mockClearCart).toHaveBeenCalled();
  });
});
