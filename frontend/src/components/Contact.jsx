import React from 'react';
import { MessageSquare } from 'lucide-react';

const Contact = ({ isVisible, data }) => (
  <section id="contact" className="py-20 px-6 bg-black bg-opacity-20">
    <div className="container mx-auto max-w-4xl">
      <div className={`transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and interesting projects. 
            Let's create something amazing together!
          </p>
          {data?.contactEmail && (
            <a 
              href={`mailto:${data.contactEmail}`}
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
              aria-label="Send Email"
            >
              Say Hello
            </a>
          )}
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
