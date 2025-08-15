import React, { useState, useEffect } from 'react'
import { Loader } from '../components/Loader'
import { MetaData } from '../components/MetaData'
import { AiOutlineMail } from 'react-icons/ai'
import { MdPermIdentity, MdOutlineFeaturedPlayList } from 'react-icons/md'
import { BsFileEarmarkText } from 'react-icons/bs'
import {updateProfile, me as ME} from '../actions/UserActions'
import { CgProfile } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'




export const EditProfile = () => {

    const dispatch = useDispatch()
    const { loading, me } = useSelector(state => state.user)


  const [name, setName] = useState(me.name);
  const [email, setEmail] = useState(me.email);

    const editHandler = (e) => {
        e.preventDefault()
        /* let skillArr = skills
        if(skills.constructor !== Array){
             skillArr = skills.split(",")
        }
 */
         const data = { 
             newName: name, 
             newEmail: email, 
     
         }

         dispatch(updateProfile(data))

    }


    useEffect(()=>{
        dispatch(ME())
        setName(me.name)
        setEmail(me.email)
  /*       setSkills(me.skills) */
    },[dispatch])

    return (
        <>

            <MetaData title="Edit Profile" />
            <div className='bg-gray-950 min-h-screen pt-14  md:px-20 px-3  text-white'>


                {loading ? <Loader /> :

                    <div>
                        <div className=' flex justify-center w-full items-start pt-14'>
                            <form onSubmit={editHandler} className='flex flex-col md:w-1/3 shadow-gray-700  w-full md:mx-0 mx-3 pb-28' action="">

                                <div className='md:px-10 px-7 pb-6 w-full shadow-sm shadow-gray-700 border-gray-700 border pt-5  flex flex-col gap-4'>
                                    <div className='text-center'>
                                        <p className='text-4xl  font-semibold'>Edit Profile</p>
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


                                   







                                    <div>
                                        <button className='blueCol px-8 w-full py-2 flex justify-center items-center font-semibold' >Update</button>
                                    </div>


                                </div>



                            </form>
                        </div>


                    </div>

                }


            </div>






        </>
    )
}
