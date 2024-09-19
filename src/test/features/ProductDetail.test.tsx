import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { toast } from "react-hot-toast";
import useGetProductById from "../../hooks/products/useGetProductById";
import useAddToCart from "../../hooks/Cart/useAddToCart";
import ProductDetail from "../../features/Products/ProductDetail";
import { MemoryRouter } from "react-router-dom";

// Mock hooks
jest.mock("../../hooks/products/useGetProductById");
jest.mock("../../hooks/Cart/useAddToCart");
jest.mock("react-hot-toast");

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithQueryClientAndRouter = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe("ProductDetail Component", () => {
  const mockProduct = {
    productId: "12345",
    title: "Rose Bouquet",
    description: "A beautiful bouquet of fresh roses.",
    images: [{ url: "image1.jpg", altText: "Rose image" }],
    variations: [{ id: "var1", name: "Red" }],
    avgStar: 4,
    productReviews: [],
  };

  beforeEach(() => {
    (useGetProductById as jest.Mock).mockReturnValue({
      isProductLoading: false,
      isError: false,
      error: null,
      product: mockProduct,
    });

    (useAddToCart as jest.Mock).mockReturnValue({
      isAddToCartLoading: false,
      addToCart: jest.fn(),
    });

    toast.error = jest.fn();
  });

  test("renders product title and description", () => {
    renderWithQueryClientAndRouter(<ProductDetail />);

    expect(screen.getByText("Rose Bouquet")).toBeInTheDocument();
    expect(
      screen.getByText("A beautiful bouquet of fresh roses.")
    ).toBeInTheDocument();
  });

  test("shows loader when product is loading", () => {
    (useGetProductById as jest.Mock).mockReturnValue({
      isProductLoading: true,
      isError: false,
      error: null,
      product: null,
    });

    renderWithQueryClientAndRouter(<ProductDetail />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("shows error message when there is an error", async () => {
    (useGetProductById as jest.Mock).mockReturnValue({
      isProductLoading: false,
      isError: true,
      error: { message: "Product not found" },
      product: null,
    });

    renderWithQueryClientAndRouter(<ProductDetail />);
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Product not found");
    });
  });
});
