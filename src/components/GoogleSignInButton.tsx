
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  getAuthErrorMessage,
  signInWithGoogleIdToken,
  signInWithGoogleWeb,
} from '../services/auth';

type Props = {
  onError: (message: string) => void;
};

export default function GoogleSignInButton({ onError }: Props) {
  const [loading, setLoading] = useState(false);
  const [nativeConfigured, setNativeConfigured] = useState(
    Platform.OS === 'web',
  );

  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }

    try {
      const webClientId =
        process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

      if (!webClientId) {
        onError('Google Sign-In is not configured. Please contact support.');
        return;
      }

      GoogleSignin.configure({
        webClientId,
        offlineAccess: false,
      });

      setNativeConfigured(true);
    } catch (error) {
      onError(getAuthErrorMessage(error));
    }
  }, [onError]);

  async function handlePress() {
    setLoading(true);
    onError('');

    try {
      if (Platform.OS === 'web') {
        await signInWithGoogleWeb();
        return;
      }

      if (!nativeConfigured) {
        onError('Google Sign-In is not ready. Please try again.');
        return;
      }

      await GoogleSignin.hasPlayServices();

      const result = await GoogleSignin.signIn();

      if (result.type === 'cancelled') {
        return;
      }

      const idToken = result.data.idToken;

      if (!idToken) {
        onError('Google did not return an ID token. Please try again.');
        return;
      }

      await signInWithGoogleIdToken(idToken);
    } catch (error) {
      onError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Continue with Google"
      disabled={loading || !nativeConfigured}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        (loading || !nativeConfigured) && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#0F172A" />
      ) : (
        <View style={styles.content}>
          <Text style={styles.google}>G</Text>
          <Text style={styles.label}>Continue with Google</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  google: {
    color: '#4285F4',
    fontSize: 20,
    fontWeight: '800',
  },
  label: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '600',
  },
  pressed: {
    backgroundColor: '#F1F5F9',
  },
  disabled: {
    opacity: 0.6,
  },
});
