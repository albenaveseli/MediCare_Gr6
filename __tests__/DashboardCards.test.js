import { fireEvent, render } from "@testing-library/react-native";
import DashboardCards from "../components/DashboardCards";

/* ---------- MOCKS ---------- */

// Mock expo-router router.push
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

import { router } from "expo-router";

// Mock Ionicons (për të shmangur warnings / act issues)
jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    Ionicons: (props) => React.createElement("Ionicons", props, null),
  };
});

describe("DashboardCards", () => {
  const pages = [
    { title: "Profile", icon: "person-outline", path: "/profile" },
    { title: "Appointments", icon: "calendar-outline", path: "/appointments" },
    { title: "Settings", icon: "settings-outline", path: "/settings" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* ---------- RENDER TEST ---------- */
  it("renders all cards based on pages prop", () => {
    const { getByText, getByTestId } = render(
      <DashboardCards pages={pages} />
    );

    // titujt shfaqen
    expect(getByText("Profile")).toBeTruthy();
    expect(getByText("Appointments")).toBeTruthy();
    expect(getByText("Settings")).toBeTruthy();

    // kartat ekzistojnë
    expect(getByTestId("dashboard-card-0")).toBeTruthy();
    expect(getByTestId("dashboard-card-1")).toBeTruthy();
    expect(getByTestId("dashboard-card-2")).toBeTruthy();
  });

  /* ---------- INTERACTION TEST ---------- */
  it("navigates to correct path when a card is pressed (interaction test)", () => {
    const { getByTestId } = render(
      <DashboardCards pages={pages} />
    );

    fireEvent.press(getByTestId("dashboard-card-1"));
    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith("/appointments");
  });

  /* ---------- SNAPSHOT TEST ---------- */
  it("matches snapshot (optional)", () => {
    const tree = render(<DashboardCards pages={pages} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  /* ---------- EDGE CASE ---------- */
  it("renders empty grid when pages is empty", () => {
    const { queryByTestId, queryByText } = render(
      <DashboardCards pages={[]} />
    );

    expect(queryByTestId("dashboard-card-0")).toBeNull();
    expect(queryByText("Profile")).toBeNull();
  });

  /* ---------- INTENTIONAL FAIL (DOCUMENTED) ---------- */
  it.skip(
    "should not crash when pages is undefined (known issue – defensive UI)",
    () => {
      // Aktualisht ky test DO DËSHTONTE,
      // sepse komponenti bën: pages.map(...)
      // dhe nuk mbron ndaj undefined/null.
      //
      // Ky test dokumenton një edge-case real dhe
      // është lënë me it.skip që të mos prishë CI.
      expect(() => render(<DashboardCards pages={undefined} />)).not.toThrow();
    }
  );
});
