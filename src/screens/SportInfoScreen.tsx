import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getSportsList } from '../api/sport';
import { setSports, setSportInfo } from '../store/playerSlice';


const STATUS_OPTIONS = ['Looking for Playground', 'Looking for Player'];
// const SPORT_OPTIONS = ['Archery', 'Badminton', 'Basketball', 'Boxing', 'Cricket'];

const SportInfoScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const sports = useSelector((state: any) => state.player.sports);

  const [statusOpen, setStatusOpen] = useState(false);
  const [sportOpen, setSportOpen] = useState(false);

  const [playingStatus, setPlayingStatus] = useState<string | null>(null);
  const [sport, setSport] = useState<string | null>(null);

  const isFormValid = !!playingStatus && !!sport;

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await getSportsList();
        console.log('Sports API response 👉', res);
  
        const sportNames = res.data.map((item: any) => item.sport_name).sort();
        dispatch(setSports(sportNames));
      } catch (error) {
        console.log('Sports API error ❌', error);
      }
    };
  
    fetchSports();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <View style={styles.backCircle}>
            <Text style={styles.backArrow}>{'\u2039'}</Text>
            </View>
          </Pressable>
          <Text style={styles.headerTitle}>Enter your details</Text>
        </View>

        {/* Playing Status */}
        <Text style={styles.label}>Playing Status</Text>

        <Pressable
          style={styles.dropdown}
          onPress={() => {
            setStatusOpen(!statusOpen);
            setSportOpen(false);
          }}
        >
          <Text
            style={[
              styles.dropdownText,
              !playingStatus && styles.placeholderText,
            ]}
          >
            {playingStatus ?? 'Looking for Playground'}
          </Text>

          {/* <View style={styles.arrowCircle}> */}
          <Text style={styles.caret}>˅</Text>
          {/* </View> */}
        </Pressable>

        {statusOpen && (
          <View style={styles.dropdownList}>
            {STATUS_OPTIONS.map(item => (
              <Pressable
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  setPlayingStatus(item);
                  setStatusOpen(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Sport */}
        <Text style={[styles.label, { marginTop: 22 }]}>
          Sport you like <Text style={{ color: '#ED4848' }}>*</Text>
        </Text>

        <Pressable
          style={styles.dropdown}
          onPress={() => {
            setSportOpen(!sportOpen);
            setStatusOpen(false);
          }}
        >
          <Text
            style={[
              styles.dropdownText,
              !sport && styles.placeholderText,
            ]}
          >
            {sport ?? 'Select Sport'}

          </Text>

          {/* <View style={styles.arrowCircle}> */}
          <Text style={styles.caret}>˅</Text>
          {/* </View> */}
        </Pressable>

        {sportOpen && (
        <View style={styles.dropdownList}>
          <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
            >
          {sports.length === 0 ? (
            <Text style={{ padding: 12, color: '#000' }}>
              Loading sports...
            </Text>
          ) : (
            sports.map((item: string, index: number) => (
              <Pressable
                key={`${item}-${index}`}
                style={styles.dropdownItem}
                onPress={() => {
                  setSport(item);
                  setSportOpen(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </Pressable>
            ))
          )}
           </ScrollView>
        </View>
      )}

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Next Button */}
        <Pressable
          style={[
            styles.nextBtn,
            !isFormValid && styles.nextBtnDisabled,
          ]}
          disabled={!isFormValid}
          onPress={() => {
            dispatch(
              setSportInfo({
                playingStatus: playingStatus!,
                sport: sport!,
              })
            );
          
            navigation.navigate('Feedback');
          }}
          
        >
          <Text
            style={[
              styles.nextText,
              !isFormValid && styles.nextTextDisabled,
            ]}
          >
            Next
          </Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
};

export default SportInfoScreen;

const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: '#242526',
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
      zIndex:1,
    },
    backArrow: {
        color: '#fff',
        fontSize: 23,
        fontWeight: '400',
        marginRight: 2,
        marginTop:-5,
      },
      caret: {
        color: '#ffffff',
        fontSize: 16,
        marginTop: 1, // visually center
        fontWeight: '600',
      },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 34,
      marginBottom: 28,
    },
    backCircle: {
      height: 30,
      width: 30,
      borderRadius: 17,
      backgroundColor: '#3a3b3d',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    headerTitle: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '500',
      marginLeft: 29
    },
  
    label: {
      color: '#ffffff',
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 8,
    },
  
    dropdown: {
      height: 48,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#5a5a5a',
      backgroundColor: '#2b2c2e',
      paddingHorizontal: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  
    dropdownText: {
      fontSize: 15,
      color: '#ffffff',
    },
    placeholderText: {
      color: '#7a7a7a',
    },
  
    arrowCircle: {
      height: 28,
      width: 28,
      borderRadius: 14,
      backgroundColor: '#3a3b3d',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    dropdownList: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      marginTop: 6,
      overflow: 'hidden',
      zIndex: 1000,
      elevation: 6, 
      maxHeight: 220, 
    },
    dropdownItem: {
      paddingVertical: 14,
      paddingHorizontal: 16,
    },
    dropdownItemText: {
      fontSize: 15,
      color: '#000000',
    },
  
    nextBtn: {
      height: 48,
      borderRadius: 10,
      backgroundColor: '#4d97ff',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    nextBtnDisabled: {
      backgroundColor: '#3a3b3d',
    },
    nextText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    nextTextDisabled: {
      color: '#9a9a9a',
    },
  });