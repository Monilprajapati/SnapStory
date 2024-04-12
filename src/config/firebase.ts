import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../utils/index";

const app = initializeApp(firebaseConfig);
const stroage = getStorage(app, "gs://snapstory-1b224.appspot.com");

function createUniqueFileName(fileName: string) {
  const timeStamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 12);

  return `${fileName}-${timeStamp}-${randomString}`;
}

console.log("entered in firebase.ts")

export async function handleImageSaveToFireBase(file: any) {
  const extractUniqueFileName = createUniqueFileName(file?.name);
  const stroageRef = ref(stroage, `post/${extractUniqueFileName}`);
  const uploadImg = uploadBytesResumable(stroageRef, file);

  console.log("entered in handleImageSaveToFireBase")
  return new Promise((resolve, reject) => {
    uploadImg.on(
      "state_changed",
      (snapshot) => {},
      (error) => reject(error),
      () => {
        getDownloadURL(uploadImg.snapshot.ref)
          .then((url) => resolve(url))
          .catch((error) => reject(error));
      }
    );
  });
}
