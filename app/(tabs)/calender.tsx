import moment from "moment";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from 'react-native-calendars/src/types';

const events = [
  {
    title: "date 2",
    startDate: "15-03-2025",
    endDate: "19-03-2025",
    color: "#66BB6A",
  },
  {
    title: "date 1",
    startDate: "15-03-2025",
    endDate: "17-03-2025",
    color: "#FFA726",
  },
  {
    title: "Other Event",
    startDate: "18-03-2025",
    endDate: "21-03-2025",
    color: "#42A5F5",
  },
];
 
const formatDate = (date: string) => moment(date, "DD-MM-YYYY").format("YYYY-MM-DD");
 
const getMarkedDates = () => {
  const markedDates: MarkedDates = {};
 
  events.forEach((event) => {
    const start = moment(event.startDate, "DD-MM-YYYY");
    const end = moment(event.endDate, "DD-MM-YYYY");
 
    for (let m = start.clone(); m.diff(end) <= 0; m.add(1, "day")) {
      const formattedDate = m.format("YYYY-MM-DD");
      markedDates[formattedDate] = {
        marked: true,
        dotColor: "#AED6F1", // optional
        selected: true,
        selectedColor: "#AED6F1",
      };
    }
  });
 
  return markedDates;
};
 
export default function TabCalender() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
 
  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };
 
  const eventsForDate = events.filter((event) => {
    const start = moment(event.startDate, "DD-MM-YYYY");
    const end = moment(event.endDate, "DD-MM-YYYY");
    return (
      selectedDate &&
      moment(selectedDate, "YYYY-MM-DD").isBetween(start.clone().subtract(1, "day"), end.clone().add(1, "day"))
    );
  });
 
  return (
    <View style={styles.container}>
      <Calendar
        markingType={"custom"} // or remove this line if not using period/dots
        markedDates={{
          ...getMarkedDates(),
          ...(selectedDate
            ? {
                [selectedDate]: {
                  ...(getMarkedDates()[selectedDate] || {}),
                  selected: true,
                  selectedColor: "#000", // highlight selected date in black
                },
              }
            : {}),
        }}
        onDayPress={handleDayPress}
        style={styles.calendar}
        theme={{
          selectedDayBackgroundColor: "#00adf5",
          todayTextColor: "#00adf5",
          arrowColor: "#011e50",
          monthTextColor: "#011e50",
          textDayFontWeight: "500",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "bold",
        }}
      />
 
      {selectedDate && (
        <View style={styles.selectedDateContainer}>
          <View style={styles.selectedDateHeader}>
            <Text style={styles.eventHeader}>
              Events on {moment(selectedDate).format("DD MMMM YYYY")}:
            </Text>
            <TouchableOpacity
              onPress={() => console.log("Add event for", selectedDate)}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>＋</Text>
            </TouchableOpacity>
          </View>
 
          {eventsForDate.length > 0 ? (
            <FlatList
              data={eventsForDate}
              keyExtractor={(item, index) => `${item.title}-${index}`}
              renderItem={({ item }) => (
                <View style={styles.eventItem}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text style={styles.eventDates}>
                    {item.startDate} → {item.endDate}
                  </Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noEvents}>No events on this date</Text>
          )}
        </View>
      )}
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  calendar: {
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 2,
  },
  eventList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  eventHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  eventItem: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#EAF2F8",
    borderColor: "#AAB7B8",
    borderWidth: 1,
  },
  eventTitle: {
    color: "#011e50",
    fontWeight: "bold",
    fontSize: 16,
  },
  eventDates: {
    color: "#011e50",
    fontSize: 12,
    marginTop: 4,
  },
  noEvents: {
    fontStyle: "italic",
    color: "#777",
  },
 
  selectedDateContainer: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  
  selectedDateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  
  addButton: {
    backgroundColor: "#011e50",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  
  addButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
 
});