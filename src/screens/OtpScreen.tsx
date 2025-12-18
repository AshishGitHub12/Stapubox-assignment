import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Pressable,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

import { useDispatch } from 'react-redux';
import { setAuthSuccess } from '../store/authSlice';

/**
 * Number of OTP digits to be entered
 */
const OTP_LENGTH = 4;

/**
 * Error message shown on wrong OTP
 */
const ERROR_MSG = 'Wrong OTP Entered';

/**
 * OTP Screen
 *
 * - Handles OTP input & verification
 * - Uses mocked verification due to backend 403
 * - JWT handling and profile APIs are fully implemented
 */
const OtpScreen = () => {
  /**
   * Typed navigation instance
   */
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /**
   * OTP stored as array so each digit has its own input
   */
  const [otp, setOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill('')
  );

  /**
   * Stores error message if OTP is invalid
   */
  const [error, setError] = useState<string | null>(null);

  /**
   * Refs for OTP inputs
   * Used to programmatically control focus
   */
  const inputs = Array.from(
    { length: OTP_LENGTH },
    () => useRef<TextInput>(null)
  );

  /**
   * Redux dispatcher
   * Used to store auth token after successful verification
   */
  const dispatch = useDispatch();

  /**
   * Verifies OTP (mocked)
   *
   * @param enteredOtp - Combined OTP string
   */
  const handleVerifyOtp = (enteredOtp: string) => {
    console.log('🔐 Verifying OTP (MOCK):', enteredOtp);

    // Mock correct OTP check
    if (enteredOtp === '1111') {
      // Generate mock JWT token
      const mockJwt = 'mock.jwt.token.' + Date.now();

      console.log('✅ OTP Verified');
      console.log('🪪 JWT:', mockJwt);

      // Save JWT in Redux store
      dispatch(setAuthSuccess(mockJwt));

      // Reset navigation stack after successful login
      navigation.reset({
        index: 0,
        routes: [{ name: 'BasicInfo' }],
      });
    } else {
      // Set error message if OTP is incorrect
      setError('Invalid OTP');
    }
  };

  /**
   * Handles OTP input change
   *
   * - Allows only numeric input
   * - Moves focus to next input automatically
   * - Auto-verifies OTP when all digits are entered
   */
  const handleChange = (text: string, idx: number) => {
    // Allow only digits
    if (/^\d*$/.test(text)) {
      const updated = [...otp];

      // Store only last digit
      updated[idx] = text.slice(-1);
      setOtp(updated);
      setError(null);

      // Move focus to next input
      if (text && idx < OTP_LENGTH - 1) {
        inputs[idx + 1].current?.focus();
      }
      // Auto-submit OTP if last digit is entered and all fields are filled
      else if (
        idx === OTP_LENGTH - 1 &&
        updated.every(x => x)
      ) {
        handleVerifyOtp(updated.join(''));
      }
    }
  };

  /**
   * Handles backspace key press
   *
   * - Moves focus to previous input if current is empty
   */
  const handleBackspace = (e: any, idx: number) => {
    if (
      e.nativeEvent.key === 'Backspace' &&
      !otp[idx] &&
      idx > 0
    ) {
      inputs[idx - 1].current?.focus();
    }
  };

  /**
   * Handles resend OTP action
   * Currently navigates back due to mocked flow
   */
  const handleResend = () => {
    // setOtp(Array(OTP_LENGTH).fill(''));
    // setError(null);
    // inputs[0].current?.focus();
    navigation.navigate('BasicInfo');
  };

  return (
    <View style={styles.container}>
      {/* Header section with back button */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
          style={styles.backBtn}
        >
          <Text style={styles.backArrow}>{'\u2039'}</Text>
        </TouchableOpacity>

        <Text style={styles.headerText}>Phone Verification</Text>
      </View>

      {/* Screen title */}
      <Text style={styles.title} numberOfLines={2}>
        Enter 4 digit OTP sent to your phone number
      </Text>

      {/* OTP input boxes */}
      <View style={styles.otpRow}>
        {otp.map((digit, idx) => {
          const isFilled = digit.length > 0;

          return (
            <TextInput
              key={idx}
              ref={inputs[idx]}
              style={[
                styles.otpBox,
                isFilled && styles.otpBoxActive,
                error && styles.otpBoxError,
              ]}
              value={digit}
              keyboardType="number-pad"
              returnKeyType={idx === 3 ? 'done' : 'next'}
              maxLength={1}
              selectionColor="#2196f3"
              onChangeText={txt => handleChange(txt, idx)}
              onKeyPress={e => handleBackspace(e, idx)}
              autoFocus={idx === 0}
              placeholder=" "
              placeholderTextColor="#535353"
            />
          );
        })}
      </View>

      {/* Error message */}
      {error && (
        <Text style={styles.errorMsg}>{error}</Text>
      )}

      {/* Resend OTP button */}
      <Pressable onPress={handleResend} style={styles.resendBtn}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242526',
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: Platform.select({ ios: 62, android: 36 }),
    marginBottom: 40,
  },
  backBtn: {
    height: 34,
    width: 34,
    borderRadius: 17,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  backArrow: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '400',
    marginRight: 2,
    marginTop: -2,
  },
  headerText: {
    color: '#bebebe',
    fontSize: 18,
    letterSpacing: 0.2,
    fontWeight: '500',
  },
  title: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 20,
    marginBottom: 31,
    alignSelf: 'flex-start',
    width: '100%',
    lineHeight: 29,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    width: '100%',
  },
  otpBox: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#515151',
    backgroundColor: '#222324',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    padding: 0,
    includeFontPadding: false,
    lineHeight: 38,
  },
  otpBoxError: {
    borderColor: '#ED4848',
  },
  otpBoxActive: {
    borderColor: '#ffffff',
  },
  errorMsg: {
    color: '#ED4848',
    fontSize: 13,
    fontWeight: '400',
    marginTop: 0,
    marginBottom: 0,
    alignSelf: 'flex-start',
    marginLeft: 0,
  },
  resendBtn: {
    marginTop: 16,
    alignSelf: 'flex-start',
  },
  resendText: {
    color: '#2196f3',
    fontWeight: '600',
    fontSize: 13,
  },
});

export default OtpScreen;
