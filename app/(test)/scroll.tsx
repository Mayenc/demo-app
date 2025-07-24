import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';


const screenWidth = Dimensions.get('window').width;

const horizontalData = [
  { id: '1', title: 'Carousel 1' },
  { id: '2', title: 'Carousel 2' },
  { id: '3', title: 'Carousel 3' },
];



export default function App() {
  const horizontalListRef = useRef<FlatList>(null);
  const [verticalData, setVerticaldata] = useState([
    { id: 'a', title: 'Item A' },
    { id: 'b', title: 'Item B' },
    { id: 'c', title: 'Item C' },
    { id: 'D', title: 'Item D' },
    { id: 'E', title: 'Item E' },
    { id: 'F', title: 'Item F' },
    { id: 'G', title: 'Item G' },
    { id: 'H', title: 'Item H' },
    { id: 'J', title: 'Item J' }
]);
  const router = useRouter();
  // Optional: Auto scroll carousel logic here
  const handleDelete = (rowKey: string) => {
    const newData = verticalData.filter(item => item.id !== rowKey);
    setVerticaldata(newData);
  };

  const renderHorizontalItem = ({ item }: any) => (
    <View style={styles.horizontalCard}>
      <Text style={styles.cardText}>{item.title}</Text>
    </View>
  );

  const renderVerticalItem = ({ item }: any) => (
    <View style={styles.verticalCard}>
      <Text style={styles.cardText}>{item.title}</Text>
    </View>
  );

  return (
    
    <View style={styles.content}>
      {/* Horizontal carousel */}
      <Text style={styles.title}>Carousel vòng tròn</Text>
      <FlatList
        ref={horizontalListRef}
        data={[...horizontalData, ...horizontalData]} // giả lập vòng tròn
        renderItem={renderHorizontalItem}
        keyExtractor={(item, index) => item.id + index}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
      />

      {/* Vertical list */}
      <Text style={styles.title}>Danh sách dọc</Text>
        <SwipeListView
            data={verticalData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={styles.rowFront}>
                <Text style={styles.rowText}>{item.title}</Text>
                </View>
            )}
            renderHiddenItem={({ item }) => (
                <View style={styles.rowBack}>
                <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDelete(item.id)}
                >
                    <Text style={styles.deleteText}>Xóa</Text>
                </TouchableOpacity>
                </View>
            )}
            rightOpenValue={-75}
            disableRightSwipe
            />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginVertical: 10,
    marginLeft: 10,
  },
  horizontalCard: {
    width: screenWidth * 0.8,
    height: 120,
    backgroundColor: '#88f',
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalCard: {
    height: 100,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#4f9',
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    marginTop: 50
  },
  rowFront: {
    backgroundColor: '#4f9',
    borderRadius: 10,
    height: 100,
    justifyContent: 'center',
    paddingLeft: 15,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#ff3b30',
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'flex-end',
    paddingRight: 15,
    flexDirection: 'row',
  },
  deleteBtn: {
    width: 75,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


