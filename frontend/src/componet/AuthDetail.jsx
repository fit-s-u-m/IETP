import {useEffect,useState} from 'react'
import {onAuthStateChanged,signOut} from 'firebase/auth'
import auth from '../firebase.js'

export default function AuthDetail (){
  const [authUser,setAuthUser]=useState(null)

  useEffect(()=>{
    const listen =onAuthStateChanged(auth,user=>{
      if(user){
        setAuthUser(user)
      }else{
        setAuthUser(null)
        window.location.href = "http://localhost:5173/";
      }
    })
    return ()=>listen()
  },[])
  const userSignout =()=>{
    signOut(auth).then(()=>{
      window.location.href = "http://localhost:5173/";
    }).catch(error=>console.log(error.message))
  }
  const userSignin =()=>{
      window.location.href = "http://localhost:5173/";
  }
    return (
        <div>{
          authUser
                ?( <>
                    <p>{`${authUser.email}`}</p>
                    <button  className="btn btn-accent btn-outline btn-xs" onClick={userSignout}>Sign Out</button> 
                  </>)
                :(
                  <>
                  <p>Signed OUT</p> 
                  <button className="btn btn-accent btn-outline btn-xs " onClick={userSignin}>sign in</button> 
                  </>
                 ) 
        }</div>
    )
}
