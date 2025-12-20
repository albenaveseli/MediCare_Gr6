import { fireEvent, render } from "@testing-library/react-native";
import { Text } from "react-native";
import PrimaryButton from "../components/PrimaryButton";


describe("PrimaryButton", () => {
  it("renders the button title correctly", () => {
    const { getByText } = render(
      <PrimaryButton title="Submit" onPress={() => {}} />
    );

    expect(getByText("Submit")).toBeTruthy();
  });

  it("calls onPress when button is pressed", () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <PrimaryButton title="Submit" onPress={onPressMock} />
    );

    fireEvent.press(getByText("Submit"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("does NOT call onPress when button is disabled", () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <PrimaryButton title="Submit" onPress={onPressMock} disabled />
    );

    fireEvent.press(getByText("Submit"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("renders icon when IconComponent is provided", () => {
    const TestIcon = () => <Text testID="test-icon">ICON</Text>;

    const { getByTestId } = render(
      <PrimaryButton
        title="Submit"
        onPress={() => {}}
        icon={TestIcon}
      />
    );

    expect(getByTestId("test-icon")).toBeTruthy();
  });
});
