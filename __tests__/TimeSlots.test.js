import { fireEvent, render } from "@testing-library/react-native";
import TimeSlots from "../components/TimeSlots";

describe("TimeSlots", () => {
  const slots = ["09:00", "10:00", "11:00"];

  it("renders all time slots", () => {
    const { getByText } = render(
      <TimeSlots slots={slots} selected={null} onSelect={() => {}} />
    );

    expect(getByText("09:00")).toBeTruthy();
    expect(getByText("10:00")).toBeTruthy();
    expect(getByText("11:00")).toBeTruthy();
  });

  it("calls onSelect with correct time when a slot is pressed", () => {
    const onSelectMock = jest.fn();

    const { getByText } = render(
      <TimeSlots slots={slots} selected={null} onSelect={onSelectMock} />
    );

    fireEvent.press(getByText("10:00"));
    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith("10:00");
  });

  it("does not crash if onSelect is not provided", () => {
    const { getByText } = render(
      <TimeSlots slots={slots} selected={null} />
    );

    fireEvent.press(getByText("09:00"));
    expect(true).toBe(true);
  });
});
