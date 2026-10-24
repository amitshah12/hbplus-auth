import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';
import { logout } from '../src/services/auth';

export default function DashboardScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams<{ preview?: string }>();

  const isDevelopmentPreview = __DEV__ && params.preview === '1';

  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState('');

  async function handleLogout() {
    setLoggingOut(true);
    setError('');

    try {
      if (!isDevelopmentPreview) {
        await logout();
      }

      router.replace('/');
    } catch {
      setError('Unable to sign out. Please try again.');
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {isDevelopmentPreview ? (
          <View style={styles.previewBanner}>
            <Text style={styles.previewTitle}>
              DEVELOPMENT PREVIEW — NOT AUTHENTICATED
            </Text>
            <Text style={styles.previewDescription}>
              This is a UI preview. No Google or Firebase login has occurred.
            </Text>
          </View>
        ) : null}

        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>HB+</Text>
            </View>
            <View>
              <Text style={styles.brandTitle}>HB+ Workspace</Text>
              <Text style={styles.brandSubtitle}>INTERNAL PORTAL</Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            disabled={loggingOut}
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            {loggingOut ? (
              <ActivityIndicator color="#334155" />
            ) : (
              <Text style={styles.logoutText}>
                {isDevelopmentPreview ? 'Exit Preview' : 'Sign out'}
              </Text>
            )}
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.welcomeCard}>
            <Text style={styles.eyebrow}>YOUR WORKSPACE</Text>
            <Text style={styles.title}>
              {isDevelopmentPreview ? 'Dashboard preview' : "You're signed in."}
            </Text>
            <Text style={styles.description}>
              {isDevelopmentPreview
                ? 'Explore the HB+ workspace interface in development preview mode.'
                : 'Welcome to the HB+ internal workspace. Your account has passed the domain access check.'}
            </Text>

            <View
              style={[
                styles.accessBadge,
                isDevelopmentPreview && styles.previewBadge,
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  isDevelopmentPreview && styles.previewDot,
                ]}
              />
              <Text
                style={[
                  styles.accessText,
                  isDevelopmentPreview && styles.previewBadgeText,
                ]}
              >
                {isDevelopmentPreview
                  ? 'Preview only — no authenticated session'
                  : 'Authorized account'}
              </Text>
            </View>
          </View>

          <View style={styles.profileCard}>
            <Text style={styles.sectionTitle}>Account details</Text>

            <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
            <Text style={styles.email}>
              {isDevelopmentPreview
                ? 'No authenticated account (preview)'
                : user?.email ?? '—'}
            </Text>

            <View style={styles.separator} />

            <Text style={styles.fieldLabel}>ACCESS DOMAIN</Text>
            <Text style={styles.domain}>@hbplus.fit</Text>

            <View style={styles.separator} />

            <Text style={styles.fieldLabel}>EMAIL VERIFICATION</Text>
            <Text
              style={[
                styles.verified,
                isDevelopmentPreview && styles.previewVerification,
              ]}
            >
              {isDevelopmentPreview
                ? 'Not checked — preview mode'
                : user?.emailVerified
                  ? 'Verified'
                  : 'Not verified'}
            </Text>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Text style={styles.footer}>
            {isDevelopmentPreview
              ? 'Development preview only. This is not an authenticated session.'
              : 'Access is limited to authorized HB+ accounts.'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
  },
  previewBanner: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFBEB',
    borderBottomWidth: 1,
    borderBottomColor: '#FDE68A',
  },
  previewTitle: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  previewDescription: {
    marginTop: 5,
    color: '#92400E',
    fontSize: 12,
    lineHeight: 18,
  },
  header: {
    minHeight: 84,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 17,
  },
  brandTitle: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
  },
  brandSubtitle: {
    color: '#64748B',
    fontSize: 10,
    letterSpacing: 1.5,
    marginTop: 4,
  },
  logoutButton: {
    minHeight: 42,
    paddingHorizontal: 17,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
  },
  content: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 40,
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 28,
  },
  eyebrow: {
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.8,
  },
  title: {
    color: '#0F172A',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 14,
    letterSpacing: -0.7,
  },
  description: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 12,
  },
  accessBadge: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
    borderRadius: 20,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#059669',
  },
  accessText: {
    color: '#047857',
    fontSize: 12,
    fontWeight: '700',
  },
  previewBadge: {
    backgroundColor: '#FEF3C7',
  },
  previewDot: {
    backgroundColor: '#D97706',
  },
  previewBadgeText: {
    color: '#92400E',
  },
  profileCard: {
    marginTop: 20,
    padding: 26,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 10,
    letterSpacing: 1.4,
    fontWeight: '700',
    color: '#64748B',
  },
  email: {
    fontSize: 15,
    color: '#0F172A',
    marginTop: 8,
  },
  domain: {
    fontSize: 14,
    color: '#0F172A',
    marginTop: 8,
  },
  verified: {
    fontSize: 14,
    color: '#047857',
    marginTop: 8,
    fontWeight: '600',
  },
  previewVerification: {
    color: '#92400E',
  },
  separator: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 20,
  },
  error: {
    marginTop: 16,
    color: '#B91C1C',
    fontSize: 13,
  },
  footer: {
    marginTop: 24,
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
  },
});
