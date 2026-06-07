import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    clientName: '',
    division: 'ARC',
    category: 'Architecture',
    location: '',
    completionDate: 'Q4 2026',
    status: 'Ongoing',
    description: '',
    isFeatured: false,
    isPinnedHomepage: false
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await API.get('/projects');
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/projects/${editingId}`, formData);
      } else {
        await API.post('/projects', formData);
      }
      setModalOpen(false);
      resetForm();
      fetchProjects();
    } catch (err) {
      console.error('Error saving project:', err);
    }
  };

  const handleEdit = (proj) => {
    setEditingId(proj._id);
    setFormData({
      name: proj.name,
      clientName: proj.clientName,
      division: proj.division,
      category: proj.category,
      location: proj.location,
      completionDate: proj.completionDate,
      status: proj.status,
      description: proj.description,
      isFeatured: proj.isFeatured || false,
      isPinnedHomepage: proj.isPinnedHomepage || false
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await API.delete(`/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error('Error deleting project:', err);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      clientName: '',
      division: 'ARC',
      category: 'Architecture',
      location: '',
      completionDate: 'Q4 2026',
      status: 'Ongoing',
      description: '',
      isFeatured: false,
      isPinnedHomepage: false
    });
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary mb-2">Project Management</h1>
          <p className="text-outline-variant font-sans text-sm">Review and manage global infrastructure initiatives and soil analysis projects.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setModalOpen(true); }}
          className="flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-xl font-display font-semibold shadow-lg hover:shadow-secondary/20 hover:scale-[1.02] transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          Add New Project
        </button>
      </div>

      {/* Table grid */}
      <div className="glass-panel rounded-3xl overflow-hidden bg-white/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="px-8 py-5 font-display text-xs text-primary uppercase tracking-wider font-bold">Project Title</th>
                <th className="px-6 py-5 font-display text-xs text-primary uppercase tracking-wider font-bold">Division</th>
                <th className="px-6 py-5 font-display text-xs text-primary uppercase tracking-wider font-bold">Client</th>
                <th className="px-6 py-5 font-display text-xs text-primary uppercase tracking-wider text-center font-bold">Status</th>
                <th className="px-8 py-5 font-display text-xs text-primary uppercase tracking-wider text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 font-sans text-on-surface-variant">Loading records...</td>
                </tr>
              ) : projects.length > 0 ? (
                projects.map((proj) => (
                  <tr key={proj._id} className="table-row-hover bg-white/30">
                    <td className="px-8 py-6">
                      <span className="font-sans font-semibold text-primary">{proj.name}</span>
                    </td>
                    <td className="px-6 py-6 font-sans text-xs text-on-surface-variant">GEO {proj.division}</td>
                    <td className="px-6 py-6 font-sans text-xs text-on-surface-variant">{proj.clientName}</td>
                    <td className="px-6 py-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        proj.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => handleEdit(proj)} className="p-2 text-outline hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button onClick={() => handleDelete(proj._id)} className="p-2 text-outline hover:text-error transition-colors">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-12 font-sans text-on-surface-variant">No projects registered.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] bg-primary/45 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl p-8 md:p-12 animate-scale-up">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h2 className="font-display text-2xl font-bold text-primary">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
                <p className="text-outline-variant font-sans text-xs mt-2">Enter project specifications to initiate tracking.</p>
              </div>
              <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors" onClick={() => setModalOpen(false)}>
                <span className="material-symbols-outlined text-outline-variant">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Project Title</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Skyline Heights Foundation"
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Client Name</label>
                  <input 
                    type="text" 
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Metro Dev Corp"
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Division Target</label>
                  <select 
                    name="division"
                    value={formData.division}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm bg-white"
                  >
                    <option value="ARC">GEO ARC</option>
                    <option value="SOIL">GEO Soil Testing</option>
                    <option value="CONSTRUCTION">GEO Construction</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Category</label>
                  <input 
                    type="text" 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Geotechnical"
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Operational Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm bg-white"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Location</label>
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Karachi, Pakistan"
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Timeline / Date</label>
                  <input 
                    type="text" 
                    name="completionDate"
                    value={formData.completionDate}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Q4 2026"
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">Scope Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Outline project specifications..."
                  rows="3"
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary focus:ring-1 focus:ring-secondary/20 outline-none text-sm resize-none"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer font-sans text-xs font-semibold text-primary">
                  <input 
                    type="checkbox" 
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="rounded border-outline-variant/50 text-secondary focus:ring-0"
                  />
                  Mark as Featured Project
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-sans text-xs font-semibold text-primary">
                  <input 
                    type="checkbox" 
                    name="isPinnedHomepage"
                    checked={formData.isPinnedHomepage}
                    onChange={handleInputChange}
                    className="rounded border-outline-variant/50 text-secondary focus:ring-0"
                  />
                  Pin to Homepage Portfolio
                </label>
              </div>

              <div className="flex gap-4 pt-4 border-t border-outline-variant/10">
                <button 
                  type="button" 
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-4 border border-outline-variant text-primary font-display font-semibold rounded-xl hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-primary text-on-primary font-display font-semibold rounded-xl hover:bg-primary-container transition-colors shadow-md"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;
