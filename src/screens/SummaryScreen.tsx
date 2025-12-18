import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { resetPlayer } from '../store/playerSlice';


const SummaryScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { name, address1, address2, pinCode, playingStatus, sport, feedback } =
  useSelector((state: any) => state.player);


  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your details</Text>
        </View>

        {/* Content */}
        <View style={styles.section}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{name || '-'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>
          {[address1, address2].filter(Boolean).join(', ') || '-'}
        </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Pin Code</Text>
          <Text style={styles.value}>{pinCode || '-'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Playing Status</Text>
          <Text style={styles.value}>{playingStatus || '-'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Sport you like</Text>
          <Text style={styles.value}>{sport || '-'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Feedback</Text>
          <Text style={styles.value}>{feedback || '-'}</Text>
        </View>
        </ScrollView>
        <View style={styles.bottomActions}>
          <Pressable
            style={[styles.actionBtn, styles.editBtn]}
            onPress={() => navigation.navigate('BasicInfo')}
          >
            <Text style={styles.actionText}>Edit</Text>
          </Pressable>

          <Pressable
            style={[styles.actionBtn, styles.logoutBtn]}
            onPress={() => {
              dispatch(resetPlayer());
              dispatch(logout());
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }}
          >
            <Text style={styles.actionText}>Logout</Text>
          </Pressable>
        </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: '#242526',
    },
    container: {
      paddingHorizontal: 20,
      paddingBottom: 24,
    },
  
    header: {
      flexDirection: 'center',
      alignItems: 'center',
      marginTop:40,
      marginBottom: 40,
    },
    headerTitle: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '500',
    },
  
    section: {
      marginBottom: 32,
    },
    label: {
      color: '#bcbcbc',
      fontSize: 13,
      marginBottom: 6,
    },
    value: {
      color: '#ffffff',
      fontSize: 15,
      lineHeight: 22,
    },
    bottomActions: {
      position: 'absolute',
      bottom: 4,
      left: 20,
      right: 20,
      flexDirection: 'row',
      gap: 12,
    },
    
    actionBtn: {
      flex: 1,
      height: 48,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    editBtn: {
      backgroundColor: '#35363A',
    },
    
    logoutBtn: {
      backgroundColor: '#2196f3',
    },
    
    actionText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default SummaryScreen;