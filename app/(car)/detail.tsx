import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.72;
const ITEM_SPACING = 1;
const FULL_ITEM_WIDTH = ITEM_WIDTH + ITEM_SPACING * 2;
// const originalImages = [
//   require('../../assets/images/imageBackground.png'),
//   require('../../assets/images/imageBackground.png'),
//   require('../../assets/images/imageBackground.png'),
//   require('../../assets/images/imageBackground.png'),
// ];
const originalCards = [
  {
    id: 1,
    image: require('../../assets/images/lambretta_1.png'),
    name: 'Xe số 1',
    numberPlate: '77H12345',
    odo: '20000 km',
  },
  {
    id: 2,
    image: require('../../assets/images/lambretta_1.png'),
    name: 'Xe số 2',
    numberPlate: '76H11111',
    odo: '20000 km',
  },
  {
    id: 3,
    image: require('../../assets/images/lambretta_1.png'),
    name: 'Xe số 3',
    numberPlate: '78H22222',
    odo: '20000 km',
  },
  {
    id: 4,
    image: require('../../assets/images/lambretta_1.png'),
    name: 'Xe số 4',
    numberPlate: '50H33333',
    odo: '20000 km',
  },
];

const sections = [
  { type: 'carousel', data: originalCards },
  { type: 'list', data: originalCards },
];
// const loopedImages = Array(10)
//   .fill(originalImages)
//   .flat();
const loopedCards = Array(10).fill(originalCards).flat();
const INITIAL_INDEX = originalCards.length * 5;
// Drawer Navigator (bọc tab)
export default function App() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(INITIAL_INDEX);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: INITIAL_INDEX * FULL_ITEM_WIDTH,
        animated: false,
      });
    }, 10);
  }, []);

  const handleMomentumScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / FULL_ITEM_WIDTH);

    if (
      currentIndex <= originalCards.length ||
      currentIndex >= loopedCards.length - originalCards.length
    ) {
      flatListRef.current?.scrollToOffset({
        offset: INITIAL_INDEX * FULL_ITEM_WIDTH,
        animated: false,
      });
    }
  };
  return (
    <View style={styles.viewTop}>
      <Button title='Quay về' onPress={() => router.back()}/>
        <Text style={styles.TextCar}>Xe của bạn</Text>
        <Animated.FlatList
            ref={flatListRef}
            data={[...loopedCards.entries()]}
            keyExtractor={(_, i) => i.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            bounces={false}
            snapToInterval={FULL_ITEM_WIDTH}
            contentContainerStyle={{
                paddingHorizontal: (width - ITEM_WIDTH) / 2,
            }}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
            )}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
                const [realIndex, card] = item;

                const inputRange = [
                (index - 1) * FULL_ITEM_WIDTH,
                index * FULL_ITEM_WIDTH,
                (index + 1) * FULL_ITEM_WIDTH,
                ];
    
                const scaleX = scrollX.interpolate({
                inputRange,
                outputRange: [0.85, 1.1, 0.85], 
                extrapolate: 'clamp',
                });
    
                const scaleY = scrollX.interpolate({
                inputRange,
                outputRange: [0.85, 1, 0.85], 
                extrapolate: 'clamp',
                });
    
                const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.5, 1, 0.5],
                extrapolate: 'clamp',
                });
    
                const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [5, 0, 5],
                extrapolate: 'clamp',
                });
    
                return (
                <Animated.View
                    style={[
                    styles.item,
                    {
                        transform: [
                        { scaleX },        
                        { scaleY },        
                        { translateY },
                        ],
                        opacity
                    },
                    ]}
                >
                <TouchableOpacity onPress={() => router.push('/(test)/scroll')}>
                  <View style={styles.cardContent}>
                    <View style={styles.imageContainer}>
                      <Image source={card.image} style={styles.image} />
                    </View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.name}>{card.name}</Text>
                      <Text style={styles.price}>{card.numberPlate}</Text>
                      <Text style={styles.desc}>{card.odo}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                </Animated.View>
                );
            }}
            />
    </View>
  );
}

const styles = StyleSheet.create({
  viewTop: {
    marginTop: 50
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    overflow: 'visible',
  },
  item: {
    width: ITEM_WIDTH,
    marginHorizontal: ITEM_SPACING,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 10
  },
  item_center: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    padding: 16,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  cardContent_center: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#FF5722',
    marginVertical: 4,
  },
  desc: {
    fontSize: 14,
    color: '#666',
  },
  imageContainer:{
    width: 120,
    height: 120,
    marginRight: 15,
  },
  infoContainer:{
    flex: 1,
    justifyContent: 'center',
  },
  TextCar: {
    fontSize: 18,
    marginLeft: 18,
    fontWeight: 'bold',
    marginBottom: 12
  }
});
