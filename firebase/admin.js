const admin = require('firebase-admin');

// import {
//   FIREBASE_TYPE,
//   FIREBASE_PROJECT_ID,
//   FIREBASE_PRIVATE_KEY_ID,
//   FIREBASE_PRIVATE_KEY,
//   FIREBASE_CLIENT_EMAIL,
//   FIREBASE_CLIENT_ID,
//   FIREBASE_AUTH_URI,
//   FIREBASE_TOKEN_URI,
//   FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//   FIREBASE_CLIENT_X509_CERT_URL,
//   FIREBASE_DATABASE_URL,
// } from '@env';

export const verifyIdToken = token => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url:
          process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(err => {
      throw err;
    });
};
