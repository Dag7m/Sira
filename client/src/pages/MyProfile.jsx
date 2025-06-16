import React, { useEffect, useState } from 'react';
import { MetaData } from '../components/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddEducationForm from './AddEducationForm';
import AddExperienceForm from './AddExperienceForm';

export const MyProfile = () => {
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [eduModalOpen, setEduModalOpen] = useState(false);
  const [expModalOpen, setexpModalOpen] = useState(false);

  const { loading, me, isLogin } = useSelector(state => state.user);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

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
<<<<<<< Updated upstream
  };

  const handleDeleteExperience = async (id) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.delete(`http://localhost:5000/api/profile/work-experience/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExperiences(experiences.filter(exp => exp.id !== id));
    } catch (error) {
      console.error("Failed to delete experience:", error);
    }
  };

  const handleDeleteEducation = async (id) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.delete(`http://localhost:5000/api/profile/education/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEducations(educations.filter(edu => edu.id !== id));
    } catch (error) {
      console.error("Failed to delete education:", error);
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const eduRes = await axios.get('http://localhost:5000/api/profile/educations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const expRes = await axios.get('http://localhost:5000/api/profile/experiences', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEducations(eduRes.data);
      setExperiences(expRes.data);
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

=======
  }
>>>>>>> Stashed changes
  return (
    <>
      <MetaData title="My Profile" />
      <div className="bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen pt-16 md:pt-20 px-4 sm:px-6 md:px-10 lg:px-20 text-gray-100">
        {loading ? (
          <Loader />
        ) : (
          <div className="max-w-6xl mx-auto pt-6 md:pt-8 pb-16 md:pb-24">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight underline underline-offset-8 decoration-4 decoration-gray-500/50 animate-slide-in-down">
                My Profile
              </h1>
            </div>

            {/* Profile Content */}
            <div className="flex flex-col md:flex-row md:gap-12 gap-8 justify-center items-start min-h-[80vh]">
              {/* Left Section (Work Experience & Education) */}
              <div className="md:w-1/2 w-full pt-8 md:pt-10 flex flex-col gap-8">
                {/* Work Experience */}
                <div className="bg-gray-800/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700/50 hover:border-yellow-500 hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-4 underline underline-offset-4 decoration-gray-500/50">
                    Work Experience
                  </h2>
                  {experiences.length === 0 ? (
                    <p className="text-gray-300 text-base sm:text-lg">No experiences added.</p>
                  ) : (
                    experiences.map(exp => (
                      <div key={exp.id} className="bg-gray-800/50 p-4 rounded-lg mb-4 relative border border-gray-700/30 hover:border-gray-600 transition-all duration-200">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-100">{exp.job_title} @ {exp.company_name}</h3>
                        <p className="text-sm sm:text-base text-gray-300">{formatDate(exp.start_date)} - {formatDate(exp.end_date) || 'Present'}</p>
                        <p className="pt-2 text-gray-300 text-sm sm:text-base">{exp.description}</p>
                        <button
                          onClick={() => handleDeleteExperience(exp.id)}
                          className="absolute top-2 right-2 bg-blue-600/80 hover:bg-blue-500/90 text-white text-xs px-2 py-1 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
<<<<<<< Updated upstream

                {/* Education */}
                <div className="bg-gray-800/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700/50 hover:border-yellow-500 hover:shadow-lg transition-all duration-300">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-4 underline underline-offset-4 decoration-gray-500/50">
                    Education
                  </h2>
                  {educations.length === 0 ? (
                    <p className="text-gray-300 text-base sm:text-lg">No education records found.</p>
                  ) : (
                    educations.map(edu => (
                      <div key={edu.id} className="bg-gray-800/50 p-4 rounded-lg mb-4 relative border border-gray-700/30 hover:border-gray-600 transition-all duration-200">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-100">{edu.degree} in {edu.field_of_study}</h3>
                        <p className="text-sm sm:text-base text-gray-300">{edu.institution}</p>
                        <p className="text-sm sm:text-base text-gray-300">{edu.start_year} - {edu.end_year}</p>
                        <button
                          onClick={() => handleDeleteEducation(edu.id)}
                          className="absolute top-2 right-2 bg-blue-600/80 hover:bg-blue-500/90 text-white text-xs px-2 py-1 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Right Section (Profile Details & Actions) */}
              <div className="md:w-1/2 w-full px-4 md:px-0 pt-8 md:pt-0">
                <div className="flex flex-col gap-6 bg-gray-800/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700/50 hover:border-yellow-500 hover:shadow-lg transition-all duration-300">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-100">Full Name</h2>
                    <p className="text-lg sm:text-xl text-gray-300 mt-1">{me.name}</p>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-100">Email</h2>
                    <p className="text-lg sm:text-xl text-gray-300 mt-1">{me.email}</p>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-100">Joined On</h2>
                    <p className="text-lg sm:text-xl text-gray-300 mt-1">
                      {convertDateFormat(me.created_at.substr(0, 10))}
                    </p>
                  </div>
                  {/* <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-100">Skills</h2>
                    <div className="text-lg sm:text-xl text-gray-300 mt-3 flex flex-wrap gap-2">
                      {me.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-gray-700/50 text-gray-100 text-sm px-3 py-1.5 rounded-full font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div> */}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
                    <div className="flex flex-col gap-4">
                      <button
                        onClick={() => setEduModalOpen(true)}
                        className="bg-blue-600/80 hover:bg-blue-500/90 w-full text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Add Education
                      </button>
                      <button
                        onClick={() => setexpModalOpen(true)}
                        className="bg-blue-600/80 hover:bg-blue-500/90 w-full text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Add Experience
                      </button>
                    </div>
                    <div className="flex flex-col gap-4">
                      {/* <Link to="#">
                        <button
                          onClick={open}
                          className="bg-blue-600/80 hover:bg-blue-500/90 w-full text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          My Resume
                        </button>
                      </Link> */}
                      <Link to="/applied">
                        <button className="bg-blue-600/80 hover:bg-blue-500/90 w-full text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                          My Applications
                        </button>
                      </Link>
                      <Link to="/saved">
                        <button className="bg-blue-600/80 hover:bg-blue-500/90 w-full text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                          Saved Jobs
                        </button>
                      </Link>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Link to="/changePassword">
                        <button className="bg-blue-600/80 hover:bg-blue-500/90 w-full text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                          Change Password
                        </button>
                      </Link>
                      <Link to="/deleteAccount">
                        <button className="bg-blue-600/80 hover:bg-blue-500/90 w-full text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                          Delete Account
                        </button>
                      </Link>
                      <Link to="/editProfile">
                        <button className="bg-blue-600/80 hover:bg-blue-500/90 w-full text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                          Edit Profile
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modals */}
              <Modal opened={eduModalOpen} onClose={() => setEduModalOpen(false)} title="Add Education" className="bg-gray-800">
                <AddEducationForm onAdded={fetchData} />
              </Modal>
              <Modal opened={expModalOpen} onClose={() => setexpModalOpen(false)} title="Add Experience" className="bg-gray-800">
                <AddExperienceForm onAdded={fetchData} />
              </Modal>
              <Modal opened={opened} onClose={close} title="Resume" className="bg-gray-800">
                {/* <div>
                  <img src={me.resume.url} className="w-full h-full" alt="" />
                </div> */}
              </Modal>
            </div>
          </div>
        )}
=======
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
                    <div>
                      <p className='md:text-2xl text-xl'>Skills</p>
                     {/*  <div className='md:text-xl text-lg pt-3 flex gap-3'>{
                        me.skills.map((skill, i) => (
                          <span key={i} className='bg-yellow-500 text-black  text-sm px-2 py-1  font-bold '>{skill}</span>
                        ))
                      }</div> */}
                    </div>
                    <div className='flex md:flex-row flex-col md:gap-8 pt-4 gap-3'>
                      <ul className='flex flex-col gap-4'>

                        <li className=' '> <Link  ><button onClick={open} className='blueCol w-2/3 md:w-full  font-medium px-6 py-1'>My Resume</button></Link> </li>
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
>>>>>>> Stashed changes
      </div>
    </>
  );
};