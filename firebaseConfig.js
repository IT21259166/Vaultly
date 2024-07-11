// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK vx.x.x and later, measurementId is optional
const firebaseConfig = {
  apiKey: "yOur_fIreBaSe_aPi_key",
  authDomain: "yOuR_stoRagE_aUth_DomAiN",
  projectId: "yOur_pRoJect_iD",
  storageBucket: "yOuR_stoRagE_bUckEt_locAtion",
  messagingSenderId: "yOur_sEnder_iD",
  appId: "yoUr_aPp_iD",
  measurementId: "yoUr_meaSurEmEnt_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
