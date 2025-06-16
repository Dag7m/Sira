import React, { useState } from 'react';
import axios from 'axios';

const CreateProfileForm = ({ onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    bio: '',
    skills: '',
    resume_url: '',
  });

  const handleSubmit = async () => {
    const token = localStorage.getItem('userToken');
    try {
      await axios.post('http://localhost:5000/api/profile/create', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSuccess();
    } catch (err) {
      console.error('Profile creation failed', err);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-white">
      <textarea
        placeholder="Bio"
        value={formData.bio}
        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        className="bg-gray-800 p-2 rounded w-full mb-4"
      />

      <input
        type="text"
        placeholder="Skills (comma-separated)"
        value={formData.skills}
        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
        className="bg-gray-800 p-2 rounded w-full mb-4"
      />

      <input
        type="text"
        placeholder="Resume URL"
        value={formData.resume_url}
        onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
        className="bg-gray-800 p-2 rounded w-full mb-4"
      />

      <div className="flex gap-4">
        <button onClick={handleSubmit} className="bg-green-600 px-4 py-2 rounded">
          Create
        </button>
        <button onClick={onClose} className="bg-red-600 px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateProfileForm;
