import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const InputSearch = () => {
  return (
    <View style={styles.searchContainer}>
      <Icon name="search" size={19} color="#888" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Lọc theo người hướng dẫn, chủ nhiệm đề tài,..."
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#333",
    fontSize: 15,
  },
});

export default InputSearch;
