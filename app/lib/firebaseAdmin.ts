import * as admin from 'firebase-admin';

function initializeFirebaseAdmin() {
  if (!admin.apps.length) {
    try {
      const base64EncodedServiceAccount = process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;

      if (!base64EncodedServiceAccount) {
        throw new Error("NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 is not defined");
      }

      const decodedServiceAccount = Buffer.from(base64EncodedServiceAccount, 'base64').toString('utf-8');
      const credentials = JSON.parse(decodedServiceAccount);

      admin.initializeApp({
        credential: admin.credential.cert(credentials)
      });
      console.log('Firebase Admin initialized successfully');
    } catch (error) {
      console.error('Error initializing Firebase Admin:', error);
      throw error;
    }
  }
  return admin;
}

export { initializeFirebaseAdmin };