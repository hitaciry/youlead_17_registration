
export const INCREMENT_MASTER_CLASS = 'INCREMENT_MASTER_CLASS'
export const ERROR= 'ERROR'
export const GET_USER = 'GET_USER'
export const GET_USERS_EMAILS = 'GET_USERS_EMAILS'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_MASTER_CLASSES = 'UPDATE_MASTER_CLASSES'
export const UPDATE_USERS = 'UPDATE_USERS'

import {db, fromDb } from '../databaseConfig'

export const getUsersEmails= async ()=>{
  const users = await db.ref('users').child('email').once()
  return {type:GET_USERS_EMAILS,users}
}
export const getUserByMail= async email=>{
  const emails= await db.ref('users').orderByChild('email').equalTo(email).once()
  return {type:GET_USER, emails }
}

export const updateUser= async user=> {
const response= await db.ref('users/'+user.id).set(user)
                                    
export const getUser= async userId=>{
  const user=await db.ref('users/'+userId).once()
  return {type:GET_USER, user:user }
}


//This is so strange method
export const userCheckIn = async (user,masterClassName,masterClassTime)=>{
  const response=[];
  const date =new Date().toLocaleDateString('ru')
  if(user[date]&&user[date][masterClassTime]){
    if(user[date][masterClassTime]===masterClassName)
      return;
    else
      response.push( decrementMasterClassAttendee(`${date}/${user.section}/${masterClassTime}/${user[date][masterClassTime]}/attends`))
  }else{
    if(!user[date]) user[date]={}
    if(!user[date][masterClassTime]) user[date][masterClassTime]={}
  }
    user[date][masterClassTime]=masterClassName
    response.push( incrementMasterClassAttendee(`${date}/${user.section}/${masterClassTime}/${masterClassName}/attends`))
    response.push( updateUser(user))
  return Promise.all(response)
}


export const incrementMasterClassAttendee =async id=>{
  const response = await db.ref('masterclasses/'+id)
    .transaction(value=>value?value++:value)
  return{type:INCREMENT_MASTER_CLASS, response:response}       
}                          
export const decrementMasterClassAttendee =async id=>{
  const response = await db.ref('masterclasses/'+id)
    .transaction(value=>value?value--:value)
  return {type:DECREMENT_MASTER_CLASS, response: response}
} 
export const getMasterClasses= async () =>{
  const masterclasses=await b.ref('masterclasses').once()
  return {type:UPDATE_MASTER_CLASSES,masterclasses:masterclasses}
}
//TODO: add logic for prelimits
export const updateMasterClasses= (masterclasses) =>{type:UPDATE_MASTER_CLASSES,masterclasses}
export const updateUsers= (users) =>{type:UPDATE_USERS,USERS}
export const trowError = error=> ({type:ERROR, error}) 