import React, { useState } from 'react';

import {
  Button,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const cities = ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Nha Trang", "Huế"];

const AirlineTicket = () => {
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [date, setDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);

  return (
    <View style={{ padding: 20 }}>
      {/* Chọn nơi khởi hành */}
      <Text>Chọn nơi khởi hành</Text>
      <Picker selectedValue={departure} onValueChange={(value) => setDeparture(value)}>
        <Picker.Item label="Chọn nơi khởi hành" value={null} />
        {cities.map((city, index) => (
          <Picker.Item key={index} label={city} value={city} />
        ))}
      </Picker>

      {/* Chọn nơi đến */}
      <Text>Chọn nơi đến</Text>
      <Picker selectedValue={destination} onValueChange={(value) => setDestination(value)}>
        <Picker.Item label="Chọn nơi đến" value={null} />
        {cities.map((city, index) => (
          <Picker.Item key={index} label={city} value={city} />
        ))}
      </Picker>

      {/* Chọn ngày đi */}
      <Text>Chọn ngày đi</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      {/* Chọn ngày về */}
      <Text>Chọn ngày về</Text>
      <TouchableOpacity onPress={() => setShowReturnDatePicker(true)}>
        <Text>{returnDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showReturnDatePicker && (
        <DateTimePicker
          value={returnDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowReturnDatePicker(false);
            if (selectedDate) setReturnDate(selectedDate);
          }}
        />
      )}

      {/* Nút tìm kiếm */}
      <Button title="Tìm kiếm" onPress={() => alert(`Tìm vé từ ${departure} đến ${destination}`)} />
    </View>
  );
};

export default AirlineTicket;
