import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import ERecipeScreen from "../app/(doctor)/erecipe";

import { useLocalSearchParams } from "expo-router";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { useAuth } from "../context/AuthContext";

// -------------------- MOCKS --------------------

// expo-router
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
  useLocalSearchParams: jest.fn(),
}));

// AuthContext
jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// firestore
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  setDoc: jest.fn(),
  serverTimestamp: jest.fn(() => "SERVER_TIMESTAMP"),
}));

// firebase config
jest.mock("../firebase", () => ({
  db: {},
}));

// Header mock
jest.mock("../components/Header", () => {
  const React = require("react");
  const { View, Text, TouchableOpacity } = require("react-native");
  return function HeaderMock({ title, onBack }) {
    return (
      <View>
        <Text>{title}</Text>
        <TouchableOpacity testID="header-back" onPress={onBack}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    );
  };
});

// -------------------- TESTS --------------------

describe("ERecipeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(Alert, "alert").mockImplementation(() => {});

    // auth
    useAuth.mockReturnValue({
      user: { email: "doc@test.com" },
      loading: false,
    });

    // route params
    useLocalSearchParams.mockReturnValue({
      appointmentId: "A1",
      patientName: "John Patient",
      patientId: "P1",
    });

    // firestore boilerplate
    collection.mockReturnValue("COL_REF");
    query.mockReturnValue("QUERY_REF");
    where.mockReturnValue("WHERE_REF");
    doc.mockReturnValue("DOC_REF");

    // fetchDoctor default → FOUND
    getDocs.mockResolvedValue({
      empty: false,
      docs: [
        {
          id: "D1",
          data: () => ({
            name: "Dr Test",
            specialty: "Cardiology",
          }),
        },
      ],
    });

    setDoc.mockResolvedValue(undefined);
  });

  afterEach(() => {
    Alert.alert.mockRestore();
  });

  it("shows error modal when required fields are missing", async () => {
    const { getByText, getByPlaceholderText } = render(<ERecipeScreen />);

    fireEvent.changeText(getByPlaceholderText("Patient Name"), "");
    fireEvent.press(getByText("Generate Prescription"));

    await waitFor(() => {
      expect(
        getByText("Please fill out all required fields before generating.")
      ).toBeTruthy();
    });

    expect(getByText("• Patient Name")).toBeTruthy();
    expect(getByText("• Diagnosis")).toBeTruthy();
    expect(getByText("• Medications")).toBeTruthy();
    expect(getByText("• Treatment Steps")).toBeTruthy();
  });

  it("generates prescription successfully", async () => {
    const { getByText, getByPlaceholderText } = render(<ERecipeScreen />);

    fireEvent.changeText(getByPlaceholderText("Diagnosis"), "Flu");
    fireEvent.changeText(
      getByPlaceholderText("Medications (separate with commas)"),
      "Paracetamol"
    );
    fireEvent.changeText(getByPlaceholderText("Treatment Steps"), "Rest");

    fireEvent.press(getByText("Generate Prescription"));

    await waitFor(() =>
      expect(getByText("Prescription generated successfully!")).toBeTruthy()
    );

    fireEvent.press(getByText("OK"));

    expect(getByText("View Prescription")).toBeTruthy();
    expect(getByText("Clear")).toBeTruthy();
  });

  it("sends prescription to firestore successfully", async () => {
    const { getByText, getByPlaceholderText } = render(<ERecipeScreen />);

    fireEvent.changeText(getByPlaceholderText("Diagnosis"), "Flu");
    fireEvent.changeText(
      getByPlaceholderText("Medications (separate with commas)"),
      "Paracetamol, Vitamin C"
    );
    fireEvent.changeText(getByPlaceholderText("Treatment Steps"), "Rest");
    fireEvent.changeText(
      getByPlaceholderText("Additional Notes (optional)"),
      "Drink water"
    );

    fireEvent.press(getByText("Generate Prescription"));
    await waitFor(() =>
      expect(getByText("Prescription generated successfully!")).toBeTruthy()
    );

    fireEvent.press(getByText("OK"));
    fireEvent.press(getByText("View Prescription"));
    fireEvent.press(getByText("Send to Patient"));

    await waitFor(() => {
      expect(setDoc).toHaveBeenCalledTimes(1);
    });

    const payload = setDoc.mock.calls[0][1];

    expect(payload.patientId).toBe("P1");
    expect(payload.doctorName).toBe("Dr Test");
    expect(payload.profession).toBe("Cardiology");
    expect(payload.diagnosis).toBe("Flu");
    expect(payload.steps).toBe("Rest");
    expect(payload.notes).toBe("Drink water");
    expect(payload.medications).toEqual(["Paracetamol", "Vitamin C"]);
    expect(payload.createdAt).toBe("SERVER_TIMESTAMP");

    await waitFor(() => {
      expect(
        getByText("Prescription successfully sent to John Patient!")
      ).toBeTruthy();
    });
  });

  it("shows alert when doctor profile is not found", async () => {
    // fetchDoctor → empty
    getDocs.mockResolvedValueOnce({ empty: true, docs: [] });

    const { getByText, getByPlaceholderText } = render(<ERecipeScreen />);

    fireEvent.changeText(getByPlaceholderText("Diagnosis"), "Flu");
    fireEvent.changeText(
      getByPlaceholderText("Medications (separate with commas)"),
      "Paracetamol"
    );
    fireEvent.changeText(getByPlaceholderText("Treatment Steps"), "Rest");

    fireEvent.press(getByText("Generate Prescription"));
    await waitFor(() =>
      expect(getByText("Prescription generated successfully!")).toBeTruthy()
    );

    fireEvent.press(getByText("OK"));
    fireEvent.press(getByText("View Prescription"));

    // handleSend → empty
    getDocs.mockResolvedValueOnce({ empty: true, docs: [] });

    fireEvent.press(getByText("Send to Patient"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Doctor profile not found."
      );
    });

    expect(setDoc).not.toHaveBeenCalled();
  });
});
