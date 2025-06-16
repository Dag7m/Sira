import React, { useState, useEffect } from 'react'
import { MetaData } from '../components/MetaData'
import { Sidebar } from '../components/Sidebar'
import { AiOutlineDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCompaniesAdmin, addCompanyData, deleteCompanyData } from '../actions/AdminActions'
import { Loader } from '../components/Loader'
import { RxCross1 } from 'react-icons/rx'

export const AllCompanies = () => {
  const dispatch = useDispatch();
  const { loading, allCompanies } = useSelector((state) => state.admin);
  const [sideTog, setSideTog] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');

  useEffect(() => {
    dispatch(getAllCompaniesAdmin());
  }, []);

  const handleAddCompany = (e) => {
    e.preventDefault();
    dispatch(addCompanyData({ name: companyName, description: companyDescription }));
    setCompanyName('');
    setCompanyDescription('');
  };

  const deleteCompanyHandler = (id) => {
    dispatch(deleteCompanyData(id));
  };

  return (
    <>
      <MetaData title="All Companies" />
      <div className='bg-gray-950 min-h-screen pt-14 md:px-20 px-3 text-white'>
        {loading ? <Loader /> :
          <div>
            <div className="pt-1 fixed left-0 z-20 pl-0">
              <div onClick={() => setSideTog(!sideTog)} className='cursor-pointer blueCol px-3 py-2'>
                {!sideTog ? "Menu" : <RxCross1 />}
              </div>
            </div>

            <Sidebar sideTog={sideTog} />
            <div>
              <p className='text-center pt-3 pb-4 text-3xl font-medium'>All Companies</p>
            </div>

            <div className='mb-8'>
              <form onSubmit={handleAddCompany} className='flex flex-col gap-4 max-w-md mx-auto'>
                <div>
                  <label className='block text-sm font-medium'>Company Name</label>
                  <input
                    type='text'
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className='mt-1 block w-full bg-gray-800 border border-gray-700 rounded py-2 px-3 text-white'
                    placeholder='Enter company name'
                    required
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium'>Description</label>
                  <input
                    type='text'
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                    className='mt-1 block w-full bg-gray-800 border border-gray-700 rounded py-2 px-3 text-white'
                    placeholder='Enter company description'
                    required
                  />
                </div>
                <button
                  type='submit'
                  className='blueCol px-4 py-2 rounded hover:bg-blue-600'
                >
                  Add Company
                </button>
              </form>
            </div>

            <div className="relative pb-24 overflow-x-auto shadow-md">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-200 uppercase blueCol dark:text-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-3">Company ID</th>
                    <th scope="col" className="px-6 py-3">Company Name</th>
                    <th scope="col" className="px-6 py-3">Description</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allCompanies && allCompanies.filter(company => company.id)
                    .sort((a, b) => {
                      const dateA = new Date(a.created_at);
                      const dateB = new Date(b.created_at);
                      return dateB - dateA;
                    }).map((company) => (
                      <tr key={company.id} className="border-b hover:bg-gray-900 bg-gray-950 border-gray-700 text-white">
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                          {company.id}
                        </th>
                        <td className="px-6 py-4">{company.name}</td>
                        <td className="px-6 py-4">{company.description}</td>
                        <td className="px-6 py-4">
                          <span className='text-red-500 hover:text-red-400 cursor-pointer'>
                            <AiOutlineDelete onClick={() => deleteCompanyHandler(company.id)} size={20} />
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        }
      </div>
    </>
  );
};