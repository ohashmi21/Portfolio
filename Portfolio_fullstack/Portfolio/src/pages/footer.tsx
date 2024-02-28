import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="made-by">
          Made by Omair Hashmi using React and Next.js
        </p>
        <p className="copyright">
          &copy; {new Date().getFullYear()} Omair Hashmi | ohashmi21@gmail.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
