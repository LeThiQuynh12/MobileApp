import React, { useState } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import UploadFile from '../../module/document/UploadFile';

const GiaoNhiemVu = ({ route }) => {
  const { idDeTai } = route.params;

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [students, setStudents] = useState([
    { label: "Nguyễn Văn A", value: "sv1" },
    { label: "Trần Thị B", value: "sv2" },
    { label: "Lê Văn C", value: "sv3" },
    { label: "Hoàng Minh D", value: "sv4" },
  ]);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFileName(file.name);
  };

  const onDayPress = (day) => {
    setDeadline(new Date(day.dateString));
    setShowCalendar(false);
  };

  return (
    <ScrollView>
          <View style={styles.container}>
      <View style={styles.formContainer}>
        {/* Tên nhiệm vụ */}
        <View style={styles.block}>
          <View style={styles.labelRow}>
            <Icon name="assignment" size={24} color="#333333" style={styles.icon} />
            <Text style={styles.label}>Tên nhiệm vụ</Text>
          </View>
          <TextInput
            style={styles.input}
            value={taskName}
            onChangeText={setTaskName}
            placeholder="Nhập tên nhiệm vụ"
          />
        </View>

        {/* Deadline */}
        <View style={styles.block}>
          <View style={styles.labelRow}>
            <Icon name="event" size={24} color="#333333" style={styles.icon} />
            <Text style={styles.label}>Deadline</Text>
          </View>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowCalendar(!showCalendar)}
          >
            <Text>{deadline.toISOString().split("T")[0]}</Text>
          </TouchableOpacity>
          {showCalendar && (
            <Calendar
              onDayPress={onDayPress}
              markedDates={{
                [deadline.toISOString().split("T")[0]]: {
                  selected: true,
                  marked: true,
                  selectedColor: '#007BFF',
                },
              }}
              minDate={new Date().toISOString().split("T")[0]}
              style={styles.calendar}
              theme={{
                selectedDayBackgroundColor: '#007BFF',
                todayTextColor: '#007BFF',
              }}
            />
          )}
        </View>

        {/* Sinh viên */}
        <View style={styles.block}>
          <View style={styles.labelRow}>
            <Icon name="group" size={24} color="#333333" style={styles.icon} />
            <Text style={styles.label}>Sinh viên</Text>
          </View>
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={openStudent}
              value={selectedStudents}
              items={students}
              setOpen={setOpenStudent}
              setValue={setSelectedStudents}
              setItems={setStudents}
              multiple={true}
              mode="BADGE"
              badgeColors="#64B5F6"
              badgeDotColors="#fff"
              placeholder="Chọn sinh viên"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              badgeStyle={{ marginVertical: 5 }}
              badgeTextStyle={{ color: "#fff" }}
            />
          </View>
        </View>

        {/* Mô tả */}
        <View style={styles.block}>
          <View style={styles.labelRow}>
            <Icon name="description" size={24} color="#333333" style={styles.icon} />
            <Text style={styles.label}>Mô tả</Text>
          </View>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={description}
            onChangeText={setDescription}
            placeholder="Mô tả chi tiết..."
            multiline
          />
        </View>

        {/* Tài liệu */}
        <View style={styles.block}>
          <View style={styles.labelRow}>
            <Icon name="cloud-upload" size={24} color="#333333" style={styles.icon} />
            <Text style={styles.label}>Tài liệu</Text>
          </View>
          <UploadFile  />
        </View>

        {selectedFileName && (
          <Text style={{ marginLeft: 30, color: "#555" }}>
            📎 Đã chọn: {selectedFileName}
          </Text>
        )}
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Giao nhiệm vụ</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default GiaoNhiemVu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    padding: 15,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  block: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 10, // Added gap for spacing between icon and text
  },
  icon: {
    width: 30, // Increased width for more spacing
    textAlign: "center",
    color: "#333333"
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  input: {
    borderWidth: 2,
    borderColor: "#CCCCCC",
    borderRadius: 20,
    padding: 12,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
  dropdownWrapper: {
    zIndex: 10,
    
  },
  dropdown: {
    borderWidth: 2,
    borderColor: "#CCCCCC",
    borderRadius: 20,
    paddingVertical:20,
    backgroundColor: "#FFFFFF",
  },
  dropdownContainer: {
    borderWidth: 1,
    
    borderColor: "#CCCCCC",
  },
  calendar: {
    marginTop: 10,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#FFFFFF",
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: "#64B5F6",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    width: 200,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});