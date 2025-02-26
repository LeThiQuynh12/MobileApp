import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import color from "../utils/color";

function BackButton({ buttonColor = color.white }) {
  // if(buttonColor == null)
  //   buttonColor = color.white;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ marginLeft: 20, marginRight: 12 }}
    >
      {/* <AntDesign name="back" size={21} color={color.white} /> */}
      <AntDesign name="arrowleft" size={21} color={buttonColor} />
    </TouchableOpacity>
  );
}

export default BackButton;
