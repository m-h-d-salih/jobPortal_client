import React from 'react';
import { Plus } from 'lucide-react';

export default function PostJobButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
    >
      <Plus className="w-5 h-5" />
      <span>Post a Job</span>
    </button>
  );
}