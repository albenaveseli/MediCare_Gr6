import { fireEvent, render } from "@testing-library/react-native";
import AuthInput from "../components/AuthInput";

describe("AuthInput", () => {
  it("renders input with placeholder", () => {
    const { getByPlaceholderText } = render(
      <AuthInput
        placeholder="Email"
        value=""
        onChangeText={() => {}}
      />
    );

    expect(getByPlaceholderText("Email")).toBeTruthy();
  });

  it("calls onChangeText when user types", () => {
    const onChangeTextMock = jest.fn();

    const { getByPlaceholderText } = render(
      <AuthInput
        placeholder="Email"
        value=""
        onChangeText={onChangeTextMock}
      />
    );

    fireEvent.changeText(
      getByPlaceholderText("Email"),
      "test@email.com"
    );

    expect(onChangeTextMock).toHaveBeenCalledTimes(1);
    expect(onChangeTextMock).toHaveBeenCalledWith("test@email.com");
  });

  it("enables secureTextEntry when prop is true", () => {
    const { getByPlaceholderText } = render(
      <AuthInput
        placeholder="Password"
        value=""
        onChangeText={() => {}}
        secureTextEntry
      />
    );

    const input = getByPlaceholderText("Password");
    expect(input.props.secureTextEntry).toBe(true);
  });
});
