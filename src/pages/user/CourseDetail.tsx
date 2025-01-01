import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Users, BookOpen, Play, CheckCircle, BarChart2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import PageTransition from '../../components/animations/PageTransition';
import FadeIn from '../../components/animations/FadeIn';
import SlideIn from '../../components/animations/SlideIn';
import SEO from '../../components/SEO';

export default function UserCourseDetail() {
  // ... existing state

  return (
    <PageTransition>
      <SEO 
        title={`${course.title} - Learning Platform`}
        description={`Learn ${course.title} through interactive lessons and practical examples. Track your progress and master new skills.`}
        keywords="online course, e-learning, interactive lessons, skill development"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FadeIn>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            {/* ... Course Header Content ... */}
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-8">
          <SlideIn direction="left" className="lg:col-span-3">
            {/* ... Left Sidebar Content ... */}
          </SlideIn>

          <FadeIn delay={0.2} className="lg:col-span-6">
            {/* ... Main Content Area ... */}
          </FadeIn>

          <SlideIn direction="right" delay={0.3} className="lg:col-span-3">
            {/* ... Right Sidebar Content ... */}
          </SlideIn>
        </div>
      </div>
    </PageTransition>
  );
}