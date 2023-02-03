import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders text name", () => {
  render(<App />);
  const linkElement = screen.getByText(/Все пиццы/i);
  expect(linkElement).toBeInTheDocument();
});
