import React, { useState } from 'react';
import axios from 'axios';

const AddEducationForm = ({ onAdded, closeModal }) => {
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    start_year: '',
    end_year: '',
    field_of_study: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  const validateForm = () => {
    const currentYear = new Date().getFullYear();
    const { start_year, end_year } = formData;

    if (start_year && (start_year < 1900 || start_year > currentYear)) {
      return `Start year must be between 1900 and ${currentYear}.`;
    }
    if (end_year && (end_year < 1900 || end_year > currentYear)) {
      return `End year must be between 1900 and ${currentYear}.`;
    }
    if (start_year && end_year && parseInt(start_year) > parseInt(end_year)) {
      return 'Start year cannot be later than end year.';
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
      const response = await axios.post('http://localhost:5000/api/profile/education', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status >= 200 && response.status < 300) {
        setSuccess('Education added successfully!');
        onAdded();
        setTimeout(() => closeModal(), 1000);
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error("Failed to add education:", error);
      setError(error.response?.data?.message || 'Failed to add education. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-6 bg-gray-800/90 backdrop-blur-lg rounded-2xl">
      {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
      {success && <p className="text-green-400 text-sm font-medium">{success}</p>}
      <div>
        <label className="block text-gray-100 text-sm font-medium mb-1">Institution</label>
        <input
          name="institution"
          placeholder="Enter institution name"
          value={formData.institution}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 bg-gray-900/50 text-gray-100 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500/50 transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-gray-100 text-sm font-medium mb-1">Degree</label>
        <input
          name="degree"
          placeholder="Enter degree (e.g., Bachelor's)"
          value={formData.degree}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 bg-gray-900/50 text-gray-100 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500/50 transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-gray-100 text-sm font-medium mb-1">Start Year</label>
        <input
          name="start_year"
          type="number"
          placeholder="Enter start year"
          value={formData.start_year}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 bg-gray-900/50 text-gray-100 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500/50 transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-gray-100 text-sm font-medium mb-1">End Year (optional)</label>
        <input
          name="end_year"
          type="number"
          placeholder="Enter end year"
          value={formData.end_year}
          onChange={handleChange}
          className="w-full px-4 py-2.5 bg-gray-900/50 text-gray-100 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500/50 transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-gray-100 text-sm font-medium mb-1">Field of Study</label>
        <input
          name="field_of_study"
          placeholder="Enter field of study"
          value={formData.field_of_study}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 bg-gray-900/50 text-gray-100 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500/50 transition-all duration-200"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-blue-600/90 hover:bg-blue-500 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Adding...' : 'Add Education'}
      </button>
    </form>
  );
};

export default AddEducationForm;