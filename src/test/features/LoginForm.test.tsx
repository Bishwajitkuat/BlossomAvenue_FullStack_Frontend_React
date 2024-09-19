import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import useAuth from "../../hooks/Auth/useUserLogin";
import LoginForm from "../../features/Authentications/LoginForm";

jest.mock("axios");
jest.mock("../../hooks/Auth/useUserLogin");

describe("LoginForm", () => {
  const mockLogin = jest.fn();
  const mockUseAuth = useAuth as jest.Mock;

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      isLoading: false,
      login: mockLogin,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the login form", () => {
    render(<LoginForm />);

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("allows the user to input username and password", () => {
    render(<LoginForm />);

    const usernameInput = screen.getByPlaceholderText("user name");
    const passwordInput = screen.getByPlaceholderText("password");
    fireEvent.change(usernameInput, { target: { value: "admin1@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "Abcd1234!" } });
    expect(usernameInput).toHaveValue("admin1@test.com");
    expect(passwordInput).toHaveValue("Abcd1234!");
  });

  test("calls login when form is submitted", () => {
    render(<LoginForm />);

    const usernameInput = screen.getByPlaceholderText("user name");
    const passwordInput = screen.getByPlaceholderText("password");
    const submitButton = screen.getByRole("button", { name: /login/i });
    fireEvent.change(usernameInput, { target: { value: "admin1@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "Abcd1234!" } });
    fireEvent.click(submitButton);

    expect(mockLogin).toHaveBeenCalledWith({
      username: "admin1@test.com",
      password: "Abcd1234!",
    });
  });

  test("renders loader when isLoading is true", () => {
    mockUseAuth.mockReturnValue({
      isLoading: true,
      login: mockLogin,
    });

    render(<LoginForm />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
