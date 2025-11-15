// Lightweight shims to keep the workspace error-free before installing mobile deps.
// When you run `npm install` inside `mobile/`, real types will take precedence.
declare module 'react';
declare module 'react/jsx-runtime';
declare module 'react-native';
declare module 'expo-router';
declare module '@react-native-async-storage/async-storage';
