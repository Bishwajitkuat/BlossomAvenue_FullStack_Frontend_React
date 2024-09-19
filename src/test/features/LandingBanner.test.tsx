import { render, screen } from "@testing-library/react";
import { act } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import useGetLatestProducts from "../../hooks/products/useGetLatestProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LandingBanner from "../../features/Home/LandingBanner";

jest.mock("../../hooks/products/useGetLatestProducts");

const mockUseGetLatestProducts = useGetLatestProducts as jest.Mock;

describe("LandingBanner Component", () => {
  const createTestQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

  const renderWithQueryClient = (ui: React.ReactElement) => {
    const queryClient = createTestQueryClient();
    return render(
      <QueryClientProvider client={queryClient}>
        <Router>{ui}</Router>
      </QueryClientProvider>
    );
  };

  test("renders loading state", async () => {
    mockUseGetLatestProducts.mockReturnValue({
      isProductsLoading: true,
      paginatedProducts: null,
    });

    await act(async () => {
      renderWithQueryClient(<LandingBanner />);
    });

    expect(screen.getByText("Loading......")).toBeInTheDocument();
  });

  test("renders products when data is available", async () => {
    const productsMock = {
      items: [
        { productId: 1, title: "Rose Bouquet", price: 29.99 },
        { productId: 2, title: "Tulip Bundle", price: 19.99 },
      ],
    };

    mockUseGetLatestProducts.mockReturnValue({
      isProductsLoading: false,
      paginatedProducts: productsMock,
    });

    await act(async () => {
      renderWithQueryClient(<LandingBanner />);
    });

    expect(screen.getByText("Rose Bouquet")).toBeInTheDocument();
    expect(screen.getByText("Tulip Bundle")).toBeInTheDocument();
  });

  test('renders "Find More Products" link', async () => {
    mockUseGetLatestProducts.mockReturnValue({
      isProductsLoading: false,
      paginatedProducts: {
        items: [],
      },
    });

    await act(async () => {
      renderWithQueryClient(<LandingBanner />);
    });

    const findMoreLink = screen.getByText("Find More Products");
    expect(findMoreLink).toBeInTheDocument();
    expect(findMoreLink.closest("a")).toHaveAttribute("href", "/products");
  });
});
