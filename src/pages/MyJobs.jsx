import React, { use, useState } from 'react';
import { X, MapPin, Clock, DollarSign, Users, Calendar, Award, CheckCircle, Plus, Trash2 } from 'lucide-react';
import PostJobModal from '../components/modal/PostJobModal';
import JobModal from '../components/modal/JobModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '../API/axiosInstance';
import toast from 'react-hot-toast';
import PostJobButton from '../components/button/PostJobButton';

const MyJobs = () => {
    const userId=localStorage.getItem('user')
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    description: ''
  });

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };
const mutation=useMutation({mutationFn:async(values)=>{
 const res=await axiosInstance.post(`/job/create`,values);
 return res.data;
}
,
onSuccess:()=>{
    toast.success(`Job added successfully`)
},
onError:(error)=>{
    console.log(error)
    toast.error(`error`)
}
})
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedJob(null), 300);
  };
const deletemn=useMutation({mutationFn:async(jobId)=>{
 const res=await axiosInstance.put(`/job/delete/${jobId}`)
 return res.data
},
onSuccess:()=>{
    toast.success(`job deleted successfully`)
},
onError:(error)=>{
    const {message='job cant be deleted'}=error
    toast.error(message)
}
})

  const handleDeleteJob = async(jobId, e) => {
    e.stopPropagation(); // Prevent opening the job modal
   deletemn.mutate(jobId)
  };

  const handlePostJob = () => {
    if (newJob.title && newJob.company && newJob.location && newJob.description) {
      const job = {
        userId,
        name: newJob.title,
        company: newJob.company,
        location: newJob.location,
        description: newJob.description,
        
      };
      
      mutation.mutate(job);
      setShowPostModal(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewJob(prev => ({ ...prev, [field]: value }));
  };
  const {data:jobs=[],isError,isLoading}=useQuery({queryFn:async()=>{
   const res= await axiosInstance.get(`/job/getAllByUser`);
     return res.data?.data; 
  },queryKey:['jobs',mutation,deletemn

  ]})
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-bold text-slate-800">My Jobs</h3>
           <PostJobButton onClick={() => setShowPostModal(true)} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
          {jobs.map((job) => (
            <div
              key={job._id}
              onClick={() => handleJobClick(job)}
              className={`group bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 relative ${
                selectedJob?._id === job._id 
                  ? 'border-blue-500 shadow-xl scale-105' 
                  : 'border-transparent hover:border-blue-200'
              }`}
            >
              <button
                onClick={(e) => handleDeleteJob(job._id, e)}
                className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-2xl">
                    {"💼"}
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
          ))}
        </div>
      </section>

      

        {showModal && selectedJob && (
  <JobModal job={selectedJob} onClose={closeModal} />
)}
            <PostJobModal
  isOpen={showPostModal}
  onClose={() => setShowPostModal(false)}
  newJob={newJob}
  onInputChange={handleInputChange}
  onSubmit={handlePostJob}
/>
    </div>
  );
};

export default MyJobs;