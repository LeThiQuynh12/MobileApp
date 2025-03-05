import React, {
  useEffect,
  useState,
} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const SuaDeTai = ({ route }) => {
  const navigation = useNavigation();
  const topic = route?.params?.topic || null;

  // State
  const [topicLeader, setTopicLeader] = useState("");
  const [instructor, setInstructor] = useState("");
  const [faculty, setFaculty] = useState("");
  const [field, setField] = useState("");
  const [participants, setParticipants] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Load data
  useEffect(() => {
    if (topic) {
      setTopicLeader(topic.topicLeader || "");
      setInstructor(topic.instructor || "");
      setFaculty(topic.faculty || "");
      setField(topic.field || "");
      setParticipants(topic.participants ? topic.participants.toString() : "");
      setDate(topic.date ? new Date(topic.date) : new Date());
    }
  }, [topic]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" onPress={() => navigation.navigate("QuanLyDeTai")} />
        <Text style={styles.headerTitle}>Sửa đề tài</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Chủ nhiệm đề tài:</Text>
          <TextInput style={styles.input} value={topicLeader} onChangeText={setTopicLeader} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Người hướng dẫn:</Text>
          <TextInput style={styles.input} value={instructor} onChangeText={setInstructor} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Khoa:</Text>
          <TextInput style={styles.input} value={faculty} onChangeText={setFaculty} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Lĩnh vực:</Text>
          <TextInput style={styles.input} value={field} onChangeText={setField} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Số lượng tham gia:</Text>
          <TextInput style={styles.input} value={participants} onChangeText={setParticipants} keyboardType="numeric" />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Thời gian thực hiện:</Text>
          <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.datePickerButton}>
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>

        {showPicker && (
          <DateTimePicker value={date} mode="date" display="default" onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }} />
        )}
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Lưu thay đổi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuaDeTai;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F2" },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#64B5F6', padding: 25, paddingTop: 60 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white', marginLeft: 15 },
  formContainer: { backgroundColor: "#fff", padding: 15, borderRadius: 8, marginTop: 10, gap: 24 },
  row: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  label: { fontSize: 14, fontWeight: "bold", color: "#333", width: 140 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, backgroundColor: "#fff" },
  datePickerButton: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, backgroundColor: "#fff" },
  dateText: { color: "#333" },
  submitButton: { marginTop: 35, backgroundColor: "#64B5F6", padding: 12, borderRadius: 8, alignItems: "center", alignSelf: "center", width: 200 },
  submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});