import React from 'react';
import {
  MapPin, Calendar,  X
} from 'lucide-react';
import { useState } from 'react';
import dayjs from 'dayjs'; 

const JobModal = ({ job, onClose }) => {
  if (!job) return null;
 const [jobs, setJobs] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('jobs')) || [];
  } catch {
    return [];
  }
});
const saveJob=()=>{
    const check=jobs.find(item=>item._id===job._id);
    if(!check){
        setJobs([...jobs,job]);
localStorage.setItem('jobs',JSON.stringify([...jobs,job]));
    }
}
const isSaved=(id)=>{
   
    return jobs?.find(item=>item._id===id)
    
}
 const formattedDate = dayjs(job?.createdAt).format('MMM D, YYYY');
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 transform scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 rounded-t-3xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-3xl">
                {"💼"}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{job.name}</h3>
                <p className="text-slate-600">{job.company}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
         

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-slate-800 mb-3">Job Description</h4>
            <p className="text-slate-600 leading-relaxed">{job.description}</p>
          </div>

          <div className="flex space-x-4">
            
           {isSaved(job._id) ? (
  <button
    disabled
    className="px-6 py-3 border-2 border-slate-300 text-gray-400 rounded-xl font-semibold bg-slate-100 cursor-not-allowed"
  >
    This job is saved
  </button>
) : (
  <button
    onClick={saveJob}
    className="px-6 py-3 border-2 border-slate-300 text-slate-600 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-colors"
  >
    Save Job
  </button>
)}
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
