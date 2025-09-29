import React from 'react';
import { MessageSquare, Github, Linkedin, Mail, Globe, Twitter, Instagram } from 'lucide-react';

const Contact = ({ isVisible, data }) => (
  <section id="contact" className="py-20 px-6 bg-black bg-opacity-20">
    <div className="container mx-auto max-w-4xl">
      <div className={`transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Contact Info */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-4">Let's Connect!</h3>
              <p className="text-gray-300 leading-relaxed">
                I'm always open to discussing new opportunities and interesting projects. 
                Let's create something amazing together!
              </p>
              
              <div className="space-y-4">
                {data?.contactEmail && (
                  <div className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-colors group">
                    <Mail className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <a href={`mailto:${data.contactEmail}`}>{data.contactEmail}</a>
                  </div>
                )}
                {data?.website && (
                  <div className="flex items-center space-x-3 text-gray-300 hover:text-cyan-400 transition-colors group">
                    <Globe className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <a href={data.website} target="_blank" rel="noopener noreferrer">
                      {data.website.replace(/(^\w+:|^)\/\//, '')}
                    </a>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-white/10">
                <h4 className="text-sm font-semibold text-gray-400 mb-4">FIND ME ON</h4>
                <div className="flex space-x-4">
                  {data?.socialLinks?.github && (
                    <a 
                      href={data.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all hover:scale-110 hover:text-cyan-400 text-gray-300"
                      aria-label="GitHub Profile"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                  )}
                  {data?.socialLinks?.linkedin && (
                    <a 
                      href={data.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all hover:scale-110 hover:text-cyan-400 text-gray-300"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  )}
                  {data?.socialLinks?.twitter && (
                    <a 
                      href={data.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all hover:scale-110 hover:text-cyan-400 text-gray-300"
                      aria-label="Twitter Profile"
                    >
                      <Twitter className="w-6 h-6" />
                    </a>
                  )}
                  {data?.socialLinks?.instagram && (
                    <a 
                      href={data.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all hover:scale-110 hover:text-cyan-400 text-gray-300"
                      aria-label="Instagram Profile"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right side - Direct Contact */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">Direct Message</h3>
                <p className="text-gray-300 mb-6">
                  Have a specific question or want to discuss a project?
                </p>
                {data?.contactEmail && (
                  <a 
                    href={`mailto:${data.contactEmail}`}
                    className="inline-block w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-lg hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
                    aria-label="Send Email"
                  >
                    Send Message
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
