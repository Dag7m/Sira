import React from 'react';
import { MetaData } from '../components/MetaData';
import { BsFacebook } from 'react-icons/bs';
import { AiFillInstagram, AiOutlineTwitter, AiTwotoneMail } from 'react-icons/ai';
import Card from '../components/Card';
import Accordion from '../components/Accordion';

export const Contact = () => {
  return (
    <>
      <MetaData title="Contact" />
      <div className="bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen pt-16 md:pt-20 px-4 sm:px-6 md:px-10 lg:px-20 text-gray-100">
        <div className="flex flex-col gap-8 md:gap-12 max-w-6xl mx-auto pt-6 md:pt-8 pb-16 md:pb-24">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-300 tracking-tight underline underline-offset-8 decoration-4 decoration-gray-500/50 animate-slide-in-down">
              Contact Us
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're excited to hear from you! Have questions, inquiries, or feedback? Reach out using the details below. Your satisfaction is our top priority.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-4 sm:mb-6">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card
                title="Address"
                content="SIRA, 5KILO, Addis Ababa, Ethiopia"
                className="bg-gray-800/70 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-gray-700/50 hover:border-gray-600 hover:shadow-lg transition-all duration-300"
              />
              <Card
                title="Email"
                content={[
                  'General Inquiries: ashenafitsegish@gmail.com',
                  'Support: support@SIRA.com',
                  'Job Applications: jobs@SIRA.com',
                ]}
                className="bg-gray-800/70 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-gray-700/50 hover:border-gray-600 hover:shadow-lg transition-all duration-300"
              />
              <Card
                title="Phone"
                content={['Customer Support: +251967723902']}
                className="bg-gray-800/70 backdrop-blur-sm p-5 sm:p-6 rounded-xl border border-gray-700/50 hover:border-gray-600 hover:shadow-lg transition-all duration-300"
              />
            </div>

            {/* Social Media */}
            <h3 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4">
              Social Media
            </h3>
            <ul className="flex gap-4 sm:gap-6 justify-center sm:justify-start">
              <li>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-700/50 hover:bg-blue-600/50 text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <BsFacebook size={24} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-700/50 hover:bg-pink-500/50 text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <AiFillInstagram size={28} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-700/50 hover:bg-blue-400/50 text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <AiOutlineTwitter size={28} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Email"
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-700/50 hover:bg-red-600/50 text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <AiTwotoneMail size={26} />
                </a>
              </li>
            </ul>
          </div>

          {/* FAQs */}
          <div className="bg-gray-800/30 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-gray-700/40 hover:border-gray-600/60 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-4 sm:mb-6">
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-4">
              <Accordion
                question="How do I create an account on your job application platform?"
                answer="To create an account, click the 'Register' button at the top right corner of the homepage. Fill in your personal information, including your name, email address, and a secure password. Once your account is created, you can start exploring jobs."
                className="bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all duration-300"
              />
              <Accordion
                question="What should I include in my job application?"
                answer="Craft an effective job application with a tailored resume highlighting your relevant experience and skills. Include a cover letter that showcases how your qualifications align with the job requirements."
                className="bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all duration-300"
              />
              <Accordion
                question="How can I check the status of my job application?"
                answer="Log in to your account dashboard to view your submitted applications and their statuses, such as accepted, rejected, or pending."
                className="bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

