import  firebase from 'firebase'

const config ={
  apiKey: "AIzaSyCU13mNT73uE-s9-Yv1zB5yaXorwlxWlR0",
  authDomain: "youlead-registration.firebaseapp.com",
  databaseURL: "https://youlead-registration.firebaseio.com"
}
const db = firebase.database(firebase.initializeApp(config))


export const getUser= async userId=>{type:GET_USER, await db.ref('users/'+userId).once()}
export const updateUser= async user=> await db.ref('users/'+user.id).set(user)
                                      .then(respnce=>{type:UPDATE_USER,{user:user,response:respnce}})
                                      .catch(error =>{type:ERROR,error})
//TODO: add logic for prelimits
export const updateMasterClasses= async () =>{type:UPDATE_MASTER_CLASSES,await db.ref('masterclasses')}

export const INCREMENT_MASTER_CLASS = 'INCREMENT_MASTER_CLASS'
export const ERROR= 'ERROR'
export const GET_USER = 'GET_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_MASTER_CLASSES = 'UPDATE_MASTER_CLASSES'