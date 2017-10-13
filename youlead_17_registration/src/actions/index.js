
export const INCREMENT_MASTER_CLASS = 'INCREMENT_MASTER_CLASS'
export const ERROR= 'ERROR'
export const GET_USER = 'GET_USER'
export const GET_USERS_EMAILS = 'GET_USERS_EMAILS'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_MASTER_CLASSES = 'UPDATE_MASTER_CLASSES'
export const UPDATE_USERS = 'UPDATE_USERS'

import {db, fromDb } from '../databaseConfig'

export const getUsersEmails= async ()=>{type:GET_USERS_EMAILS, await db.ref('users').child('email').once()}

export const getUserByMail= async email=>{type:GET_USER, await db.ref('users').orderByChild('email').equalTo(email).once()}

export const updateUser= async user=> await db.ref('users/'+user.id).set(user)
                                      .then(responce=>{type:UPDATE_USER,{user:user,response:responce}})
                                      .catch(trowError)
                                     
export const getUser= async userId=>{type:GET_USER, await db.ref('users/'+userId).once()}

//This is so strange method
export const userCheckIn = async (user,masterClassName,masterClassTime)=>{
  let responce=[];
  const date =new Date().toLocaleDateString('ru')
  if(user[date]&&user[date][masterClassTime]){
    if(user[date][masterClassTime]===masterClassName)
      return;
    else
      respnce.push( decrementMmasterClassAttendee(`${date}/${user.section}/${masterClassTime}/${masterClassName}/attends`))
  }else{
    if(!user[date]) user[date]={}
    if(!user[date][masterClassTime]) user[date][masterClassTime]={}
  }
    user[date][masterClassTime]=masterClassName
    responce.push( incrementMmasterClassAttendee(`${date}/${user.section}/${masterClassTime}/${masterClassName}/attends`))
    responce.push( updateUser(user))
  return Promise.all(responce)
}


export const incrementMmasterClassAttendee =async id=>{type:INCREMENT_MASTER_CLASS, await db.ref('masterclasses/'+id)
                                                                                      .transaction(value=>value?value++:value)
                                                                                      .then(async()=>await updateMasterClasses())
                                                                                      .catch(trowError)
                                                                                    }
export const decrementMmasterClassAttendee =async id=>{type:DECREMENT_MASTER_CLASS, await db.ref('masterclasses/'+id)
                                                                                      .transaction(value=>value||valuee!==0?value--:value)
                                                                                      .then(async()=>await updateMasterClasses())
                                                                                      .catch(trowError)
                                                                                    }

export const getMasterClasses= async () =>{type:UPDATE_MASTER_CLASSES,await b.ref('masterclasses').once()}
//TODO: add logic for prelimits
export const updateMasterClasses= (masterclasses) =>{type:UPDATE_MASTER_CLASSES,masterclasses}
export const updateUsers= (users) =>{type:UPDATE_USERS,USERS}
export const trowError = error=> {type:ERROR, error} 