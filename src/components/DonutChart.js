import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

const DonutChart = () => {
  const widthAndHeight = 90;
  const radius = widthAndHeight / 2;
  const strokeWidth = 13; // Độ dày mặc định

  const [data, setData] = useState([
    { percentage: 40, color: "#A686F7", title: "Cần làm" },
    { percentage: 30, color: "#F96B7D", title: "Đang tiến hành" },
    { percentage: 30, color: "#FBB55D", title: "Đã hoàn thành" },
  ]);

  //   useEffect(() => {
  //     const totalPercentage = data.reduce(
  //       (sum, item) => sum + item.percentage,
  //       0
  //     );
  //     if (totalPercentage !== 100) {
  //       setData([
  //         ...data,
  //         { percentage: 100 - totalPercentage, color: "#e5e5e5" },
  //       ]);
  //     }
  //   }, []);

  const createArc = (startAngle, endAngle, color) => {
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    const startX = radius + radius * Math.cos((Math.PI * startAngle) / 180);
    const startY = radius + radius * Math.sin((Math.PI * startAngle) / 180);
    const endX = radius + radius * Math.cos((Math.PI * endAngle) / 180);
    const endY = radius + radius * Math.sin((Math.PI * endAngle) / 180);

    // StrokeWidth nhỏ hơn cho màu xám
    const currentStrokeWidth =
      color === "#e5e5e5" ? strokeWidth / 2 : strokeWidth;

    return (
      <>
        {/* <Path
          key={`${startAngle}-${endAngle}-${color} + 1000`}
          d={`M${startX},${startY} A${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY}`}
          stroke={color}
          //   strokeLinecap="round"
          strokeWidth={currentStrokeWidth}
          fill="none"
        /> */}
        <Path
          key={`${startAngle}-${endAngle}-${color}`}
          d={`M${startX},${startY} A${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY}`}
          stroke={color}
          strokeLinecap="round"
          strokeWidth={currentStrokeWidth}
          fill="none"
        />
      </>
    );
  };

  let currentAngle = -90;
  let seperateSpace = 25;
  const paths = data.map(({ percentage, color }) => {
    const angle = (percentage / 100) * (360 - data.length * seperateSpace);
    const arc = createArc(currentAngle, currentAngle + angle, color);
    currentAngle += angle + seperateSpace;
    return arc;
  });

  return (
    <View
      style={{
        paddingVertical: 20,
        // backgroundColor: "red",
        // alignItems: "center",
        marginHorizontal: 20,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: 600 }}>Nhiệm vụ</Text>
        <Text style={{ fontSize: 13, color: "grey" }}>Xem tất cả {">"}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            alignItems: "center",
            //   backgroundColor: "red",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Svg
            width={widthAndHeight + strokeWidth * 2}
            height={widthAndHeight + strokeWidth * 2}
            viewBox={`-${strokeWidth} -${strokeWidth} ${
              widthAndHeight + strokeWidth * 2
            } ${widthAndHeight + strokeWidth * 2}`}
          >
            {paths}
          </Svg>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              position: "absolute",
              fontSize: 18,
              // top: "50%",
            }}
          >
            50%
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "col",
            flexWrap: "wrap",
            marginLeft: 20,
            gap: 8,
          }}
        >
          {data &&
            data.map((item) => (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: item.color,
                    borderRadius: 2,
                  }}
                ></View>
                <View>
                  <Text
                    style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}
                  >
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 13, color: "#777" }}>
                    15 nhiệm vụ
                  </Text>
                </View>
              </View>
            ))}
        </View>
      </View>
    </View>
  );
};

export default DonutChart;
