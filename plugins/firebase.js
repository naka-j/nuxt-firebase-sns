import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: 'AIzaSyA0GRUtOosRrkNBDlZ0LpkshZcH-v8ZtPA',
      authDomain: 'nuxt-firebase-sns-e74ef.firebaseapp.com',
      databaseURL: 'https://nuxt-firebase-sns-e74ef.firebaseio.com',
      projectId: 'nuxt-firebase-sns-e74ef',
      storageBucket: 'gs://nuxt-firebase-sns-e74ef.appspot.com',
      messagingSenderId: '491467914519'
    }
  )
}

export default firebase
