// TabMyVehicle.tsx

import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;

const cars = [
    {
        id: '1',
        name: 'Tesla Model S',
        image: require('@/assets/images/lambretta_1.png'),
        details: {
            color: 'Red',
            year: 2021,
            license: 'ABC-1234',
            vin: '5YJSA1E26MF123456',
            warranty: {
                expiration: '12/12/2025',
            },
            maintenance: {
                last: '10/06/2024',
                next: '10/12/2024',
            },
            registration: {
                next: '01/01/2026',
            },
        },
    },
    {
        id: '2',
        name: 'Ford Mustang',
        image: require('@/assets/images/volkswagen.png'),
        details: {
            color: 'Blue',
            year: 2020,
            license: 'XYZ-5678',
            vin: '1FA6P8TH1L5123456',
            warranty: {
                expiration: '30/09/2024',
            },
            maintenance: {
                last: '15/03/2024',
                next: '15/09/2024',
            },
            registration: {
                next: '20/11/2025',
            },
        },
    },
    {
        id: '3',
        name: 'Ford Mustang',
        image: require('@/assets/images/volkswagen.png'),
        details: {
            color: 'Blue',
            year: 2020,
            license: 'XYZ-5678',
            vin: '1FA6P8TH1L5123456',
            warranty: {
                expiration: '30/09/2024',
            },
            maintenance: {
                last: '15/03/2024',
                next: '15/09/2024',
            },
            registration: {
                next: '20/11/2025',
            },
        },
    },
    {
        id: '4',
        name: 'Ford Mustang',
        image: require('@/assets/images/volkswagen.png'),
        details: {
            color: 'Blue',
            year: 2020,
            license: 'XYZ-5678',
            vin: '1FA6P8TH1L5123456',
            warranty: {
                expiration: '30/09/2024',
            },
            maintenance: {
                last: '15/03/2024',
                next: '15/09/2024',
            },
            registration: {
                next: '20/11/2025',
            },
        },
    },
    {
        id: '5',
        name: 'Ford Mustang',
        image: require('@/assets/images/volkswagen.png'),
        details: {
            color: 'Blue',
            year: 2020,
            license: 'XYZ-5678',
            vin: '1FA6P8TH1L5123456',
            warranty: {
                expiration: '30/09/2024',
            },
            maintenance: {
                last: '15/03/2024',
                next: '15/09/2024',
            },
            registration: {
                next: '20/11/2025',
            },
        },
    },
    {
        id: '6',
        name: 'Ford Mustang',
        image: require('@/assets/images/volkswagen.png'),
        details: {
            color: 'Blue',
            year: 2020,
            license: 'XYZ-5678',
            vin: '1FA6P8TH1L5123456',
            warranty: {
                expiration: '30/09/2024',
            },
            maintenance: {
                last: '15/03/2024',
                next: '15/09/2024',
            },
            registration: {
                next: '20/11/2025',
            },
        },
    },
];

function RightActions({ onEdit, onDelete }: any) {
    return (
      <View style={styles.rightActions}>
        <RectButton
          style={[styles.actionButton, styles.editButton]}
          onPress={onEdit}
        >
          <Text style={styles.actionText}>Edit</Text>
        </RectButton>
        <RectButton
          style={[styles.actionButton, styles.deleteButton]}
          onPress={onDelete}
        >
          <Text style={styles.actionText}>Delete</Text>
        </RectButton>
      </View>
    );
  }

function CarCard({ item }: any) {
  const handleEdit = () => {
    console.log('Edit', item.name);
  };

  const handleDelete = () => {
    console.log('Delete', item.name);
  };

  return (
    <Swipeable
      renderRightActions={() => (
        <RightActions onEdit={handleEdit} onDelete={handleDelete} />
      )}
    >
        <View style={styles.card}>
        <Text style={styles.carName}>{item.name}</Text>

        <View style={styles.contentRow}>
            {/* Left column */}
            <View style={styles.leftColumn}>
            <Image source={item.image} style={styles.carImage} />
            <Text style={styles.subText}>{item.details.license}</Text>
            <Text style={styles.subText}>{item.details.vin}</Text>
            </View>

            {/* Right column */}
            <View style={styles.rightColumn}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Bảo hành</Text>
                <Text style={styles.subText}>- Ngày hết hạn: {item.details.warrantyExpire}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Bảo dưỡng</Text>
                <Text style={styles.subText}>- Gần nhất: {item.details.lastMaintenance}</Text>
                <Text style={styles.subText}>- Tiếp theo: {item.details.nextMaintenance}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Thời hạn đăng kiểm</Text>
                <Text style={styles.subText}>- Tiếp theo: {item.details.nextRegistration}</Text>
            </View>
            </View>
        </View>
        </View>
    </Swipeable>
  );
}

export default function TabMyVehicle() {
  return (
    <FlatList
      data={cars}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CarCard item={item} />}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    carImage: {
      width: 120,
      height: 100,
      borderRadius: 8,
      marginRight: 15,
      marginBottom: 10,
    },
    contentRow: {
        flexDirection: 'row',
      },
      leftColumn: {
        marginRight: 15,
        alignItems: 'center',
      },
      subText: {
        fontSize: 14,
        marginBottom: 4,
        color: '#333',
      },
      rightColumn: {
        flex: 1,
        justifyContent: 'space-between',
      },
      section: {
        marginBottom: 10,
      },
      sectionTitle: {
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 4,
        color: '#000',
      },
    details: {
      flex: 1,
      justifyContent: 'center',
    },
    carName: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 5,
    },
    rightActions: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      borderRadius: 12,
      overflow: 'hidden',
    },
    actionButton: {
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 6,
      borderRadius: 12,
    },
    editButton: {
      backgroundColor: '#01498B',
      opacity: 0.5,
      height: "100%",
    },
    deleteButton: {
      backgroundColor: '#DA0812',
      opacity: 0.5,
      height: "100%",
    },
    actionText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });