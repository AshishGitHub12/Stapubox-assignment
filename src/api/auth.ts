import axios from 'axios';
import { API_TOKEN, BASE_URL } from '../config/apiConfig';

export const sendOtp = async (phone: string) => {
  console.log('📤 MOCK sendOtp called for:', phone);

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true });
    }, 800);
  });
};

export const verifyOtp = async (phone: string, otp: string) => {
  console.log('🔐 MOCK verifyOtp:', phone, otp);

  if (otp === '1111') {
    return {
      data: {
        token: 'mock.jwt.token.' + Date.now(),
      },
    };
  }

  throw new Error('Invalid OTP');
};