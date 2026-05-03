import React, { useState } from 'react';
import { X } from 'lucide-react';

const PostForm = ({ post = null, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    company: post?.company || '',
    description: post?.description || '',
    location: post?.location || '',
    type: post?.type || 'Part-time',
    salary: post?.salary || '',
    requiredSkills: post?.requiredSkills || [],
    experienceLevel: post?.experienceLevel || 'Intermediate',
    tags: post?.tags || [],
    timeCommitment: post?.timeCommitment || 'Part-time',
    status: post?.status || 'draft',
    ...post,
  });

  const [skillInput, setSkillInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !formData.requiredSkills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        requiredSkills: [...formData.requiredSkills, skillInput.trim()],
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      requiredSkills: formData.requiredSkills.filter(s => s !== skill),
    });
  };

  const addTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{post ? 'Edit Post' : 'Create New Post'}</h2>
        {onCancel && (
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              required
              className="input-field"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Frontend Developer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company/Organization *
            </label>
            <input
              type="text"
              name="company"
              required
              className="input-field"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            required
            rows="4"
            className="input-field"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the job opportunity..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <input
              type="text"
              name="location"
              required
              className="input-field"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Remote, New York, Hybrid"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Type *
            </label>
            <select
              name="type"
              required
              className="input-field"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Part-time">Part-time</option>
              <option value="Full-time">Full-time</option>
              <option value="Project-based">Project-based</option>
              <option value="Competition">Competition</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salary/Compensation
            </label>
            <input
              type="text"
              name="salary"
              className="input-field"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g., $20-30/hour"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Commitment *
            </label>
            <select
              name="timeCommitment"
              required
              className="input-field"
              value={formData.timeCommitment}
              onChange={handleChange}
            >
              <option value="Part-time">Part-time</option>
              <option value="Full-time">Full-time</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience Level *
          </label>
          <select
            name="experienceLevel"
            required
            className="input-field"
            value={formData.experienceLevel}
            onChange={handleChange}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Required Skills
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              className="input-field flex-1"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill(e)}
              placeholder="Type skill and press Enter"
            />
            <button
              type="button"
              onClick={addSkill}
              className="btn-secondary"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.requiredSkills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-primary-600 hover:text-primary-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              className="input-field flex-1"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag(e)}
              placeholder="Type tag and press Enter"
            />
            <button
              type="button"
              onClick={addTag}
              className="btn-secondary"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-gray-600 hover:text-gray-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            name="action"
            value="draft"
            onClick={() => setFormData({ ...formData, status: 'draft' })}
            className="btn-secondary"
            disabled={loading}
          >
            Save as Draft
          </button>
          <button
            type="submit"
            name="action"
            value="publish"
            onClick={() => setFormData({ ...formData, status: 'open' })}
            className="btn-primary flex-1"
            disabled={loading}
          >
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

