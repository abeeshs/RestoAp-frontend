// import dotenv from "dotenv";
// import path from 'path'
// import path from `../../${process.env.NODE_ENV}`;
// import envFilePath from `../../.env.${process.env.NODE_ENV}`

// console.log(process.env.NODE_ENV);
// dotenv.config({path:path.join(__dirname, `../../.env.${process.env.NODE_ENV}`)});

const config = {
    port:process.env.PORT,
    firebase:{
        apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId:process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
        
    },
    url:{
        baseUrl:process.env.REACT_APP_BASE_URL
    }
};

export default config;

