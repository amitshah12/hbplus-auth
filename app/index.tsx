import { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import GoogleSignInButton from '../src/components/GoogleSignInButton';

export default function LoginScreen() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleError = useCallback((message: string) => {
    setError(message);
  }, []);

  function openDashboardPreview() {
    if (__DEV__) {
      router.push({
        pathname: '/dashboard',
        params: { preview: '1' },
      });
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>HB+</Text>
          </View>

          <Text style={styles.eyebrow}>HB+ WORKSPACE</Text>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.description}>
            Sign in with your official HB+ account to continue to your
            workspace.
          </Text>

          <View style={styles.form}>
            <GoogleSignInButton onError={handleError} />

            {error ? (
              <View accessibilityRole="alert" style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {__DEV__ ? (
              <View style={styles.previewSection}>
                <Text style={styles.previewNotice}>
                  For development and UI testing only. This does not sign
                  you in.
                </Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={openDashboardPreview}
                  style={({ pressed }) => [
                    styles.previewButton,
                    pressed && styles.previewButtonPressed,
                  ]}
                >
                  <Text style={styles.previewButtonText}>
                    Preview Dashboard (Development Only)
                  </Text>
                </Pressable>
              </View>
            ) : null}

            <View style={styles.divider} />

            <Text style={styles.policyTitle}>Official accounts only</Text>
            <Text style={styles.policyText}>
              Access is restricted to verified @hbplus.fit email addresses.
            </Text>
          </View>

          <Text style={styles.footer}>
            Secure sign-in · HB+ Internal Workspace
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  logo: {
    width: 58,
    height: 58,
    borderRadius: 17,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.8,
  },
  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 23,
    color: '#64748B',
  },
  form: {
    marginTop: 30,
  },
  errorBox: {
    marginTop: 16,
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 13,
    lineHeight: 20,
  },
  previewSection: {
    marginTop: 20,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  previewNotice: {
    color: '#92400E',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  previewButton: {
    minHeight: 46,
    paddingHorizontal: 12,
    borderRadius: 9,
    backgroundColor: '#92400E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewButtonPressed: {
    opacity: 0.8,
  },
  previewButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 24,
  },
  policyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'center',
  },
  policyText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: '#64748B',
    textAlign: 'center',
  },
  footer: {
    marginTop: 32,
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
