import * as firebase from 'firebase/app';

export const Bootstrap = config => {
  firebase.initializeApp(config);
};
