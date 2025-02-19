import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import color from "../utils/color";

export default function CustomSwitch({ onToggle }) {
  const [theme, setTheme] = useState("Light"); // Mặc định là Light

  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    if (onToggle) onToggle(selectedTheme);
  };

  return (
    <View style={styles.container}>
      {/* Light Mode */}
      <TouchableOpacity
        style={[styles.button, theme === "Light" && styles.activeButton]}
        onPress={() => toggleTheme("Light")}
      >
        <FontAwesome6 name="lightbulb" size={16} color={theme === "Light" ? "#000" : "#888"} />
        <Text style={[styles.text, theme === "Light" && styles.activeText]}>Light</Text>
      </TouchableOpacity>

      {/* Dark Mode */}
      <TouchableOpacity
        style={[styles.button, theme === "Dark" && styles.activeButton]}
        onPress={() => toggleTheme("Dark")}
      >
        <FontAwesome6 name="moon" size={16} color={theme === "Dark" ? "#000" : "#888"} />
        <Text style={[styles.text, theme === "Dark" && styles.activeText]}>Dark</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    borderRadius: 20,
    padding: 2,
    width: '70%',
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 18,
  },
  activeButton: {
    backgroundColor: "#fff",
  },
  text: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  activeText: {
    color: "#000",
  },
});
