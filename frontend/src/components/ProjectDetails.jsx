import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { getFileUrl } from '../helpers/fileHelpers';
import ModelDescription from "./ModelDescription";

const ProjectDetails = ({ projects }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p._id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Project Not Found</h2>
          <button
            onClick={() =>{ navigate('/projects'); window.location.reload();}}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={() =>{ navigate('/'); window.location.reload();}}
          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </button>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl">
          <div className="h-80 relative overflow-hidden">
            <img
              src={getFileUrl(project.image)}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-project.jpg';
              }}
            />
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {project.title}
            </h1>

              
            <ModelDescription description={project.description} />

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {(project.features || []).length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-cyan-400">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-6">
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
              >
                <ExternalLink size={20} />
                View Live Demo
              </a>
              <a
                href={project.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
              >
                <Github size={20} />
                View Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;