// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultauth: 'fackbackend',
  firebaseConfig: {
    // apiKey: '',
    // authDomain: '',
    // databaseURL: '',
    // projectId: '',
    // storageBucket: '',
    // messagingSenderId: '',
    // appId: '',
    // measurementId: ''
    apiKey: "AIzaSyDn9t5H_D8oonE6v8NNeQ_7VkGFGQxA-iI",
  authDomain: "react-ref.firebaseapp.com",
  projectId: "react-ref",
  storageBucket: "react-ref.appspot.com",
  messagingSenderId: "933450764686",
  appId: "1:933450764686:web:1e685d8cbfe7c296e794df",
  measurementId: "G-C4VBC1J09H"
  },
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDn9t5H_D8oonE6v8NNeQ_7VkGFGQxA-iI",
//   authDomain: "react-ref.firebaseapp.com",
//   projectId: "react-ref",
//   storageBucket: "react-ref.appspot.com",
//   messagingSenderId: "933450764686",
//   appId: "1:933450764686:web:1e685d8cbfe7c296e794df",
//   measurementId: "G-C4VBC1J09H"
// };
    // sandbox
    API_URL: 'http://localhost:8080',
    // Live
    // API_URL: 'https://115a-117-216-196-25.in.ngrok.io'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
