import React from 'react';

const Footer = ({ data }) => (
  <footer className="py-8 text-center border-t border-white border-opacity-10">
    <p className="text-gray-400">
      © {new Date().getFullYear()} {data?.name}. All rights reserved.
    </p>
  </footer>
);

export default Footer;
