import { render, screen } from "@testing-library/react";
import Error from "../../../components/ui/Error";

describe("Test NotAvailable component", () => {
  it("Render correct message", () => {
    const message = "test";
    render(<Error message={message} />);
    const headingElement = screen.getByText(/test/i);
    expect(headingElement).toBeInTheDocument();
  });
});
