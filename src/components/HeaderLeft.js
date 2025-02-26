import { FontAwesome6 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import color from "../utils/color";

function HeaderLeft({ title, navigation }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={{ marginLeft: 20, marginRight: 20 }}
      >
        <FontAwesome6 name="bars-staggered" size={21} color={color.darkBlue} />
      </TouchableOpacity>
      <Text style={{ fontSize: 18, fontWeight: "400", fontWeight: "500" }}>
        {title}
      </Text>
    </View>
  );
}

export default HeaderLeft;
