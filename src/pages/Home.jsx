import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Clock, DollarSign, Users, Calendar, Award, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import JobModal from '../components/modal/JobModal';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '../API/axiosInstance';
import JobSkeleton from '../components/skeleton/JobSkeleton';
import ErrorFallback from '../components/skeleton/ErrorFallBack';

// Counter component with animation
const CounterCard = ({ end, label, color, suffix }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      let startTime = null;
      const duration = 2000; // 2 seconds

      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isVisible, end]);

  return (
    <div 
      ref={ref}
      className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
    >
      <div className={`text-3xl font-bold ${color} mb-2`}>
        {count}{suffix}
      </div>
      <div className="text-slate-600">{label}</div>
    </div>
  );
};

const Home = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  let logo = "💼";

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedJob(null), 300);
  };

  const { data: jobs = [], isError, isLoading } = useQuery({
    queryFn: async () => {
      const res = await axiosInstance.get(`/job/getAll`);
      return res.data?.data;
    }
  });

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
          <CounterCard 
            end={jobs?.length || 100} 
            label="Active Jobs" 
            color="text-blue-600" 
            suffix={jobs?.length<100?'':'+'}
          />
          <CounterCard 
            end={200} 
            label="Companies" 
            color="text-indigo-600" 
            suffix="+"
          />
          <CounterCard 
            end={10} 
            label="Candidates" 
            color="text-purple-600" 
            suffix="k+"
          />
        </div>
      </section>

      {isLoading && <JobSkeleton />}
      {isError && <ErrorFallback />}
      
      {!isLoading && !isError && (
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <h3 className="text-3xl font-bold text-slate-800 mb-8">Featured Jobs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job?._id}
                onClick={() => handleJobClick(job)}
                className={`group bg-white rounded-2xl p-6 cursor-pointer border-2 ${
                  selectedJob?.id === job?.id 
                    ? 'border-blue-500 shadow-xl scale-105' 
                    : 'border-transparent hover:border-blue-200'
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
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
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {showModal && selectedJob && (
        <JobModal job={selectedJob} onClose={closeModal} />
      )}
    </div>
  );
};

export default Home;