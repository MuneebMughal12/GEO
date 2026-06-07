import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const GalleryManagement = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadData, setUploadData] = useState({
    title: '',
    division: 'GLOBAL',
    url: '',
    isPinnedHomepage: false
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await API.get('/gallery');
      if (res.data.success) {
        setGallery(res.data.data);
      }
    } catch (err) {
      console.error('Error loading gallery media:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUploadData({
      ...uploadData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', uploadData.title || file.name.split('.')[0]);
    formData.append('division', uploadData.division);
    formData.append('isPinnedHomepage', uploadData.isPinnedHomepage);

    try {
      const res = await API.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        fetchGallery();
        setUploadData({ title: '', division: 'GLOBAL', url: '', isPinnedHomepage: false });
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this media asset?')) {
      try {
        await API.delete(`/gallery/${id}`);
        fetchGallery();
      } catch (err) {
        console.error('Error removing asset:', err);
      }
    }
  };

  const handleTogglePin = async (id) => {
    try {
      await API.put(`/gallery/${id}/pin`);
      fetchGallery();
    } catch (err) {
      console.error('Pin status toggle failed:', err);
    }
  };

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">Gallery Management</h1>
          <p className="font-sans text-sm text-on-surface-variant mt-2 max-w-2xl">Visual asset repository for GEO Group divisions. Manage global visibility and branch-specific branding assets.</p>
        </div>
      </div>

      {/* Upload settings block */}
      <section className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div className="flex flex-col gap-1.5">
          <label className="font-display font-bold text-xs text-primary">Asset Title</label>
          <input 
            type="text" 
            name="title"
            value={uploadData.title}
            onChange={handleInputChange}
            placeholder="e.g. Skyline Atrium"
            className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm bg-background"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-display font-bold text-xs text-primary">Assign Division</label>
          <select 
            name="division"
            value={uploadData.division}
            onChange={handleInputChange}
            className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm bg-white"
          >
            <option value="GLOBAL">GEO Group (Global)</option>
            <option value="ARC">GEO ARC</option>
            <option value="SOIL">GEO Soil Testing</option>
            <option value="CONSTRUCTION">GEO Construction</option>
          </select>
        </div>
        <div className="flex items-center gap-6 h-12">
          <label className="flex items-center gap-2 cursor-pointer font-sans text-xs font-semibold text-primary">
            <input 
              type="checkbox" 
              name="isPinnedHomepage"
              checked={uploadData.isPinnedHomepage}
              onChange={handleInputChange}
              className="rounded border-outline-variant/50 text-secondary focus:ring-0"
            />
            Pin to Homepage Gallery
          </label>
        </div>
      </section>

      {/* Upload visual Area */}
      <section>
        <label className="drag-dash rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-white/50 hover:bg-white transition-colors cursor-pointer group shadow-sm block relative">
          <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
            <span className="material-symbols-outlined text-[32px]">{uploading ? 'sync' : 'upload_file'}</span>
          </div>
          <h3 className="font-display text-lg font-bold text-primary">{uploading ? 'Uploading Asset...' : 'Upload Visual Assets'}</h3>
          <p className="font-sans text-xs text-on-surface-variant mt-2">Drag and drop high-resolution images here, or click to browse files</p>
          <p className="text-[10px] font-display text-outline-variant mt-4 uppercase tracking-widest font-semibold">Supports PNG, JPG, WEBP (Max 20MB)</p>
          <input type="file" onChange={handleFileUpload} className="hidden" disabled={uploading} />
        </label>
      </section>

      {/* Gallery Media Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          <p className="col-span-4 text-center text-on-surface-variant font-sans py-10">Loading assets catalog...</p>
        ) : gallery.length > 0 ? (
          gallery.map((media) => (
            <div key={media._id} className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/30 sky-blue-glow flex flex-col justify-between">
              <div className="aspect-[4/3] relative overflow-hidden bg-surface-container">
                <img src={media.url} alt={media.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                {media.isPinnedHomepage && (
                  <div className="absolute top-4 right-4 luxury-badge flex items-center gap-1.5 px-3 py-1 rounded-full shadow-lg">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Homepage</span>
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="font-display font-bold text-sm text-primary truncate">{media.title}</h4>
                  <span className="bg-primary/5 text-primary text-[10px] font-bold px-3 py-1 rounded-full border border-primary/10 inline-block mt-2">
                    GEO {media.division}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleTogglePin(media._id)} className="text-primary hover:text-secondary-container transition-colors" title={media.isPinnedHomepage ? 'Unpin from Homepage' : 'Pin to Homepage'}>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: media.isPinnedHomepage ? "'FILL' 1" : "'FILL' 0" }}>push_pin</span>
                    </button>
                  </div>
                  <button onClick={() => handleDelete(media._id)} className="text-error/40 hover:text-error transition-colors" title="Delete">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center text-on-surface-variant py-12">No media assets in the catalog.</p>
        )}
      </section>
    </div>
  );
};

export default GalleryManagement;
