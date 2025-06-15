import React, { useState } from 'react';
import axios from 'axios';

const AddExperienceForm = ({ onAdded, closeModal }) => {
  const [experienceData, setExperienceData] = useState({
    company_name: '',
    job_title: '',
    start_date: '',
    end_date: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    setExperienceData({ ...experienceData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const validateForm = () => {
    const { start_date, end_date } = experienceData;
    const currentDate = new Date();
    const startDateObj = start_date ? new Date(start_date) : null;
    const endDateObj = end_date ? new Date(end_date) : null;

    if (start_date && (startDateObj > currentDate || startDateObj.getFullYear() < 1900)) {
      return 'Start date must be between 1900 and today.';
    }
    if (end_date && (endDateObj > currentDate || endDateObj.getFullYear() < 1900)) {
      return 'End date must be between 1900 and today.';
    }
    if (start_date && end_date && startDateObj > endDateObj) {
      return 'Start date cannot be later than end date.';
    }
    return null;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post('http://localhost:5000/api/profile/work-experience', experienceData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status >= 200 && response.status < 300) {
        setSuccess('Experience added successfully!');
        onAdded();
        setTimeout(() => closeModal(), 1000);
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error('Failed to add experience:', error);
      setError(error.response?.data?.message || 'Failed to add experience. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-6 bg-gray-800/90 backdrop-blur-lg rounded-2xl">
      {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
      {success && <p className="text-green-400 text-sm font-medium">{success}</p>}
      <div>
        <label className="block text-gray-100 text-sm font-medium mb-1">Company Name</label>
        <input
          name="company_name"
          placeholder="Enter company name"
          value={experienceData.company_name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 bg-gray-900/50 text-gray-100 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500/50 transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-gray-100 text-sm font-medium mb-1">Job Title</label>
        <input
          name="job_title"
          placeholder="Enter job title"
          value={experienceData.job_title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 bg-gray-900/50 text-gray-100 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500/50 transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-gray-100 text-sm font-medium mb-1">Start Date</label>
        <input
          name="start_date"
          type="date"
          value={experienceData.start_date}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 bg-gray-900/50 text-gray-100 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500/50 transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-gray-100 text-sm font-medium mb-1">End Date (optional)</label>
        <input
          name="end_date"
          type="date"
          value={experienceData.end_date}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-gray-900/50 text-gray-100 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500/50 transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-gray-100 text-sm font-medium mb-1">Job Description</label>
        <textarea
          name="description"
          placeholder="Enter job description"
          value={experienceData.description}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-gray-900/50 text-gray-100 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500/50 transition-all duration-200 min-h-[100px]"
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-blue-600/90 hover:bg-blue-500 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Adding...' : 'Add Experience'}
      </button>
    </form>
  );
};

export default AddExperienceForm;