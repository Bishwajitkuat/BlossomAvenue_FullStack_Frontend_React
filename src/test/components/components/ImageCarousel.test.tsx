import { render, screen } from "@testing-library/react";
import ImageCarousel from "../../../components/ImageCarousel";

describe("Test ImageCarousel component", () => {
  const images = [{ imageId: "test", imageUrl: "string", productId: "string" }];

  render(<ImageCarousel images={images} />);
  it("Image element to be present", () => {
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });
});
