import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FEATURES } from '../constants';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 overflow-y-auto">
      {/* Hero Section */}
      <div className="px-8 py-12 text-center">
        <h1 className="text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Welcome to NeuralFlow
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Build, deploy, and manage intelligent applications with powerful automation tools
        </p>
      </div>

      {/* Features Grid */}
      <div className="px-8 pb-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {FEATURES.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <button
                key={feature.title}
                onClick={() => navigate(feature.href)}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6 text-left transition-all duration-300 hover:shadow-lg hover:border-primary-400 dark:hover:border-primary-500"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                {/* Icon */}
                <div className={`relative mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color}`}>
                  <IconComponent size={24} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="relative text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  {feature.title}
                </h3>
                <p className="relative text-sm text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>

                {/* Arrow indicator */}
                <div className="relative mt-4 flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore →
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
