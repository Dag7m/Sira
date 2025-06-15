import React, { useState } from 'react';
import axios from 'axios';

const AddEducationForm = ({ onAdded }) => {
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    start_year: '',
    end_year: '',
    field_of_study: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      await axios.post('http://localhost:5000/api/profile/education', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onAdded(); // refetch educations
    } catch (error) {
      console.error("Failed to add education:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="institution" placeholder="Institution" onChange={handleChange} required />
      <input name="degree" placeholder="Degree" onChange={handleChange} required />
      <input name="start_year" type="number" placeholder="Start Year" onChange={handleChange} required />
      <input name="end_year" type="number" placeholder="End Year" onChange={handleChange} />
      <input name="field_of_study" placeholder="Field of Study" onChange={handleChange} required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Education</button>
    </form>
  );
};

export default AddEducationForm;
