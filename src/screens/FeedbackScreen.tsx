import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { savePlayerData } from '../api/player';
import { setFeedback } from '../store/playerSlice';

const MAX_LENGTH = 1000;

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const [feedback, setFeedbackText] = useState('');
  const player = useSelector((state: any) => state.player);
  const token = useSelector((state: any) => state.auth.token);

  const dispatch = useDispatch();

  const isValid = feedback.trim().length > 0;

  const handleSubmit = async () => {
    const payload = {
      name: player.name,
      address: {
        line1: player.address1,
        line2: player.address2,
        pincode: player.pinCode,
      },
      playingStatus: player.playingStatus,
      sport: player.sport,
      feedback,
    };
  
    try {
      // ✅ SAVE TO REDUX FIRST
      dispatch(setFeedback(feedback));
  
      // ✅ THEN SAVE TO API
      const response = await savePlayerData(token, payload);
      console.log('Player Info Response 👉', response);
  
      navigation.navigate('Summary');
    } catch (error) {
      console.log('Save Player Error ❌', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10}>
        <View style={styles.backCircle}>
            <Text style={styles.backArrow}>{'\u2039'}</Text>
        </View>
        </TouchableOpacity>
        <Text style={styles.headerText}>Share Your Feedback</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.label}>Feedback</Text>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.textInput}
            multiline
            maxLength={MAX_LENGTH}
            value={feedback}
            onChangeText={setFeedbackText}
            placeholder="Write your suggestion"
            placeholderTextColor="#535353"
          />
          <Text style={styles.counter}>
            {feedback.length}/{MAX_LENGTH}
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <TouchableOpacity
        style={[
          styles.bottomButton,
          isValid ? styles.buttonActive : styles.buttonDisabled,
        ]}
        disabled={!isValid}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242526',
    paddingHorizontal: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 60 : 32,
    marginBottom: 24,
  },
  backArrow: {
    color: '#fff',
    fontSize: 23,
    fontWeight: '400',
    marginRight: 2,
    marginTop:-5,
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
  headerText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 29
  },
  label: {
    color: '#fff',
    fontWeight:'400',
    fontSize: 14,
    marginBottom: 8,
    marginTop:10
  },
  inputBox: {
    backgroundColor: '#222324',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#515151',
    padding: 12,
    minHeight: 230,
  },
  textInput: {
    color: '#fff',
    fontSize: 14,
    textAlignVertical: 'top',
    flex: 1,
  },
  counter: {
    color: '#bebebe',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  bottomButton: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 24,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#2196f3',
  },
  buttonDisabled: {
    backgroundColor: '#35363A',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});