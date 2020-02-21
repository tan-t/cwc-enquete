import firebase from 'firebase'

export const getFirebase = () => {
  return firebase.firestore().collection('/').onSnapshot((data) => {
    data.docs.forEach(d => console.log(d.data))
  })
}