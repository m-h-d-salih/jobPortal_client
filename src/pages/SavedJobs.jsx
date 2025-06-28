import React, { useState } from 'react';
import { X, MapPin, Clock, DollarSign, Users, Calendar, Award, CheckCircle } from 'lucide-react';
import JobModal from '../components/modal/JobModal';

const SavedJobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);


  
 const [jobs, setJobs] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('jobs')) || [];
  } catch {
    return [];
  }
});
  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedJob(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">


      

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <h3 className="text-3xl font-bold text-slate-800 mb-8">Saved Jobs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {Array.isArray(jobs) && jobs.length > 0 ? (
  jobs.map((job) => (
    <div
      key={job._id}
      onClick={() => handleJobClick(job)}
      className={`group bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 ${
        selectedJob?._id === job._id
          ? 'border-blue-500 shadow-xl scale-105'
          : 'border-transparent hover:border-blue-200'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-2xl">
            💼
          </div>
          <div>
            <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              {job.name}
            </h4>
            <p className="text-slate-600 text-sm">{job.company}</p>
          </div>
        </div>
      </div>

      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
      </div>
    </div>
  ))
) : (
  <div className="col-span-full text-center py-20">
    <h1 className="text-2xl font-semibold text-slate-700 mb-2">
      No Saved Jobs Found
    </h1>
    <p className="text-slate-500">You haven’t saved any jobs yet. Go explore and save one!</p>
  </div>
)}

        </div>
      </section>

      {showModal && selectedJob && (
  <JobModal job={selectedJob} onClose={closeModal} />
)}
    </div>
  );
};

export default SavedJobs;