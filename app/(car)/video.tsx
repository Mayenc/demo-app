import { useVideoPlayer, VideoView } from 'expo-video';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';

const videoData = [
  {
    id: '1',
    title: 'Video 1',
    description: 'Mô tả cho video 1',
    uri: 'https://vw-image.s3.ap-southeast-1.amazonaws.com/image/options.mp4',
  },
  {
    id: '2',
    title: 'Video 2',
    description: 'Mô tả cho video 2',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: '3',
    title: 'Video 3',
    description: 'Mô tả cho video 3',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  },
  {
    id: '4',
    title: 'Video 3',
    description: 'Mô tả cho video 3',
    uri: 'https://www.youtube.com/embed/cvaIgq5j2Q8?si=pg3fEY9sGpI0CrHe',
  },
];

export default function VideoListScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={videoData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard video={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

function VideoCard({ video }: { video: typeof videoData[0] }) {
  const player = useVideoPlayer({ uri: video.uri }, (p) => {
    p.loop = false;
  });

  return (
    <View style={styles.card}>
      <VideoView
        player={player}
        style={styles.video}
        contentFit="contain"
        allowsFullscreen
        nativeControls={true}
      />
      <Text style={styles.title}>{video.title}</Text>
      <Text style={styles.description}>{video.description}</Text>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // màu nền trắng
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  video: {
    width: '100%',
    height: screenWidth * 0.56, // tỉ lệ 16:9
    borderRadius: 8,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
