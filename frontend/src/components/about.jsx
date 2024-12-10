import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Hero Section with Image */}
      <section className="bg-[#6A38C2] text-white py-16 relative">
        <div className="container mx-auto text-center px-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-6">
            Passion International is dedicated to bridging the gap between job seekers and recruiters across the globe. 
            Our platform offers a wide range of opportunities, helping you find the best talent or your next career path.
          </p>
          <Link to="/" className="inline-block py-2 px-6 bg-[#F83002] hover:bg-[#D52D1A] rounded-full text-white text-lg">
            Explore Opportunities
          </Link>
        </div>
        {/* Image added to Hero Section */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/1.jpg" // Replace with the correct image path
            alt="Hero Image"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto">
            At Passion International, we are committed to empowering individuals and businesses by providing a platform
            that helps talent connect with the right opportunities. We strive to create an inclusive and diverse community
            where both employers and job seekers thrive.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto">
            Our vision is to become the leading global platform for job seekers and recruiters, offering unmatched
            tools and opportunities for career growth. We aim to make the hiring process smoother and more efficient for
            both recruiters and candidates.
          </p>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src="/Sunil.jpeg"
                alt="Sunil Kumar - CEO & Founder"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Sunil Kumar</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src="/1.jpeg"
                alt="Abhishek Pal - Co-Founder & CTO"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Abhishek Pal</h3>
              <p className="text-gray-600">Co-Founder & CTO</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src="/Amnesh.jpeg"
                alt="Amnesh - Developer"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Amnesh</h3>
              <p className="text-gray-600">Developer, Operations Head </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#F5F5F5] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Get in Touch</h2>
          <p className="text-lg sm:text-xl mb-8">We’d love to hear from you! Reach out to us for any inquiries or feedback.</p>
          <Link
            to="/contact"
            className="inline-block py-2 px-6 bg-[#6A38C2] hover:bg-[#5b30a6] rounded-full text-white text-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
