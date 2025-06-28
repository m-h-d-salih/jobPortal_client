// src/components/PostJobModal.jsx
import React from 'react';
import { X } from 'lucide-react';

const PostJobModal = ({
  isOpen,
  onClose,
  newJob,
  onInputChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 opacity-100"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full transition-all duration-300 transform scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Post a New Job</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {['title', 'company', 'location'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-slate-700 mb-2 capitalize">
                {field}
              </label>
              <input
                type="text"
                value={newJob[field]}
                onChange={(e) => onInputChange(field, e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
            <textarea
              value={newJob.description}
              onChange={(e) => onInputChange('description', e.target.value)}
              rows="4"
              className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Describe the job role and responsibilities..."
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              onClick={onSubmit}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Post Job
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-slate-300 text-slate-600 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobModal;
