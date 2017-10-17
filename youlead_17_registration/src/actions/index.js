
import {db, fromDb } from '../databaseConfig'

export const INCREMENT_MASTER_CLASS = 'INCREMENT_MASTER_CLASS'
export const DECREMENT_MASTER_CLASS = 'DECREMENT_MASTER_CLASS'
export const ERROR= 'ERROR'
export const GET_USER = 'GET_USER'
export const GET_USERS = 'GET_USERS'
export const GET_USERS_EMAILS = 'GET_USERS_EMAILS'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_MASTER_CLASSES = 'UPDATE_MASTER_CLASSES'
export const UPDATE_USERS = 'UPDATE_USERS'
export const ADD_USER = 'ADD_USER'
export const CHANGE_REGISTRATION_STATE ='CHANGE_REGISTRATION_STATE'

export const getUsersEmails= async ()=>{
  console.log('call get mails')
  const emails = await db.ref('Users').once('value',(data)=>data).catch(console.log)
  let emails_=[]
  emails.forEach((child)=>{
    emails_.push(child.val()['emailAddress'])
  })
  console.log('emails:', emails)
  console.log('emails_:', emails_)
  return {type:GET_USERS_EMAILS,emails:emails_}
}
export const getUserByMail= async email=>{
  const user= await db.ref('Users').orderByChild('emailAddress').equalTo(email).once()
  return {type:GET_USER, user:user }
}

export const updateUser= async user=> {
  const response= await db.ref('Users/'+user.id).set(user)
  return {type:UPDATE_USER,response:response}
}
export const getUser= async userId=>{
  const user=await db.ref('users/'+userId).once()
  return {type:GET_USER, user:user }
}


//This is so strange method
export const userCheckIn = async (user,masterClassName,masterClassTime, dispatch)=>{
  const date =new Date().toLocaleDateString('ru')
  if(user[date]&&user[date][masterClassTime]){
    if(user[date][masterClassTime]===masterClassName)
      return;
    else
      dispatch( decrementMasterClassAttendee(`${date}/${user.section}/${masterClassTime}/${user[date][masterClassTime]}/attends`))
  }else{
    if(!user[date]) user[date]={}
    if(!user[date][masterClassTime]) user[date][masterClassTime]={}
  }
    user[date][masterClassTime]=masterClassName
    dispatch( incrementMasterClassAttendee(`${date}/${user.section}/${masterClassTime}/${masterClassName}/attends`))
    dispatch( updateUser(user))
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
export const getMasterClasses = async () =>{
  const masterclasses=await db.ref('masterclasses').once()
  return {type:UPDATE_MASTER_CLASSES,masterclasses:masterclasses}
}
//TODO: add logic for prelimits
export const updateMasterClasses= (masterclasses) =>({type:UPDATE_MASTER_CLASSES,masterclasses})
export const updateUsers= (users) =>({type:UPDATE_USERS,users})
export const trowError = (error)=> ({type:ERROR, error:error}) 

export const addUser = async (user)=>{
  const response = await db.ref('users/'+user.id).set(user)
  return{type:ADD_USER,user:user, response:response }
}

export const changeRegistrationState=async (path) => {
  const response = await db.ref(path+'/isBlosked').set(true)
  return {trype:CHANGE_REGISTRATION_STATE, response:response }
} 
export const getUsers = async()=>{
  const users= await db.ref('users').once()
  return {type:GET_USERS, users:users}
}