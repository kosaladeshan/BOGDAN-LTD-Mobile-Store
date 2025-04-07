import React, { useState } from 'react';
import { Footer, Navbar } from "../components";
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost/Ecommerce_Website/contactus.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Message sent successfully!');
        // Clear form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        toast.error(data.message || 'Failed to send message');
      }
    } catch (error) {
      toast.error('Error sending message');
      console.error('Contact form error:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Contact Us</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-6 col-lg-6 col-sm-12 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="mb-2">Full Name</label>
                <input
                  type="text"
                  className="form-control mb-4"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="mb-2">Email address</label>
                <input
                  type="email"
                  className="form-control mb-4"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="mb-2">Message</label>
                <textarea
                  className="form-control mb-4"
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-center">
                <button className="my-2 px-4 mx-auto btn btn-dark" type="submit">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
