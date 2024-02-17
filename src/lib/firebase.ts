import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "fortuna-110d8.firebaseapp.com",
  projectId: "fortuna-110d8",
  storageBucket: "fortuna-110d8.appspot.com",
  messagingSenderId: "204882915415",
  appId: "1:204882915415:web:4679b06f853f31b2383312"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

// Upload to firebase function
export async function uploadFileToFirebase(image_url: string, name: string) {
    try {
        const response = await fetch(image_url)
        const buffer = await response.arrayBuffer()

        const file_name = name.replace(' ', '') + Date.now + '.jpeg'
        const storageRef = ref(storage, file_name)

        await uploadBytes(storageRef, buffer, { contentType: 'image/jpeg' })
        const firebase_url = await getDownloadURL(storageRef)

        return firebase_url
    } catch (error) {
        console.log(error)
    }
}