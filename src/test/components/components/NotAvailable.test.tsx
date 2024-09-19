import { render, screen } from "@testing-library/react";
import NotAvailable from "../../../components/NotAvailable";

describe("Test NotAvailable component", () => {
  it("Render correct message", () => {
    const item = "test";
    render(<NotAvailable item={item} />);
    const headingElement = screen.getByText(/test/i);
    expect(headingElement).toBeInTheDocument();
  });
});
