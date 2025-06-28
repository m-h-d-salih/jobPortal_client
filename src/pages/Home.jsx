import React, { useState } from 'react';
import { X, MapPin, Clock, DollarSign, Users, Calendar, Award, CheckCircle } from 'lucide-react';
import JobModal from '../components/modal/JobModal';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '../API/axiosInstance';
import JobSkeleton from '../components/skeleton/JobSkeleton';
import ErrorFallback from '../components/skeleton/ErrorFallBack';

const Home = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
let logo= "💼"
  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedJob(null), 300);
  };
  const {data:jobs=[],isError,isLoading}=useQuery({queryFn:async()=>{
   const res= await axiosInstance.get(`/job/getAll`);
     return res.data?.data; 
  }})
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">


      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-slate-800 mb-4">
            Discover Amazing{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Connect with top companies and find the perfect role that matches your skills and ambitions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-bold text-blue-600 mb-2">{jobs?.length || 100}+</div>
            <div className="text-slate-600">Active Jobs</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-bold text-indigo-600 mb-2">200+</div>
            <div className="text-slate-600">Companies</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-bold text-purple-600 mb-2">10k+</div>
            <div className="text-slate-600">Candidates</div>
          </div>
        </div>
      </section>
    {isLoading && <JobSkeleton />}
  {isError && <ErrorFallback />}
  {!isLoading && !isError&&<section className="max-w-7xl mx-auto px-6 pb-12">
        <h3 className="text-3xl font-bold text-slate-800 mb-8">Featured Jobs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job?._id}
              onClick={() => handleJobClick(job)}
              className={`group bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 ${
                selectedJob?.id === job?.id 
                  ? 'border-blue-500 shadow-xl scale-105' 
                  : 'border-transparent hover:border-blue-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-2xl">
                    {logo}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {job?.name}
                    </h4>
                    <p className="text-slate-600 text-sm">{job?.company}</p>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                {job?.description}
              </p>

              <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job?.location}</span>
                </div>
              
              </div>

             
            </div>
          ))}
        </div>
      </section>}
      

      {showModal && selectedJob && (
  <JobModal job={selectedJob} onClose={closeModal} />
)}
    </div>
  );
};

export default Home;