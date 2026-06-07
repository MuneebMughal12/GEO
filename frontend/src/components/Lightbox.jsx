import React, { useEffect } from 'react';

const Lightbox = ({ media, onClose }) => {
  useEffect(() => {
    // Disable body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!media) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8 backdrop-blur-md transition-all duration-300 animate-fade-in"
      onClick={onClose}
    >
      <button 
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors duration-300 bg-white/10 hover:bg-white/20 p-3 rounded-full flex items-center justify-center z-50"
      >
        <span className="material-symbols-outlined text-3xl">close</span>
      </button>

      <div 
        className="max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center relative z-40"
        onClick={(e) => e.stopPropagation()}
      >
        {media.type === 'video' ? (
          <video 
            src={media.url} 
            controls 
            autoPlay 
            className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10" 
          />
        ) : (
          <img 
            src={media.url} 
            alt={media.title || 'Fullscreen Media'} 
            className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10" 
          />
        )}
        
        {media.title && (
          <div className="mt-6 text-center text-white space-y-1">
            <h3 className="font-display text-lg md:text-xl font-bold tracking-wide">{media.title}</h3>
            {media.division && media.division !== 'GLOBAL' && (
              <span className="text-secondary font-display text-[10px] uppercase tracking-widest font-semibold bg-secondary/15 px-3 py-1 rounded-full border border-secondary/20 inline-block">
                GEO {media.division} Division
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
