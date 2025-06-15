import React from 'react';
import { MetaData } from '../components/MetaData';

const Card = ({ title, children, accentColor = 'yellow-500' }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
    <h2 className={`text-2xl md:text-3xl font-bold text-${accentColor} mb-4 text-center`}>
      {title}
    </h2>
    {children}
  </div>
);

export const About = () => {
  return (
    <>
      <MetaData title="About" />
      <section className="bg-gray-950 min-h-screen py-16 md:py-20 px-4 sm:px-6 lg:px-20 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-300 mb-12 animate-fade-in">
            About Us
          </h1>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <Card title="Our Mission">
              <p className="text-gray-300 leading-relaxed">
                At SIRA, we're your partners in professional growth. Our mission is to connect talented individuals with exceptional opportunities that elevate careers and enrich lives. Whether you're a recent graduate or a seasoned professional, we're here to guide your journey.
              </p>
            </Card>
            
            <Card title="What Sets Us Apart" accentColor="yellow-400">
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <div>
                    <span className="font-semibold">Tailored Matches:</span> Our advanced algorithms ensure your skills perfectly align with your desired roles, saving you time and effort.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <div>
                    <span className="font-semibold">Exceptional Support:</span> Our dedicated team supports you from profile optimization to interview preparation.
                  </div>
                </li>
              </ul>
            </Card>
            
            <Card title="Join Our Community" accentColor="yellow-400">
              <p className="text-gray-300 leading-relaxed mb-4">
                SIRA is more than a platform—it's a vibrant community of professionals, recruiters, and mentors shaping the future of work. Join us to unlock endless possibilities.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Thank you for choosing SIRA as your career partner. Let's achieve greatness together!
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
