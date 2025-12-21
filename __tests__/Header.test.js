import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import Header from "../components/Header";

/* ---------- MOCKS ---------- */
jest.mock("expo-router", () => ({
  router: {
    back: jest.fn(),
  },
}));

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    Ionicons: (props) => React.createElement("Ionicons", props, null),
  };
});

describe("Header component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("matches snapshot", () => {
    const tree = render(<Header title="Dashboard" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the title correctly", () => {
    const { getByText } = render(<Header title="Dashboard" />);
    expect(getByText("Dashboard")).toBeTruthy();
  });

  it("calls router.back when back button is pressed and onBack is not provided", () => {
    const { getByTestId } = render(<Header title="Dashboard" />);
    fireEvent.press(getByTestId("header-back"));
    expect(router.back).toHaveBeenCalledTimes(1);
  });

  it("calls custom onBack function when provided", () => {
    const onBackMock = jest.fn();

    const { getByTestId } = render(
      <Header title="Dashboard" onBack={onBackMock} />
    );

    fireEvent.press(getByTestId("header-back"));
    expect(onBackMock).toHaveBeenCalledTimes(1);
    expect(router.back).not.toHaveBeenCalled();
  });
});
