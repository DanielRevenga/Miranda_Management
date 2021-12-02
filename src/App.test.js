import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import "@testing-library/jest-dom";
import Bookings from './components/pages/Bookings';
import { Button } from './styles/components/Button';

afterEach(cleanup);

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

test("Button - font-size prop", () => {
  render(<Button fontSize={5} >Button Test</Button>);

  expect(screen.queryByText("Button Test")).toHaveStyle("fontSize : 5m");
});

test("Button - background-color prop", () => {
  render(<Button bg="red" >Button Test</Button>);

  expect(screen.queryByText("Button Test")).toHaveStyle("backgroundColor : red");
});

test("Button - color prop", () => {
  render(<Button color="blue" >Button Test</Button>);

  expect(screen.queryByText("Button Test")).toHaveStyle("color : blue");
});

