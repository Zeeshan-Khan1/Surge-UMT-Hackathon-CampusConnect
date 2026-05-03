import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Briefcase, 
  Users, 
  Zap, 
  ArrowRight,
  Star,
  CheckCircle,
  TrendingUp,
  MessageCircle,
  Shield,
  Rocket
} from 'lucide-react';

const LandingPage = () => {
  const { currentUser, userRole } = useAuth();

  const features = [
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: 'Find Opportunities',
      description: 'Discover part-time jobs, startups, projects, and competitions tailored to your skills and interests.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: 'Connect Top Talent',
      description: 'Find the perfect students for your projects, startups, or competitions in seconds.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: 'Smart Matching',
      description: 'Our AI-powered algorithm matches you with opportunities that perfectly fit your profile.',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: 'Real-time Analytics',
      description: 'Track your progress with detailed analytics and performance metrics in real-time.',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: <MessageCircle className="w-10 h-10" />,
      title: 'Direct Messaging',
      description: 'Connect instantly with employers or candidates through our integrated chat system.',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: 'Secure Platform',
      description: 'Your data is protected with enterprise-grade security and privacy measures.',
      gradient: 'from-indigo-500 to-indigo-600'
    },
  ];

  const stats = [
    { number: '5000+', label: 'Active Users' },
    { number: '2000+', label: 'Job Opportunities' },
    { number: '95%', label: 'Match Success Rate' },
    { number: '24/7', label: 'Support Available' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CampusConnect
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="hover:text-blue-400 transition">Features</a>
              <a href="#stats" className="hover:text-blue-400 transition">About</a>
              <a href="#cta" className="hover:text-blue-400 transition">Contact</a>
            </div>
            <div className="flex items-center space-x-3">
              {currentUser ? (
                <Link
                  to={`/${userRole === 'finder' ? 'finder' : 'seeker'}/dashboard`}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-white font-medium transition">
                    Login
                  </Link>
                  <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Background elements */}
          <div className="absolute top-20 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute top-40 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full">
                  <span className="text-sm font-semibold text-blue-300">✨ Welcome to the Future of Talent</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                  Connect. Collaborate. Succeed.
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  The ultimate platform connecting university talent with exciting opportunities. Find your next great job, project, or team member in seconds.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Start Exploring <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="px-8 py-4 border-2 border-purple-400 text-purple-300 rounded-xl font-semibold text-lg hover:bg-purple-400/10 transition">
                  Learn More
                </button>
              </div>

              <div className="flex gap-8 pt-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Free to Join</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>AI-Powered Matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-50"></div>
                  <div className="h-32 bg-slate-700 rounded-lg opacity-50"></div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-16 bg-slate-700 rounded-lg opacity-50"></div>
                    <div className="h-16 bg-slate-700 rounded-lg opacity-50"></div>
                    <div className="h-16 bg-slate-700 rounded-lg opacity-50"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-y border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Built for You</span>
            </h2>
            <p className="text-xl text-gray-400">Everything you need to succeed in your career journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-8 hover:border-slate-600 transition hover:shadow-2xl hover:shadow-slate-900/50"
              >
                <div className={`inline-block p-3 bg-gradient-to-r ${feature.gradient} rounded-lg text-white mb-4 group-hover:scale-110 transition`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"></div>
            <div className="relative z-10 space-y-6">
              <Rocket className="w-16 h-16 mx-auto" />
              <h2 className="text-4xl font-bold">Ready to Transform Your Career?</h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join thousands of students and employers already using CampusConnect to find their perfect match.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  Create Free Account
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white/20 border-2 border-white rounded-xl font-semibold text-lg hover:bg-white/30 transition"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="w-6 h-6 text-blue-400" />
                <span className="font-bold text-lg">CampusConnect</span>
              </div>
              <p className="text-gray-400">Connecting talent with opportunity</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CampusConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
