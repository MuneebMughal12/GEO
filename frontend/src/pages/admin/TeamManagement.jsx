import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { getMediaUrl } from '../../services/media';

const TeamManagement = () => {
  const [team, setTeam] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    division: 'ARC',
    profileImage: '',
    bio: '',
    experience: '5 Years',
    certifications: []
  });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUploadProfileImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);
      formDataToSend.append('title', `profile-${formData.name || 'member'}-${Date.now()}`);
      formDataToSend.append('division', formData.division || 'GLOBAL');
      formDataToSend.append('type', 'image');

      const res = await API.post('/gallery', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success && res.data.data.url) {
        setFormData(prev => ({
          ...prev,
          profileImage: res.data.data.url
        }));
      }
    } catch (err) {
      console.error('Profile image upload failed:', err);
      alert('Failed to upload profile image.');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await API.get('/team');
      if (res.data.success) {
        setTeam(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching team members:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Use high-fidelity placeholder if image is empty
    const dataToSend = { ...formData };
    if (!dataToSend.profileImage) {
      dataToSend.profileImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA100Sfjqj3OOhaVokM5m36hJguaE03iBeVSyf-sy5f-qrJ2T9_bUxLMyL_d0sWHUOwR8FYDXnJh7JArWzn7NGhtwsoTre8OwakhJta3qQdnTJM4c9HmomlfY5qKmsOvdPOn_3vOeVgr4wbR6ieAVKTxcTEr44bAxLv_I4pFXtr-_WvJf_9GCWRUaeA3WVsPGaAIuwasjPwo4oKL9rUVDHVaMktn7gvJaknvQVrpA1ZHFaV_iC9OYqeDmlYQhx1lp1l2H8qAQl5iX0';
    }

    try {
      if (editingId) {
        await API.put(`/team/${editingId}`, dataToSend);
      } else {
        await API.post('/team', dataToSend);
      }
      setModalOpen(false);
      resetForm();
      fetchTeam();
    } catch (err) {
      console.error('Error saving team member:', err);
    }
  };

  const handleEdit = (member) => {
    setEditingId(member._id);
    setFormData({
      name: member.name,
      designation: member.designation,
      division: member.division,
      profileImage: member.profileImage,
      bio: member.bio || '',
      experience: member.experience || '5 Years',
      certifications: member.certifications || []
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      try {
        await API.delete(`/team/${id}`);
        fetchTeam();
      } catch (err) {
        console.error('Error removing team member:', err);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      designation: '',
      division: 'ARC',
      profileImage: '',
      bio: '',
      experience: '5 Years',
      certifications: []
    });
  };

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-primary mb-2">Visionaries Behind the Blueprint</h2>
          <p className="font-sans text-on-surface-variant text-sm">Manage your global team of expert architects, engineers, and strategists.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setModalOpen(true); }}
          className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3.5 rounded-xl font-display font-semibold text-xs hover:bg-primary-container transition-all shadow-md group"
        >
          <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">add</span>
          Add Team Member
        </button>
      </section>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-outline-variant/20 shadow-sm relative overflow-hidden group">
          <p className="font-display font-semibold text-xs text-on-surface-variant uppercase tracking-widest mb-2">Total Visionaries</p>
          <h3 className="font-display text-4xl font-extrabold text-primary">{team.length}</h3>
          <div className="mt-4 flex items-center gap-2 text-green-600 font-display font-semibold text-xs">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>Real-time database count</span>
          </div>
        </div>
        <div className="bg-primary text-on-primary p-8 rounded-2xl shadow-sm border border-primary/20 relative overflow-hidden group">
          <p className="font-display font-semibold text-xs text-primary-fixed uppercase tracking-widest mb-2">Active Divisions</p>
          <h3 className="font-display text-4xl font-extrabold">3</h3>
          <div className="mt-4 flex items-center gap-2 text-primary-fixed font-display font-semibold text-xs">
            <span className="material-symbols-outlined text-sm">public</span>
            <span>ARC, SOIL, CONSTRUCTION</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-outline-variant/20 shadow-sm relative overflow-hidden group">
          <p className="font-display font-semibold text-xs text-on-surface-variant uppercase tracking-widest mb-2">Corporate Leadership</p>
          <h3 className="font-display text-4xl font-extrabold text-tertiary-fixed-variant">
            {team.filter(t => t.division === 'GLOBAL').length}
          </h3>
          <div className="mt-4 flex items-center gap-2 text-on-surface-variant font-display font-semibold text-xs">
            <span className="material-symbols-outlined text-sm">shield</span>
            <span>Global Directors & CEOs</span>
          </div>
        </div>
      </div>

      {/* Team Cards Grid */}
      <div className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden p-8">
        {loading ? (
          <p className="text-center text-on-surface-variant py-10 font-sans">Loading team profiles...</p>
        ) : team.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member._id} className="p-6 border border-outline-variant/20 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group text-center flex flex-col items-center">
                <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-6">
                  <img src={getMediaUrl(member.profileImage)} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-display font-bold text-base text-primary mb-1">{member.name}</h4>
                <p className="font-display text-[10px] font-bold text-on-primary-container bg-primary-fixed/30 px-3 py-1 rounded-full mb-4">
                  {member.designation}
                </p>
                <p className="font-sans text-xs text-on-surface-variant mb-6 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">apartment</span>
                  GEO {member.division}
                </p>
                <div className="flex gap-3 mt-auto">
                  <button onClick={() => handleEdit(member)} className="h-9 w-9 flex items-center justify-center rounded-full bg-surface-container border border-outline-variant/30 hover:bg-primary-container hover:text-white transition-all text-xs" title="Edit">
                    <span className="material-symbols-outlined text-base">edit</span>
                  </button>
                  <button onClick={() => handleDelete(member._id)} className="h-9 w-9 flex items-center justify-center rounded-full bg-surface-container border border-outline-variant/30 hover:bg-error-container hover:text-error transition-all text-xs" title="Delete">
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-on-surface-variant py-12">No team profiles registered.</p>
        )}
      </div>

      {/* Modal Profile Sheet */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] bg-primary/40 backdrop-blur-sm flex items-center justify-center p-8">
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/30 animate-scale-up">
            <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
              <div>
                <h3 className="font-display text-xl font-bold text-primary">Member Identity</h3>
                <p className="font-sans text-xs text-on-surface-variant">Update the visionaries behind the blueprint.</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="material-symbols-outlined text-on-surface-variant hover:bg-error-container hover:text-error p-2 rounded-full transition-all">close</button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[550px] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Full Identity Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Elena Rodriguez"
                    className="w-full border-outline-variant/50 rounded-xl focus:ring-1 focus:ring-secondary focus:border-secondary px-4 py-3 bg-background text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Professional Designation</label>
                  <input 
                    type="text" 
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    required
                    placeholder="Head of Structural Engineering"
                    className="w-full border-outline-variant/50 rounded-xl focus:ring-1 focus:ring-secondary focus:border-secondary px-4 py-3 bg-background text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Strategic Division</label>
                  <select 
                    name="division"
                    value={formData.division}
                    onChange={handleInputChange}
                    className="w-full border-outline-variant/50 rounded-xl focus:ring-1 focus:ring-secondary focus:border-secondary px-4 py-3 bg-background text-sm"
                  >
                    <option value="GLOBAL">Global Corporate</option>
                    <option value="ARC">GEO ARC</option>
                    <option value="SOIL">GEO Soil Testing</option>
                    <option value="CONSTRUCTION">GEO Construction</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="font-display font-bold text-xs text-primary">Profile Image</label>
                  <div className="flex gap-4 items-start">
                    {formData.profileImage && (
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-outline-variant/30 bg-surface-container shrink-0">
                        <img src={getMediaUrl(formData.profileImage)} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex gap-2">
                        <label className="cursor-pointer bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2.5 rounded-xl text-xs font-semibold font-display flex items-center gap-1.5 transition-colors">
                          <span className="material-symbols-outlined text-[16px]">
                            {uploading ? 'sync' : 'upload_file'}
                          </span>
                          {uploading ? 'Uploading...' : 'Upload from PC'}
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleUploadProfileImage} 
                            className="hidden" 
                            disabled={uploading}
                          />
                        </label>
                        {formData.profileImage && (
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, profileImage: '' }))}
                            className="bg-error/10 text-error hover:bg-error/20 px-3 py-2 rounded-xl text-xs font-semibold font-display flex items-center gap-1 transition-colors"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <input 
                        type="text" 
                        name="profileImage"
                        value={formData.profileImage}
                        onChange={handleInputChange}
                        placeholder="Or paste an image URL..."
                        className="w-full border-outline-variant/50 rounded-xl focus:ring-1 focus:ring-secondary focus:border-secondary px-4 py-3 bg-background text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">Short Biography</label>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Details of professional background and key achievements..."
                  rows="3"
                  className="w-full border-outline-variant/50 rounded-xl focus:ring-1 focus:ring-secondary focus:border-secondary px-4 py-3 bg-background text-sm resize-none"
                />
              </div>

              <div className="p-8 border-t border-outline-variant/10 flex justify-end gap-4 bg-surface-container-low mt-8">
                <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3 border border-outline-variant text-on-surface-variant hover:bg-surface-container-high rounded-xl font-display font-semibold text-xs transition-all">Discard Changes</button>
                <button type="submit" className="px-8 py-3 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-display font-semibold text-xs transition-all shadow-lg">Confirm Identity</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
