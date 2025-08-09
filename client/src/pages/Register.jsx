import React, { useState, useEffect } from 'react'
import { MetaData } from '../components/MetaData'
import { AiOutlineMail, AiOutlineUnlock, AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { MdPermIdentity, MdOutlineFeaturedPlayList } from 'react-icons/md'
import { BsFileEarmarkText } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { Link, useNavigate } from 'react-router-dom'
import { TbLoader2 } from 'react-icons/tb'
import { registerUser } from '../actions/UserActions'
import { useDispatch, useSelector } from 'react-redux'



export const Register = () => {

  const { loading, isLogin } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [eyeTog, setEyeTog] = useState(false)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [role, setRole] = useState("");





// Update the registerHandler function to include role
const registerHandler = (e) => {
  e.preventDefault()
  const data = {
    name,
    email,
    password,
    role,
  }

  dispatch(registerUser(data))

  setName("")
  setEmail("")
  setPassword("")
  setRole("")
}





  useEffect(() => {
    if (isLogin) {
      navigate("/")
    }
  }, [isLogin])

  return (
    <>
      <MetaData title="Register" />
      <div className='bg-gray-950 min-h-screen pt-14 md:px-20 px-3  text-white'>
        <div className=' flex justify-center w-full items-start pt-6'>
          <form onSubmit={registerHandler} className='flex flex-col md:w-1/3 shadow-gray-700  w-full md:mx-0 mx-8' action="">

            <div className='md:px-10 px-2 pt-4 pb-20 w-full flex flex-col gap-4'>
              <div className='text-center'>
                <p className='text-4xl  font-medium'>Register</p>
              </div>

              {/* Name */}
              <div className='bg-white flex justify-center items-center'>
                <div className='text-gray-600 px-2'>
                  <MdPermIdentity size={20} />
                </div>
                <input value={name} onChange={(e) => setName(e.target.value)} required placeholder='Full name' type="text" className='outline-none bold-placeholder w-full text-black px-1 pr-3 py-2' />
              </div>


              {/* Mail */}
              <div className='bg-white flex justify-center items-center'>
                <div className='text-gray-600 px-2'>
                  <AiOutlineMail size={20} />
                </div>
                <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email' type="email" className='outline-none bold-placeholder w-full text-black px-1 pr-3 py-2' />
              </div>

              {/* Password */}
              <div className='bg-white flex justify-center items-center'>
                <div className='text-gray-600 px-2'>
                  <AiOutlineUnlock size={20} />
                </div>
                <input value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Password' type={eyeTog ? "text" : "password"} className='outline-none bold-placeholder w-full text-black px-1 pr-3 py-2' />
                <div className='text-gray-600 px-2 cursor-pointer' >
                  {eyeTog ?
                    <AiOutlineEye size={20} onClick={() => setEyeTog(!eyeTog)} /> : <AiOutlineEyeInvisible size={20} onClick={() => setEyeTog(!eyeTog)} />
                  }
                </div>
              </div>
              <div className='bg-white flex justify-center items-center'>
  <div className='text-gray-600 px-2'>
    <BsFileEarmarkText size={20} />
  </div>
    <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    required
    className='outline-none bold-placeholder w-full text-black px-1 pr-3 py-2'
  >
    <option value="" disabled>Select Role</option>
    <option value="admin">Admin</option>
    <option value="job_seeker">Job Seeker</option>
  </select>

</div>
              <div>
                <button disabled={loading} className='blueCol flex justify-center items-center px-8 w-full py-2 font-semibold' >
                  {loading ? <TbLoader2 className='animate-spin' size={24} /> : "Register"}</button>
              </div>

              <div className='text-center text-sm pt-2'>
                <p>Already have a account,<Link to="/login" className='text-yellow-400 underline'>Login</Link> here. </p>
              </div>

            </div>



          </form>
        </div>


      </div>

    </>
  )
}
