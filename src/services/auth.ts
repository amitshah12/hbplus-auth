
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { Platform } from 'react-native';
import { auth } from '../lib/firebase';
import { isAllowedEmail } from '../utils/emailDomain';

export { isAllowedEmail } from '../utils/emailDomain';

export const DOMAIN_ERROR =
  'Access restricted. Please login using your official domain email.';

export async function validateUser(user: User): Promise<User> {
  if (!user.emailVerified || !isAllowedEmail(user.email)) {
    await signOut(auth);
    throw new Error(DOMAIN_ERROR);
  }

  return user;
}

export async function signInWithGoogleWeb(): Promise<User> {
  if (Platform.OS !== 'web') {
    throw new Error('Use the native Google sign-in flow on mobile.');
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  try {
    const result = await signInWithPopup(auth, provider);
    return await validateUser(result.user);
  } catch (error) {
    if (error instanceof Error && error.message === DOMAIN_ERROR) {
      throw error;
    }

    throw new Error(getAuthErrorMessage(error));
  }
}

export async function signInWithGoogleIdToken(
  idToken: string
): Promise<User> {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    const result = await signInWithCredential(auth, credential);

    return await validateUser(result.user);
  } catch (error) {
    if (error instanceof Error && error.message === DOMAIN_ERROR) {
      throw error;
    }

    throw new Error(getAuthErrorMessage(error));
  }
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export function getAuthErrorMessage(error: unknown): string {
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String(error.code)
      : '';

  switch (code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled. Please try again.';

    case 'auth/popup-blocked':
      return 'Your browser blocked the sign-in popup. Allow popups and retry.';

    case 'auth/network-request-failed':
      return 'Network error. Check your internet connection and retry.';

    default:
      return error instanceof Error
        ? error.message
        : 'Sign-in failed. Please try again.';
  }
}
