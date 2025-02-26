import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import color from "../utils/color";

function HeaderPlusIcon({ navigation = null, destination = "DangKyDeTai" }) {
  return (
    <TouchableOpacity
      style={{ marginHorizontal: 10 }}
      onPress={() => navigation.navigate(destination)}
    >
      <AntDesign
        style={{ paddingHorizontal: 10 }}
        name="pluscircleo"
        size={24}
        color={color.darkBlue}
      />
    </TouchableOpacity>
  );
}

export default HeaderPlusIcon;
