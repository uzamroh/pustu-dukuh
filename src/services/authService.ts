import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { ref, set, get, update } from 'firebase/database';
import { auth, database } from '@/config/firebase';
import { User, UserRole } from '@/types';

export const authService = {
  // Register new user
  async register(
    email: string,
    password: string,
    name: string,
    role: UserRole,
    pustu?: 'pabean' | 'bandengan'
  ): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const userData: User = {
      uid,
      email,
      name,
      role,
      pustu,
      createdAt: new Date(),
    };

    await set(ref(database, `users/${uid}`), {
      ...userData,
      createdAt: new Date().toISOString(),
    });

    return userData;
  },

  // Login user
  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const snapshot = await get(ref(database, `users/${uid}`));
    if (!snapshot.exists()) {
      throw new Error('User data not found');
    }

    const userData = snapshot.val();
    return {
      ...userData,
      createdAt: new Date(userData.createdAt),
    };
  },

  // Logout user
  async logout(): Promise<void> {
    await signOut(auth);
  },

  // Get current user
  getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  },

  // Listen to auth state changes
  onAuthStateChanged(callback: (user: User | null) => void): void {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const snapshot = await get(ref(database, `users/${firebaseUser.uid}`));
          if (snapshot.exists()) {
            const userData = snapshot.val();
            callback({
              ...userData,
              createdAt: new Date(userData.createdAt),
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  },

  // Update user profile
  async updateUserProfile(uid: string, updates: Partial<User>): Promise<void> {
    await update(ref(database, `users/${uid}`), {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  },

  // Get user by ID
  async getUserById(uid: string): Promise<User | null> {
    try {
      const snapshot = await get(ref(database, `users/${uid}`));
      if (snapshot.exists()) {
        const userData = snapshot.val();
        return {
          ...userData,
          createdAt: new Date(userData.createdAt),
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },
};