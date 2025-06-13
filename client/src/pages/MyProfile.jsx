import React,{useEffect,useState} from 'react'
import { MetaData } from '../components/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components/Loader'
import { Link } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


export const MyProfile = () => {
const [educations, setEducations] = useState([]);
const [experiences, setExperiences] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('userToken');

      const eduRes = await axios.get('http://localhost:5000/api/profile/educations', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const expRes = await axios.get('http://localhost:5000/api/profile/experiences', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setEducations(eduRes.data);
      setExperiences(expRes.data);
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  };

  fetchData();
}, []);
  const { loading, me, isLogin } = useSelector(state => state.user)
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate()
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
    });
  };
  const convertDateFormat = (inputDate) => {
    const parts = inputDate.split('-');
    if (parts.length !== 3) {
      return "Invalid date format";
    }

    const day = parts[2];
    const month = parts[1];
    const year = parts[0];

    return `${day}-${month}-${year}`;
  }

  


  
  return (
    <>

      <MetaData title="My Profile" />
      <div className='bg-gray-950 min-h-screen pt-14  md:px-20 px-3  text-white'>
        {
          loading ? <Loader /> :
            <>
              <div className='text-left text-3xl  underL absolute   pl-4 underline-offset-8 md:pt-6 pt-3'>
                <span className=' font-medium  '>My Profile</span>
              </div>

              <div className='flex md:flex-row md:gap-12 flex-col md:justify-around justify-center items-top md:pt-12  border-blue-500 min-h-[90vh] ' >


                <div className=' md:w-1/2 w-full md:pb-0 pt-16  md:pt-10 gap-8 flex flex-col justify-start items-center '>
             {/*      <div className=' w-72 h-72 flex md:justify-center justify-start items-center  '>

                    <img src={me.avatar.url} className='rounded-full w-full h-full' alt="" />
                  </div> */}
<div className="mt-12">
  <h2 className="text-2xl font-semibold underline mb-4">Work Experience</h2>
  {experiences.length === 0 ? <p>No experiences added.</p> : (
    experiences.map(exp => (
      <div key={exp.id} className="bg-gray-800 p-4 rounded-lg mb-4">
        <h3 className="text-xl font-bold">{exp.job_title} @ {exp.company_name}</h3>
        <p className="text-sm">{formatDate(exp.start_date)} - {formatDate(exp.end_date) || 'Present'}</p>
        <p className="pt-2">{exp.description}</p>
      </div>
    ))
  )}
</div>

<div className="mt-12">
  <h2 className="text-2xl font-semibold underline mb-4">Education</h2>
  {educations.length === 0 ? <p>No education records found.</p> : (
    educations.map(edu => (
      <div key={edu.id} className="bg-gray-800 p-4 rounded-lg mb-4">
        <h3 className="text-xl font-bold">{edu.degree} in {edu.field_of_study}</h3>
        <p>{edu.institution}</p>
        <p>{edu.start_year} - {edu.end_year}</p>
      </div>
    ))
  )}
</div>


                </div>



                <div className='  md:w-1/2 w-full md:px-0 px-4 pb-20 md:pt-4 pt-8'>
                  <div className='flex flex-col md:gap-5 gap-6'>
                    <div>
                      <p className='md:text-2xl text-xl'>Full Name</p>
                      <p className='md:text-xl pt-1 text-lg'>{me.name}</p>
                    </div>
                    <div>
                      <p className='md:text-2xl text-xl'>Email</p>
                      <p className='md:text-xl pt-1 text-lg'>{me.email}</p>
                    </div>
                    <div>
                      <p className='md:text-2xl text-xl'>Joined On</p>
                      <p className='md:text-xl pt-1 text-lg'>{convertDateFormat(me.created_at.substr(0, 10))}</p>
                    </div>
                  {/*  <div>
                      <p className='md:text-2xl text-xl'>Skills</p>
                       <div className='md:text-xl text-lg pt-3 flex gap-3'>{
                        me.skills.map((skill, i) => (
                          <span key={i} className='bg-yellow-500 text-black  text-sm px-2 py-1  font-bold '>{skill}</span>
                        ))
                      }</div> 
                    </div>*/}



                    <div className='flex md:flex-row flex-col md:gap-8 pt-4 gap-3'>
                      <ul className='flex flex-col gap-4'>
{/* 
                        <li className=' '> <Link  ><button onClick={open} className='blueCol w-2/3 md:w-full  font-medium px-6 py-1'>My Resume</button></Link> </li> */}
                        <li className=' '>
                          <Link to="/applied"><button className='blueCol w-2/3 md:w-full font-medium px-6 py-1'>My Applications</button></Link>
                        </li>
                        <li className=' '>
                          <Link to="/saved" ><button className='blueCol w-2/3 md:w-full font-medium px-6 py-1'>Saved Jobs</button></Link>
                        </li>

                      </ul>
                      <ul className='flex flex-col gap-4'>
                        <li className=' '>
                          <Link to="/changePassword"><button className='blueCol w-2/3 md:w-full font-medium px-6 py-1'>Change Password</button></Link>
                        </li>
                        <li className=' '><Link to="/deleteAccount"><button className='blueCol w-2/3 md:w-full font-medium px-6 py-1'>Delete Account</button></Link></li>
                      </ul>
                  <div className='flex justify-center items-center'>
                    <Link to="/editProfile" className='blueCol px-10 py-2 font-semibold'>Edit Profile</Link>
                  </div>
                    </div>

                  </div>
                </div>
                <Modal opened={opened} onClose={close} title="Resume">
{/*                   <div>
                    <img src={me.resume.url} className='w-full h-full' alt="" />
                  </div> */}
                 
                </Modal>
               

              </div>

            </>





        }


      </div>

    </>
  )
}


