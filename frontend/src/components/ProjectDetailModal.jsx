import React, { useState, useEffect } from 'react';
import { getMediaUrl } from '../services/media';

const ProjectDetailModal = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0);
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [project]);

  if (!project) return null;

  const images = (project.images && project.images.length > 0) 
    ? project.images 
    : ['https://lh3.googleusercontent.com/aida-public/placeholder-project.jpg']; // Fallback if no images

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-primary/45 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[32px] w-full max-w-5xl overflow-hidden shadow-2xl border border-outline-variant/30 animate-scale-up flex flex-col md:flex-row h-[90vh] md:h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Mobile */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 md:hidden z-50 bg-white/85 text-primary hover:bg-white p-2.5 rounded-full shadow-lg flex items-center justify-center border border-outline-variant/30"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Left Side: Image Slider */}
        <div className="w-full md:w-3/5 bg-surface-container relative flex items-center justify-center h-1/2 md:h-full group overflow-hidden">
          <img 
            src={getMediaUrl(images[currentImageIndex])} 
            alt={`${project.name} - slide ${currentImageIndex + 1}`} 
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Left/Right Arrows */}
          {images.length > 1 && (
            <>
              <button 
                onClick={handlePrev}
                className="absolute left-4 bg-white/95 text-primary hover:bg-white p-3 rounded-xl shadow-lg border border-outline-variant/30 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 duration-300"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 bg-white/95 text-primary hover:bg-white p-3 rounded-xl shadow-lg border border-outline-variant/30 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 duration-300"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-6 flex gap-2 justify-center w-full z-20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentImageIndex === idx ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Index Counter Badge */}
          <div className="absolute top-6 left-6 luxury-badge text-[10px] font-bold px-3 py-1 rounded-full shadow-lg bg-white/95 text-primary">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>

        {/* Right Side: Detailed Info */}
        <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-between h-1/2 md:h-full bg-white relative">
          {/* Close Button Desktop */}
          <button 
            onClick={onClose} 
            className="hidden md:flex absolute top-6 right-6 p-2 rounded-full hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-outline-variant">close</span>
          </button>

          <div className="space-y-6 overflow-y-auto pr-2 flex-1">
            <div>
              <span className="bg-primary/5 text-primary text-[10px] font-bold px-3 py-1 rounded-full border border-primary/10 inline-block uppercase tracking-wider">
                GEO {project.division} Division
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mt-3 leading-tight">{project.name}</h2>
              <p className="font-sans text-xs text-secondary font-semibold uppercase tracking-wider mt-1">{project.category}</p>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-outline-variant/20 text-xs">
              <div>
                <p className="text-[10px] font-display font-semibold text-outline uppercase tracking-wider">Client</p>
                <p className="font-sans font-bold text-primary mt-0.5 truncate">{project.clientName}</p>
              </div>
              <div>
                <p className="text-[10px] font-display font-semibold text-outline uppercase tracking-wider">Location</p>
                <p className="font-sans font-bold text-primary mt-0.5 truncate">{project.location}</p>
              </div>
              <div>
                <p className="text-[10px] font-display font-semibold text-outline uppercase tracking-wider">Timeline / Date</p>
                <p className="font-sans font-bold text-primary mt-0.5">{project.completionDate}</p>
              </div>
              <div>
                <p className="text-[10px] font-display font-semibold text-outline uppercase tracking-wider">Status</p>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase mt-1 ${
                  project.status === 'Completed' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>

            {/* Scope Description */}
            <div className="space-y-2">
              <h4 className="font-display font-bold text-xs text-primary uppercase tracking-wider">Project Scope</h4>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
