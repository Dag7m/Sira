import { useState } from 'react';
import axios from 'axios';

const AddExperienceForm = ({ onAdded }) => {
  const [experienceData, setExperienceData] = useState({
    
    company_name: '',
    job_title: '',
    start_date: '',
    end_date: '',
    description: '',
  });

  const handleChange = (e) => {
    setExperienceData({
      ...experienceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      await axios.post('http://localhost:5000/api/profile/work-experience', experienceData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onAdded(); // Refresh experiences after adding
    } catch (error) {
      console.error('Failed to add experience:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg mb-4">
      <h3 className="text-xl font-semibold mb-2">Add Work Experience</h3>
     
      <input
        name="company_name"
        placeholder="Company Name"
        value={experienceData.company_name}
        onChange={handleChange}
        className="w-full p-2 mb-2 rounded"
        required
      />
       <input
        name="job_title"
        placeholder="Job Title"
        value={experienceData.job_title}
        onChange={handleChange}
        className="w-full p-2 mb-2 rounded"
        required
      />
      <input
        name="start_date"
        type="date"
        value={experienceData.start_date}
        onChange={handleChange}
        className="w-full p-2 mb-2 rounded"
        required
      />
      <input
        name="end_date"
        type="date"
        value={experienceData.end_date}
        onChange={handleChange}
        className="w-full p-2 mb-2 rounded"
      />
      <textarea
        name="description"
        placeholder="Job Description"
        value={experienceData.description}
        onChange={handleChange}
        className="w-full p-2 mb-2 rounded"
      ></textarea>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Experience
      </button>
    </form>
  );
};

export default AddExperienceForm;
