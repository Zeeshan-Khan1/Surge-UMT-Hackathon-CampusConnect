import React, { useState } from 'react';
import { User, Mail, MessageCircle, CheckCircle, XCircle, Star } from 'lucide-react';
import ChatBox from './ChatBox';

const ApplicantList = ({ applicants = [], postId }) => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  // Dummy data if no applicants provided
  const displayApplicants = applicants.length > 0 ? applicants : [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'pending',
      matchScore: 85,
      appliedAt: new Date(Date.now() - 86400000),
      resume: 'https://example.com/resume.pdf',
      message: 'I am very interested in this position and believe I am a great fit.',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'shortlisted',
      matchScore: 92,
      appliedAt: new Date(Date.now() - 172800000),
      resume: 'https://example.com/resume2.pdf',
      message: 'I have extensive experience in this field and would love to contribute.',
    },
  ];

  const handleStatusChange = (applicantId, newStatus) => {
    // Update status in Firestore
    // await updateDoc(doc(db, 'applications', applicantId), { status: newStatus });
    console.log(`Updating status for ${applicantId} to ${newStatus}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'shortlisted':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Applicants ({displayApplicants.length})</h2>
      
      {displayApplicants.map((applicant) => (
        <div key={applicant.id} className="card">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{applicant.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                    {applicant.status}
                  </span>
                  {applicant.matchScore && (
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-semibold">{applicant.matchScore}% Match</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  {applicant.email}
                </div>
                <p className="text-gray-700 text-sm mb-3">{applicant.message}</p>
                <div className="text-xs text-gray-500">
                  Applied {new Date(applicant.appliedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            {applicant.resume && (
              <a
                href={applicant.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
              >
                View Resume
              </a>
            )}
            <button
              onClick={() => {
                setSelectedApplicant(applicant);
                setChatOpen(true);
              }}
              className="btn-secondary text-sm flex items-center"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Message
            </button>
            <div className="flex gap-2 ml-auto">
              {applicant.status !== 'shortlisted' && (
                <button
                  onClick={() => handleStatusChange(applicant.id, 'shortlisted')}
                  className="btn-secondary text-sm flex items-center text-blue-600"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Shortlist
                </button>
              )}
              {applicant.status !== 'accepted' && applicant.status !== 'rejected' && (
                <button
                  onClick={() => handleStatusChange(applicant.id, 'rejected')}
                  className="btn-secondary text-sm flex items-center text-red-600"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </button>
              )}
              {applicant.status === 'shortlisted' && (
                <button
                  onClick={() => handleStatusChange(applicant.id, 'accepted')}
                  className="btn-primary text-sm"
                >
                  Accept
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {chatOpen && selectedApplicant && (
        <ChatBox
          chatId={`${postId}_${selectedApplicant.id}`}
          recipient={selectedApplicant}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
  );
};

export default ApplicantList;

