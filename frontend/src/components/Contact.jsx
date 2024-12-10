import React, { useState } from "react";
import emailjs from "emailjs-com";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setStatus('All fields are required');
      return;
    }

    // Send email using EmailJS
    emailjs
      .send(
        'service_oyvtca5',  // Your EmailJS Service ID
        'template_h0qftjo',  // Your EmailJS Template ID
        {
          from_name: name,
          from_email: email,  // Send the user's email as the "from_email"
          message: message,
          to_name: 'Amnesh',  // Recipient's Name (you can set this as your name or an admin name)
          reply_to: email,  // This sets the reply-to address to the user's email
        },
        'B_aI9mXWJh3hjIhkV' // Your Public API Key from EmailJS
      )
      .then((response) => {
        setStatus('Message Sent Successfully!');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      })
      .catch((error) => {
        setStatus('An error occurred. Please try again later.');
        console.error(error);
      });
  };

  return (
    <div className="bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Image */}
      <section className="bg-[#6A38C2] text-white py-16 relative">
        <div className="container mx-auto text-center px-4 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-6">
            We're here to help! Feel free to reach out to us for any inquiries, suggestions, or feedback.
          </p>
        </div>
        {/* Image added to Hero Section */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/C1.jpg" // Replace with your image path
            alt="Contact Us Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg"
              ></textarea>
            </div>
            <button type="submit" className="bg-[#F83002] hover:bg-[#D52D1A] text-white py-3 px-6 rounded-full">
              Send Message
            </button>
          </form>

          {status && (
            <p className="mt-4 text-lg">{status}</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
