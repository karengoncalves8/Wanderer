import * as LocalAuthentication from 'expo-local-authentication';

export async function authenticateWithBiometrics() {
  // Check if hardware supports biometrics
  const compatible = await LocalAuthentication.hasHardwareAsync();
  if (!compatible) return { success: false, error: 'Biometric hardware not available' };

  // Check if user has registered biometrics
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  if (!enrolled) return { success: false, error: 'No biometrics enrolled' };

  // Request authentication
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate',
    fallbackLabel: 'Use password',
    cancelLabel: 'Cancel',
    disableDeviceFallback: false,
  });

  return result;
}
