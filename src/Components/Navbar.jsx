import React,{useContext} from 'react'
import { AuthContext } from './AuthProvider'
export const Navbar = () => {
  const {logout}=useContext(AuthContext);

    return (
    <div className='flex justify-end'>
        <a href='/' className='text-dark font-bold px-4 mr-2' onClick={()=>logout()}>Log Out</a>
    </div>
  )
}
