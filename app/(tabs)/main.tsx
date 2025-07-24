import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width: screenWidth } = Dimensions.get('window');

const data = [
  {
    image: require('../../assets/images/volkswagen.png'),
    km: '1000 km',
    warranty: '31/12/2025',
    maintLast: '01/07/2025',
    maintNext: '01/10/2025',
  },
  {
    image: require('../../assets/images/volkswagen.png'),
    km: '2000 km',
    warranty: '31/12/2025',
    maintLast: '01/07/2025',
    maintNext: '01/10/2025',
  },
  {
    image: require('../../assets/images/volkswagen.png'),
    km: '3000 km',
    warranty: '31/12/2025',
    maintLast: '01/07/2025',
    maintNext: '01/10/2025',
  },
  {
    image: require('../../assets/images/volkswagen.png'),
    km: '4000 km',
    warranty: '31/12/2025',
    maintLast: '01/07/2025',
    maintNext: '01/10/2025',
  },
];
const horizontalData = [
  { id: '1', title: 'Sản phẩm xe VW mới ra mắt được 2 ngày, nếu bạn có nhu cầu', image: require('../../assets/images/volkswagen.png')},
  { id: '2', title: 'Sản phẩm xe VW mới ra mắt', image: require('../../assets/images/volkswagen.png') },
  { id: '3', title: 'Sản phẩm xe VW mới ra mắt', image: require('../../assets/images/volkswagen.png') },
  { id: '3', title: 'Sản phẩm xe VW mới ra mắt', image: require('../../assets/images/volkswagen.png') },
  { id: '3', title: 'Sản phẩm xe VW mới ra mắt', image: require('../../assets/images/volkswagen.png') },
];

export default function TabMain() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<any>(null);
  const horizontalListRef = useRef<FlatList>(null);
  const renderHorizontalItem = ({ item }: any) => (
    <TouchableOpacity onPress={ () => router.push('/(test)/webview')}>
      <View style={styles.horizontalCard}>
        <View style={styles.cardImgNews}>
            <Image source={item.image} style={styles.imageNews} />
        </View>
        <Text style={styles.cardText} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  const renderHorizontalItemVideo = ({ item }: any) => (
      <View style={styles.horizontalCardVideo}>
        <View style={styles.cardImgNews}>
            <Image source={item.image} style={styles.imageNews} />
        </View>
        <Text style={styles.cardText} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
      </View>
  );
  return (
    <ScrollView>
        <View style={styles.bodyContent}>
            <View>
            <View style={styles.cardTitle}>
                <Text style={styles.titleHeader}>Xe của tôi</Text>
            </View>
            <View style={styles.container}>
                <TouchableOpacity
                style={styles.arrowLeft}
                onPress={() => carouselRef.current?.prev()}
                >
                <Ionicons name="chevron-back" style={styles.arrowText} />
                </TouchableOpacity>
                <Carousel
                ref={carouselRef}
                loop
                width={screenWidth * 0.90}
                height={200}
                data={data}
                mode="parallax"
                scrollAnimationDuration={200}
                modeConfig={{
                    parallaxScrollingScale: 0.9,         
                    parallaxAdjacentItemScale: 0.8,
                    parallaxScrollingOffset: 110
                }}
                onSnapToItem={(index) => setCurrentIndex(index)}
                renderItem={({ item, index }) => (
                    <View style={styles.card}>
                        <View style={styles.row}>
                        <View style={styles.left}>
                            <Image source={item.image} style={styles.image} />
                            <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Đặt dịch vụ</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.right}>
                            <Text style={styles.title}>Tên xe</Text>
                            <Text style={styles.text}>Số km: {item.km}</Text>
                            <Text style={styles.section}>Bảo hành</Text>
                            <Text style={styles.text}>• Ngày hết hạn: {item.warranty}</Text>
                            <Text style={styles.section}>Bảo dưỡng</Text>
                            <Text style={styles.text}>• Gần nhất: {item.maintLast}</Text>
                            <Text style={styles.text}>• Tiếp theo: {item.maintNext}</Text>
                        </View>
                        </View>
                        {index !== currentIndex && (
                        <View style={styles.overlay} />
                        )}
                    </View>
                )}
                />
                <TouchableOpacity
                style={styles.arrowRight}
                onPress={() => carouselRef.current?.next()}
                >
                <Ionicons name="chevron-forward" style={styles.arrowText} />
                </TouchableOpacity>
            </View>
            </View>
            <View style={styles.contentNews}>
            <View style={styles.cardTitleNews}>
                <Text style={styles.titleHeaderNews}>Tin tức nổi bật</Text>
                <Text style={styles.linkTitleNews}>Xem tất cả <Ionicons name="chevron-forward" style={styles.linkIconNews}/></Text>
            </View>
            <View style={styles.listNews}>
                <FlatList
                    ref={horizontalListRef}
                    data={horizontalData} 
                    renderItem={renderHorizontalItem}
                    keyExtractor={(item, index) => item.id + index}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    snapToAlignment="center"
                    />
            </View>
            </View>
            <View style={styles.contentVideo}>
            <View style={styles.cardTitleVideo}>
                <View>
                    <Text style={styles.titleHeaderVideo}>Video và dịch vụ</Text>
                </View>
                <View style={styles.titleViewAllVideo}>
                <TouchableOpacity onPress={ () => router.push('/(car)/video')}>
                    <Text style={styles.linkTitleVideo}>Xem tất cả <Ionicons name="chevron-forward" style={styles.linkIconVideo}/></Text>
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.listVideo}>
                <FlatList
                    ref={horizontalListRef}
                    data={horizontalData} 
                    renderItem={renderHorizontalItemVideo}
                    keyExtractor={(item, index) => item.id + index}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    snapToAlignment="center"
                    />
            </View>
            </View>
            <View style={styles.cardARShowroom}>
            <View>
                <Text style={styles.TextAR}>Trải nghiệm showroom thực tế ảo</Text>
            </View>
            <View style={styles.cardLinkAR}>
                <TouchableOpacity onPress={ () => Linking.openURL('https://showroom.vw.com.vn/homepage')}>
                    <Text style={styles.linkTitleAR}>Trải nghiệm <Ionicons name="chevron-forward" style={styles.linkIconVideo}/></Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bodyContent: {
    backgroundColor: '#fff'
  },
  cardTitle: {
    marginLeft: 20,
    marginTop: 10,
    flex: 1,  
  },
  titleHeader:{
    fontWeight: 'bold',
    fontSize: 15
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'column',
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  button: {
    borderColor: '#f33',        
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#f33',
    fontWeight: '600',
    fontSize: 13,
  },
  right: {
    flex: 1,
    paddingLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  section: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
  },
  text: {
    fontSize: 13,
    color: '#333',
    marginTop: 2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(90, 90, 90, 0.4)', 
    borderRadius: 12, 
    zIndex: 1,
  },
  arrowLeft: {
      position: 'absolute',
      left: 5,
      top: '52%',
      transform: [{ translateY: -20 }],
      zIndex: 99,
      backgroundColor: '#fff',
      borderRadius: 20,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',

      borderWidth: 1,
      borderColor: '#f33',
      elevation: 3, 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
  arrowRight: {
    position: 'absolute',
    right: 5,
    top: '52%',
    transform: [{ translateY: -20 }],
    zIndex: 99,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#f33',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  arrowText: {
    fontSize: 20,
    color: '#f33',
  },
  contentNews: {
    backgroundColor: '#e9e9e9ff',
    height: 200
  },
  cardTitleNews: {
    marginLeft: 20,
    flexDirection: 'row',
    marginTop: 10,
    flex: 1,  
  },
  titleHeaderNews:{
    fontWeight: 'bold',
    fontSize: 15
  },
  linkTitleNews: {
    position: 'absolute',
    right: 15,
    color: '#43a2faff'
  },
  linkIconNews: {
    //marginTop: 10
  },
  horizontalCard: {
    width: screenWidth * 0.4,
    height: 150,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
    paddingRight: 7,
  },
  horizontalCardVideo: {
    width: screenWidth * 0.4,
    height: 150,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
    paddingRight: 7,
  },
  cardText: {
    left: 10,
    color: '#000',
    fontSize: 15,
  },
  listNews:{
    height: 160, 
    left: 10
  },
  imageNews: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  cardImgNews: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentVideo: {
    marginTop: 10,
    backgroundColor: '#e9e9e9ff',
    height: 200
  },
  cardTitleVideo: {
    marginLeft: 20,
    flexDirection: 'row',
    marginTop: 10,
    flex: 1,  
  },
  titleHeaderVideo:{
    fontWeight: 'bold',
    fontSize: 15
  },
  titleViewAllVideo: {
    position: 'absolute',
    right: 15
  },
  linkTitleVideo: {
    // position: 'absolute',
    // right: 15,
    color: '#43a2faff',
  },
  linkIconVideo: {
    //marginTop: 10
  },
  listVideo:{
    height: 160,
    left: 10
  },
  imageVideo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  cardImgVideo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardARShowroom:{
    backgroundColor: '#e9e9e9ff',
    flexDirection: 'row',
    marginTop: 10,
    padding: 10
  },
  TextAR: {
    left: 5,
    fontSize: 15,
    fontWeight: 'bold'
  },
  cardLinkAR: {
    marginTop: 10,
    position: 'absolute',
    right: 10
  },
  linkTitleAR: {
    color: '#43a2faff',
  }
});
