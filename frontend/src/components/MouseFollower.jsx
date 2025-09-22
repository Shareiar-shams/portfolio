import React from 'react';

const MouseFollower = ({ position }) => (
  <div
    className="fixed w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full pointer-events-none mix-blend-screen z-50 transition-all duration-300 ease-out"
    style={{
      left: position.x - 12,
      top: position.y - 12,
      opacity: 0.6
    }}
  />
);

export default MouseFollower;
