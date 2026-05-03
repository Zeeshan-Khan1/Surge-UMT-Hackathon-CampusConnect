import React from 'react';
import { MapPin, Clock, DollarSign, Eye, Users, Star } from 'lucide-react';

const JobCard = ({ job, matchScore = null, showActions = true, onApply = null, onSave = null, isSaved = false }) => {
  return (
    <div className="card hover:shadow-xl transition-all duration-300 animate-slide-up">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
          <p className="text-gray-600 mb-2">{job.company}</p>
          <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-3">
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {job.location}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {job.type}
            </span>
            {job.salary && (
              <span className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                {job.salary}
              </span>
            )}
          </div>
        </div>
        {matchScore !== null && (
          <div className="ml-4 text-right">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
              <Star className="w-4 h-4 mr-1" />
              {matchScore}% Match
            </div>
          </div>
        )}
      </div>

      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.requiredSkills?.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs"
          >
            {skill}
          </span>
        ))}
        {job.requiredSkills?.length > 4 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
            +{job.requiredSkills.length - 4} more
          </span>
        )}
      </div>

      {showActions && (
        <div className="flex gap-2 pt-4 border-t">
          {onApply && (
            <button onClick={() => onApply(job)} className="btn-primary flex-1">
              Apply Now
            </button>
          )}
          {onSave && (
            <button
              onClick={() => onSave(job)}
              className={`btn-secondary ${isSaved ? 'bg-primary-100 text-primary-700' : ''}`}
            >
              {isSaved ? 'Saved' : 'Save'}
            </button>
          )}
        </div>
      )}

      {!showActions && (
        <div className="flex gap-4 text-sm text-gray-500 pt-4 border-t">
          <span className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            {job.views || 0} views
          </span>
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {job.applications || 0} applications
          </span>
        </div>
      )}
    </div>
  );
};

export default JobCard;

