import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Keyboard,
    Platform,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../../utils/api";

const ThemThongBao = () => {
    const navigation = useNavigation();

    const [tieuDe, setTieuDe] = useState("");
    const [moTa, setMoTa] = useState("");

    const [validation, setValidation] = useState({
        tieuDe: { error: "", isOke: false },
        moTa: { error: "", isOke: false },
    });

    const checkTieuDe = () => {
        setValidation((prev) => {
            const newValid = { ...prev };
            if (tieuDe.trim() === "")
                newValid.tieuDe = { error: "Bạn chưa nhập tiêu đề", isOke: false };
            else newValid.tieuDe = { error: "", isOke: true };
            return newValid;
        });
    };

    const checkMoTa = () => {
        setValidation((prev) => {
            const newValid = { ...prev };
            if (moTa.trim() === "")
                newValid.moTa = { error: "Bạn chưa nhập mô tả", isOke: false };
            else newValid.moTa = { error: "", isOke: true };
            return newValid;
        });
    };

    const handleCreate = () => {
        checkTieuDe();
        checkMoTa();
    };

    useEffect(() => {
        if (validation.tieuDe.isOke && validation.moTa.isOke) {
            createNotification();
        }
    }, [validation]);

    const createNotification = async () => {
        if (!validation.tieuDe.isOke || !validation.moTa.isOke) {
            alert("Vui lòng kiểm tra lại thông tin trước khi tạo!");
            return;
        }

        try {
            const newNotification = {
                tieuDe,
                moTa,
            };

            const response = await api.post("/notifications/allUsers", newNotification);

            if (response.status === 201 || response.status === 200) {
                alert("Thêm thông báo thành công!");
                navigation.goBack();
            } else {
                alert(`Thêm thông báo thất bại với mã trạng thái: ${response.status}`);
            }
        } catch (error) {
            alert("Đã có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={styles.header}>
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="white"
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.headerTitle}>Thêm Thông Báo</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.formContainer}>
                        {/* Tiêu đề */}
                        <View style={styles.row}>
                            <Text style={styles.label}>Tiêu đề:</Text>
                            <TextInput
                                style={styles.input}
                                value={tieuDe}
                                onChangeText={(text) => setTieuDe(text)}
                            />
                        </View>
                        {validation.tieuDe.error ? (
                            <Text style={styles.error}>{validation.tieuDe.error}</Text>
                        ) : null}

                        {/* Mô tả */}
                        <View style={styles.row}>
                            <Text style={styles.label}>Mô tả:</Text>
                        </View>
                        <TextInput
                            style={styles.textArea}
                            value={moTa}
                            onChangeText={(text) => setMoTa(text)}
                            multiline
                            numberOfLines={5}
                        />
                        {validation.moTa.error ? (
                            <Text style={styles.error}>{validation.moTa.error}</Text>
                        ) : null}

                        {/* Nút thêm thông báo */}
                        <TouchableOpacity style={styles.button} onPress={handleCreate}>
                            <Text style={styles.buttonText}>Thêm Thông Báo</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default ThemThongBao;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#64B5F6",
        padding: 25,
        paddingTop: 60,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginLeft: 15,
    },
    scrollView: {
        padding: 20,
    },
    formContainer: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
        gap: 24,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        width: 100,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#fff",
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#fff",
        minHeight: 100,
        textAlignVertical: "top",
    },
    button: {
        backgroundColor: "#64B5F6",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    error: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    },
});
