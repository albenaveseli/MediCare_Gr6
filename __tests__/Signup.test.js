import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import Signup from "../app/(auth)/signup";


import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// -------------------- MOCKS --------------------

// Mock router
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

// Mock firebase/auth
jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));

// Mock firestore
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  serverTimestamp: jest.fn(() => "SERVER_TIMESTAMP"),
}));

// Mock firebase config
jest.mock("../firebase", () => ({
  auth: {},
  db: {},
}));

// Mock AuthForm: e shfaq title + button + link si elemente të testueshme
jest.mock("../components/AuthForm", () => {
  const React = require("react");
  const { View, Text, TouchableOpacity } = require("react-native");
  return function AuthFormMock(props) {
    const {
      title,
      buttonText,
      onSubmit,
      linkText,
      onLinkPress,
      children,
    } = props;

    return (
      <View>
        <Text>{title}</Text>

        <View>{children}</View>

        <TouchableOpacity onPress={onSubmit}>
          <Text>{buttonText}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onLinkPress}>
          <Text>{linkText}</Text>
        </TouchableOpacity>
      </View>
    );
  };
});

jest.mock("../components/AuthInput", () => {
  const React = require("react");
  const { TextInput } = require("react-native");
  return function AuthInputMock(props) {
    return <TextInput {...props} />;
  };
});

describe("Signup Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    Alert.alert.mockRestore();
  });

  it("renders all form elements correctly", () => {
    const { getByText, getByPlaceholderText } = render(<Signup />);

    expect(getByText("Create Account")).toBeTruthy();
    expect(getByPlaceholderText("Full Name")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
    expect(getByPlaceholderText("Confirm Password")).toBeTruthy();

    expect(getByText("Register")).toBeTruthy();
    expect(getByText("Already have an account? Login")).toBeTruthy();
  });

  it("updates inputs when user types", () => {
    const { getByPlaceholderText } = render(<Signup />);

    fireEvent.changeText(getByPlaceholderText("Full Name"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Email"), "john@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "Aa1@aaaa");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "Aa1@aaaa");

    expect(getByPlaceholderText("Full Name").props.value).toBe("John Doe");
    expect(getByPlaceholderText("Email").props.value).toBe("john@example.com");
    expect(getByPlaceholderText("Password").props.value).toBe("Aa1@aaaa");
    expect(getByPlaceholderText("Confirm Password").props.value).toBe("Aa1@aaaa");
  });

  it("shows error when all fields are empty", async () => {
    const { getByText } = render(<Signup />);
    fireEvent.press(getByText("Register"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Error", "Please fill in all fields!");
    });
  });

  it("shows error when email is invalid", async () => {
    const { getByText, getByPlaceholderText } = render(<Signup />);

    fireEvent.changeText(getByPlaceholderText("Full Name"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Email"), "johnATmail");
    fireEvent.changeText(getByPlaceholderText("Password"), "Aa1@aaaa");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "Aa1@aaaa");
    fireEvent.press(getByText("Register"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Invalid Email",
        "Please enter a valid email address."
      );
    });
  });

  it("shows error when password is weak (does not match regex)", async () => {
    const { getByText, getByPlaceholderText } = render(<Signup />);

    fireEvent.changeText(getByPlaceholderText("Full Name"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Email"), "john@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "12345678"); // weak
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "12345678");
    fireEvent.press(getByText("Register"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Weak Password",
        expect.stringContaining("Password must be at least 8 characters long")
      );
    });
  });

  it("shows error when passwords do not match", async () => {
    const { getByText, getByPlaceholderText } = render(<Signup />);

    fireEvent.changeText(getByPlaceholderText("Full Name"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Email"), "john@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "Aa1@aaaa");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "Aa1@aaab");
    fireEvent.press(getByText("Register"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Error", "Passwords do not match!");
    });
  });

  it('blocks doctor.com emails', async () => {
    const { getByText, getByPlaceholderText } = render(<Signup />);

    fireEvent.changeText(getByPlaceholderText("Full Name"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Email"), "john@doctor.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "Aa1@aaaa");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "Aa1@aaaa");
    fireEvent.press(getByText("Register"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Registration Closed",
        "Doctor registration is currently closed."
      );
    });

    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it("successfully creates user, saves to firestore, and navigates", async () => {
    createUserWithEmailAndPassword.mockResolvedValue({ user: { uid: "123" } });
    doc.mockReturnValue("DOC_REF");
    setDoc.mockResolvedValue(undefined);

    const { getByText, getByPlaceholderText } = render(<Signup />);

    fireEvent.changeText(getByPlaceholderText("Full Name"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Email"), "john@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "Aa1@aaaa");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "Aa1@aaaa");
    fireEvent.press(getByText("Register"));

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(setDoc).toHaveBeenCalledTimes(1);
      expect(router.replace).toHaveBeenCalledWith("/(auth)/onboarding");
    });

    // kontrollo që doc është thirrur me koleksionin "users" dhe uid
    expect(doc).toHaveBeenCalledWith(expect.anything(), "users", "123");

    // kontrollo strukturën e të dhënave
    expect(setDoc).toHaveBeenCalledWith("DOC_REF", {
      fullName: "John Doe",
      email: "john@example.com",
      role: "patient",
      createdAt: "SERVER_TIMESTAMP",
    });
  });

  it("shows email already exists error (firebase)", async () => {
    createUserWithEmailAndPassword.mockRejectedValue({
      code: "auth/email-already-in-use",
    });

    const { getByText, getByPlaceholderText } = render(<Signup />);

    fireEvent.changeText(getByPlaceholderText("Full Name"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Email"), "john@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "Aa1@aaaa");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "Aa1@aaaa");
    fireEvent.press(getByText("Register"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Email Already Exists",
        expect.stringContaining("already registered")
      );
    });
  });

  it("shows generic firebase error message", async () => {
    createUserWithEmailAndPassword.mockRejectedValue({
      message: "Network error occurred",
    });

    const { getByText, getByPlaceholderText } = render(<Signup />);

    fireEvent.changeText(getByPlaceholderText("Full Name"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Email"), "john@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "Aa1@aaaa");
    fireEvent.changeText(getByPlaceholderText("Confirm Password"), "Aa1@aaaa");
    fireEvent.press(getByText("Register"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Error", "Network error occurred");
    });
  });

  it('navigates to login when link is pressed', () => {
    const { getByText } = render(<Signup />);

    fireEvent.press(getByText("Already have an account? Login"));
    expect(router.push).toHaveBeenCalledWith("/(auth)/login");
  });
});
