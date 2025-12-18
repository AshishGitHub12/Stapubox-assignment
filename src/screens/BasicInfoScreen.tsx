import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useDispatch } from 'react-redux';
import { setBasicInfo } from '../store/playerSlice';

const BasicInfoScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [pinCode, setPinCode] = useState('');

  const [isNextEnabled, setIsNextEnabled] = useState(false);

  useEffect(() => {
    setIsNextEnabled(name.trim() !== '' && address1.trim() !== '' && pinCode.trim() !== '');
  }, [name, address1, pinCode]);

  const handleNext = () => {
    dispatch(
      setBasicInfo({
        name,
        address1,
        address2,
        pinCode,
      })
    );
  
    navigation.navigate('SportInfo');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#242526' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Enter your details</Text>

        <Text style={styles.label}>Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#535353"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Address*</Text>
        <TextInput
          style={styles.input}
          placeholder="Address Line 1"
          placeholderTextColor="#535353"
          value={address1}
          onChangeText={setAddress1}
        />
        <TextInput
          style={styles.input}
          placeholder="Address Line 2 (Optional)"
          placeholderTextColor="#535353"
          value={address2}
          onChangeText={setAddress2}
        />

        <Text style={styles.label}>Pin Code*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Pin code"
          placeholderTextColor="#535353"
          keyboardType="number-pad"
          value={pinCode}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setPinCode(numericValue);
          }}
          maxLength={6}
        />
      </ScrollView>

      {/* Next button fixed at bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isNextEnabled ? styles.buttonActive : styles.buttonDisabled]}
          disabled={!isNextEnabled}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 24,
    paddingBottom: 100, // Add some bottom padding so last input isn’t hidden
  },
  title: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 24,
    marginTop: 12,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#222324',
    color: '#fff',
    borderColor: '#515151',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 16 : 14,
    fontSize: 16,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  buttonContainer: {
    padding: 24,
    backgroundColor: '#242526', // Match screen background
  },
  button: {
    borderRadius: 8,
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#35363A',
  },
  buttonActive: {
    backgroundColor: '#2196f3',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
  },
});

export default BasicInfoScreen;