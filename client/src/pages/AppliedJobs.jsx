import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const res = await axios.get('http://localhost:5000/api/v1/getAllApplication', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ FIXED: Your controller returns { success, allApplications }
      setApplications(res.data.allApplications);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleViewDetails = (jobId) => {
    navigate(`/details/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 pt-24 py-8">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>
      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div
              key={app.application_id}
              className="bg-gray-800 p-5 rounded shadow-md flex flex-col md:flex-row md:items-center justify-between"
            >
              <div>
                <p className="text-lg font-semibold">{app.job_title}</p>
                <p className="text-sm text-gray-400">Applied on: {new Date(app.created_at).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => handleViewDetails(app.job_id)}
                className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium"
              >
                View Application
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
