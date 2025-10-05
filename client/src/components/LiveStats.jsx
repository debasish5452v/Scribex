import React, { useState, useEffect } from 'react';
import { TrendingUp, FileText, Image, Users } from 'lucide-react';

const LiveStats = () => {
  /*
    LiveStats component displays animated live statistics showing platform activity.
    Features:
    - Real-time animated counters that count up to target values
    - Four key metrics: Articles Generated, Images Created, Active Users, Total Creations
    - Smooth number animations for engaging user experience
    - Responsive grid layout for all screen sizes
  */

  // Base numbers for statistics (these could come from your API in production)
  const baseStats = {
    articles: 12847,
    images: 8923,
    users: 10234,
    totalCreations: 21770
  };

  // State to track animated counter values
  const [stats, setStats] = useState({
    articles: 0,
    images: 0,
    users: 0,
    totalCreations: 0
  });

  // Simulate live updates with random increments
  useEffect(() => {
    // Animate counters on mount
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        articles: Math.floor(baseStats.articles * progress),
        images: Math.floor(baseStats.images * progress),
        users: Math.floor(baseStats.users * progress),
        totalCreations: Math.floor(baseStats.totalCreations * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(baseStats); // Ensure final values are exact
      }
    }, interval);

    // Simulate live updates every 5 seconds
    const liveUpdate = setInterval(() => {
      setStats(prev => ({
        articles: prev.articles + Math.floor(Math.random() * 5),
        images: prev.images + Math.floor(Math.random() * 3),
        users: prev.users + Math.floor(Math.random() * 2),
        totalCreations: prev.totalCreations + Math.floor(Math.random() * 8)
      }));
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(liveUpdate);
    };
  }, []);

  // Format numbers with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  const statsData = [
    {
      icon: FileText,
      label: 'Articles Generated',
      value: stats.articles,
      suffix: '+',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      iconColor: 'text-white'
    },
    {
      icon: Image,
      label: 'Images Created',
      value: stats.images,
      suffix: '+',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      iconColor: 'text-white'
    },
    {
      icon: Users,
      label: 'Active Users',
      value: stats.users,
      suffix: '+',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      iconColor: 'text-white'
    },
    {
      icon: TrendingUp,
      label: 'Total Creations',
      value: stats.totalCreations,
      suffix: '+',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      iconColor: 'text-white'
    }
  ];

  return (
    <div className="w-full px-4 sm:px-20 xl:px-32 py-12 sm:py-16 bg-white">
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
          <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-primary"></span>
          </span>
          Live Statistics
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
          Trusted by Thousands Daily
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed px-2">
          Join a growing community of content creators using Scribex to transform their ideas into reality
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="relative group"
          >
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {/* Icon */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 sm:mb-4`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
              </div>
              
              {/* Value */}
              <div className="mb-1 sm:mb-2">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  {formatNumber(stat.value)}
                </span>
                <span className={`text-lg sm:text-xl md:text-2xl font-bold ${stat.textColor}`}>
                  {stat.suffix}
                </span>
              </div>
              
              {/* Label */}
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 font-medium">
                {stat.label}
              </p>
              
              {/* Live indicator dot */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${stat.textColor} opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 ${stat.textColor}`}></span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom text */}
      <div className="text-center mt-6 sm:mt-8 text-[10px] sm:text-xs md:text-sm text-gray-500">
        <p>📊 Real-time statistics • {formatNumber(Math.floor(stats.articles / 30))}+ articles generated today</p>
      </div>
    </div>
  );
};

export default LiveStats;
