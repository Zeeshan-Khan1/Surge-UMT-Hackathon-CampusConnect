// Smart matching system for job recommendations
export const calculateMatchScore = (userProfile, jobPost) => {
  let score = 0;
  let maxScore = 100;

  // Skills match (40 points)
  if (userProfile.skills && jobPost.requiredSkills) {
    const userSkills = userProfile.skills.map(s => s.toLowerCase());
    const requiredSkills = jobPost.requiredSkills.map(s => s.toLowerCase());
    const matchedSkills = requiredSkills.filter(skill => 
      userSkills.some(us => us.includes(skill) || skill.includes(us))
    );
    score += (matchedSkills.length / requiredSkills.length) * 40;
  }

  // Experience level match (20 points)
  if (userProfile.experienceLevel && jobPost.experienceLevel) {
    const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
    const userLevel = levels.indexOf(userProfile.experienceLevel.toLowerCase());
    const jobLevel = levels.indexOf(jobPost.experienceLevel.toLowerCase());
    
    if (userLevel >= jobLevel) {
      score += 20;
    } else {
      // Partial credit for being close
      score += (20 * (userLevel + 1) / (jobLevel + 1));
    }
  }

  // Interests match (20 points)
  if (userProfile.interests && jobPost.tags) {
    const userInterests = userProfile.interests.map(i => i.toLowerCase());
    const jobTags = jobPost.tags.map(t => t.toLowerCase());
    const matched = jobTags.filter(tag => userInterests.includes(tag));
    score += (matched.length / Math.max(jobTags.length, 1)) * 20;
  }

  // Location match (10 points)
  if (userProfile.location && jobPost.location) {
    if (userProfile.location.toLowerCase() === jobPost.location.toLowerCase()) {
      score += 10;
    } else if (
      userProfile.location.toLowerCase().includes(jobPost.location.toLowerCase()) ||
      jobPost.location.toLowerCase().includes(userProfile.location.toLowerCase())
    ) {
      score += 5;
    }
  }

  // Availability match (10 points)
  if (userProfile.availability && jobPost.timeCommitment) {
    const availability = userProfile.availability.toLowerCase();
    const timeCommitment = jobPost.timeCommitment.toLowerCase();
    
    if (
      (availability === 'full-time' && timeCommitment === 'full-time') ||
      (availability === 'part-time' && (timeCommitment === 'part-time' || timeCommitment === 'flexible')) ||
      (availability === 'flexible')
    ) {
      score += 10;
    }
  }

  return Math.min(Math.round(score), maxScore);
};

export const getRecommendedJobs = (userProfile, allJobs, limit = 5) => {
  const jobsWithScores = allJobs.map(job => ({
    ...job,
    matchScore: calculateMatchScore(userProfile, job),
  }));

  return jobsWithScores
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
};

