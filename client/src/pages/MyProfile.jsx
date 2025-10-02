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
import CreateProfileForm from './CreateProfileForm';
import UpdateProfileForm from './UpdateProfileForm';

export const MyProfile = () => {
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [eduModalOpen, setEduModalOpen] = useState(false);
  const [expModalOpen, setexpModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [createProfileModal, setCreateProfileModal] = useState(false);
  const [updateProfileModal, setUpdateProfileModal] = useState(false);

  const fetchProfile = async () => {
    const token = localStorage.getItem('userToken');
    try {
      const res = await axios.get('http://localhost:5000/api/profile/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (err) {
      console.error('Error fetching profile', err);
    }
  };

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
    fetchProfile();
  }, []);

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
                  <div className="p-6">
      <div className="bg-gray-800 p-6 rounded-xl mb-10 text-center shadow-lg">
        {profile ? (
          <>
            <p className="text-lg font-semibold">Bio:</p>
            <p className="text-gray-300 mb-4">{profile.bio}</p>
            <p className="text-lg font-semibold">Skills:</p>
            <p className="text-gray-300 mb-4">{profile.skills}</p>
            <p className="text-lg font-semibold">Resume:</p>
            <a
              href={profile.resume_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 underline mb-4 block"
            >
              View Resume
            </a>
            <button onClick={() => setUpdateProfileModal(true)} className="bg-yellow-600 px-4 py-2 rounded">
              Update Profile
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-300 mb-4">No profile created yet.</p>
            <button onClick={() => setCreateProfileModal(true)} className="bg-green-600 px-4 py-2 rounded">
              Create Profile
            </button>
          </>
        )}
      </div>

      {createProfileModal && (
        <CreateProfileForm
          onSuccess={() => {
            fetchProfile();
            setCreateProfileModal(false);
          }}
          onClose={() => setCreateProfileModal(false)}
        />
      )}

      {updateProfileModal && (
        <UpdateProfileForm
          existingProfile={profile}
          onSuccess={() => {
            fetchProfile();
            setUpdateProfileModal(false);
          }}
          onClose={() => setUpdateProfileModal(false)}
        />
      )}
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
      </div>
    </>
  );
};