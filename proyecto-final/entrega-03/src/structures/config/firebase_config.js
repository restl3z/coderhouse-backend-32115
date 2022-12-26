import admin from 'firebase-admin';
import service_account from '../../secrets/coderhouse-backend-882c4-firebase-adminsdk-h6gz6-c0ab16e18b.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(service_account),
});

const firebase_connect = admin.firestore();

export default firebase_connect;
