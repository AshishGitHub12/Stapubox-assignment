import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useDispatch } from 'react-redux';

/**
 * Default country code for phone number input
 * Kept constant for easy future change
 */
const COUNTRY_CODE = '+91';

/**
 * Login screen
 * - Accepts user's mobile number
 * - Validates phone number
 * - Sends OTP and navigates to OTP screen
 */
const LoginScreen = () => {
  /**
   * Typed navigation hook for safe navigation
   */
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /**
   * Local state to store phone number input
   */
  const [phone, setPhone] = useState('');

  /**
   * Phone number validation
   * - Must be exactly 10 digits
   * - Only numeric characters allowed
   */
  const isValidPhone = phone.length === 10 && /^\d+$/.test(phone);

  /**
   * Redux dispatcher
   * (can be used later for auth state handling)
   */
  const dispatch = useDispatch();

  /**
   * Handles OTP sending flow
   * - Prevents action if phone is invalid
   * - Simulates OTP API call (mock)
   * - Navigates to OTP screen on success
   */
  const handleSendOtp = async () => {
    if (!isValidPhone) return;

    console.log('📤 Sending OTP (MOCK)'); 
    console.log('Phone:', phone);

    // Simulate network delay
    setTimeout(() => {
      console.log('✅ OTP Sent (mocked)');
      navigation.navigate('Otp', { phone });
    }, 500);
  };

  return (
    <View style={styles.container}>
      {/* Screen title */}
      <Text style={styles.title}>Login to Your Account</Text>

      {/* Phone number input row */}
      <View style={styles.inputRow}>
        {/* Country code */}
        <View style={styles.countryCodeBox}>
          <Text style={styles.countryCodeText}>{COUNTRY_CODE}</Text>
        </View>

        {/* Phone number input */}
        <TextInput
          style={[
            styles.input,
            phone.length > 0 && styles.inputActive,
          ]}
          placeholder="Enter Your Mobile No."
          placeholderTextColor="#535353"
          keyboardType="number-pad"
          value={phone}
          onChangeText={setPhone}
          maxLength={10}
        />
      </View>

      {/* Send OTP button */}
      <TouchableOpacity
        style={[
          styles.button,
          isValidPhone ? styles.buttonActive : styles.buttonDisabled,
        ]}
        activeOpacity={isValidPhone ? 0.8 : 1}
        disabled={!isValidPhone}
        onPress={handleSendOtp}
      >
        <Text
          style={[
            styles.buttonText,
            !isValidPhone && styles.buttonTextDisabled,
          ]}
        >
          Send OTP
        </Text>
      </TouchableOpacity>

      {/* Create account CTA */}
      <View style={styles.createAccountRow}>
        <Text style={styles.secondaryText}>Don't have account? </Text>
        <TouchableOpacity>
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242526',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 37,
    marginTop: -40,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  inputActive: {
    borderColor: '#ffffff',
  },
  countryCodeBox: {
    backgroundColor: '#222324',
    borderColor: '#515151',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 16 : 14,
    marginRight: 8,
    justifyContent: 'center',
  },
  countryCodeText: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#222324',
    color: '#fff',
    borderColor: '#515151',
    borderWidth: 1,
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 16 : 14,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  button: {
    marginTop: 6,
    marginBottom: 18,
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
    shadowColor: '#2196f3',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
    letterSpacing: 0.3,
  },
  buttonTextDisabled: {
    color: '#bebebe',
  },
  createAccountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 12,
  },
  secondaryText: {
    color: '#bebebe',
    fontSize: 13,
  },
  createAccountText: {
    color: '#2196f3',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default LoginScreen;
