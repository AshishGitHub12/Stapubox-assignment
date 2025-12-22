# StapuBox Assignment – React Native App

This repository contains my submission for the **StapuBox Frontend Developer Assignment**.

---

## 📱 App Overview

A React Native application that collects player details through a multi-step flow:

1. Phone Authentication (OTP – mocked)
2. Basic Info
3. Sports Info
4. Feedback
5. Summary Screen

The app uses **Redux Toolkit** for state management and follows a clean, modular architecture.

---

## 🔐 Authentication Assumptions

- OTP APIs (`/trial/sendOtp`, `/trial/verifyOtp`) were returning **403 / INVALID_JWT**
  - OTP flow is **mocked**
  - A mock JWT is generated on successful OTP (`1111`)

---

## 🧠 Tech Stack

- React Native (TypeScript)
- Redux Toolkit
- React Navigation
- Axios

---

## 🧪 API Testing

- `GET /sports` tested successfully (no auth required)

> API responses were logged and handled gracefully even when backend returned INVALID_JWT.

---

## ✨ Bonus Enhancements

- Edit Profile
- Logout
- Form validations
- Pixel-accurate UI (Figma aligned)
- Clean UX with disabled states

---

## Demo & APK

The demo video and Android APK for this assignment are available in the GitHub Releases section.

- **APK (Android release build):**

- **Demo Video:**  
  Included in the same release for a walkthrough of the app flow and features.

---

## 🚀 How to Run

```bash
npm install
npx react-native run-android
# To clear cache in case of errors:
npx react-native start --reset-cache
