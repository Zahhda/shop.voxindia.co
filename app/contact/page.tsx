import React from 'react';
//ffff
const ContactUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="space-y-4 text-gray-700">
        <h2 className="text-xl font-semibold">VOX Interior and Exterior Solutions Private Limited</h2>
        <p>
          <strong>Registered Office Address:</strong><br />
          No. 1202, 100 Feet Road, Domlur, Indiranagar,<br />
          Bengaluru, Karnataka 560008
        </p>
        <p>
          <strong>Landline:</strong> +91 9528500500
        </p>
        <p>
          <strong>India Helpline:</strong> +91 9528500500<br />
          (10:00 – 18:00 Monday to Friday, 10:00 – 14:00 Saturday)
        </p>
        <p>
          <strong>Email Id:</strong> <a href="mailto:customercare@voxindia.co" className="text-red-600 hover:underline">customercare@voxindia.co</a>
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
