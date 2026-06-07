import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const BlogManagement = () => {
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'Guides',
    division: 'GLOBAL',
    status: 'published',
    tags: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await API.get('/blog?status=published'); // Load published & drafts if api route supports it
      if (res.data.success) {
        setPosts(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
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
    const dataToSend = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    try {
      if (editingId) {
        await API.put(`/blog/${editingId}`, dataToSend);
      } else {
        await API.post('/blog', dataToSend);
      }
      setModalOpen(false);
      resetForm();
      fetchPosts();
    } catch (err) {
      console.error('Error saving article:', err);
    }
  };

  const handleEdit = (post) => {
    setEditingId(post._id);
    setFormData({
      title: post.title,
      summary: post.summary,
      content: post.content,
      category: post.category,
      division: post.division,
      status: post.status,
      tags: post.tags?.join(', ') || ''
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await API.delete(`/blog/${id}`);
        fetchPosts();
      } catch (err) {
        console.error('Error deleting post:', err);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      summary: '',
      content: '',
      category: 'Guides',
      division: 'GLOBAL',
      status: 'published',
      tags: ''
    });
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary mb-2">Knowledge Center Manager</h1>
          <p className="text-outline-variant font-sans text-sm">Write, edit, and publish research guides, case studies, and engineering briefs.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setModalOpen(true); }}
          className="flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-xl font-display font-semibold shadow-lg hover:scale-[1.02] transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          New Article
        </button>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden bg-white/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="px-8 py-5 font-display text-xs text-primary uppercase tracking-wider font-bold">Article Title</th>
                <th className="px-6 py-5 font-display text-xs text-primary uppercase tracking-wider font-bold">Category</th>
                <th className="px-6 py-5 font-display text-xs text-primary uppercase tracking-wider font-bold">Division</th>
                <th className="px-6 py-5 font-display text-xs text-primary uppercase tracking-wider text-center font-bold">Status</th>
                <th className="px-8 py-5 font-display text-xs text-primary uppercase tracking-wider text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 font-sans text-on-surface-variant">Loading insights database...</td>
                </tr>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post._id} className="table-row-hover bg-white/30">
                    <td className="px-8 py-6">
                      <span className="font-sans font-semibold text-primary">{post.title}</span>
                    </td>
                    <td className="px-6 py-6 font-sans text-xs text-on-surface-variant">{post.category}</td>
                    <td className="px-6 py-6 font-sans text-xs text-on-surface-variant">GEO {post.division}</td>
                    <td className="px-6 py-6 text-center">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-green-50 text-green-700">
                        {post.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => handleEdit(post)} className="p-2 text-outline hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button onClick={() => handleDelete(post._id)} className="p-2 text-outline hover:text-error transition-colors">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-12 font-sans text-on-surface-variant">No articles published.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] bg-primary/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-3xl overflow-hidden shadow-2xl p-8 md:p-12 animate-scale-up">
            <div className="flex justify-between items-start mb-8">
              <h2 className="font-display text-2xl font-bold text-primary">{editingId ? 'Edit Article' : 'Write New Article'}</h2>
              <button onClick={() => setModalOpen(false)} className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-outline-variant">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">Article Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Geotechnical soil profiling along shorelines"
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Category</label>
                  <input 
                    type="text" 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Soil Investigation"
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Division Target</label>
                  <select 
                    name="division"
                    value={formData.division}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm bg-white"
                  >
                    <option value="GLOBAL">Global Group</option>
                    <option value="ARC">GEO ARC</option>
                    <option value="SOIL">GEO Soil Testing</option>
                    <option value="CONSTRUCTION">GEO Construction</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display font-bold text-xs text-primary">Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm bg-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">Brief Summary</label>
                <input 
                  type="text" 
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  required
                  placeholder="Summarize the core insights of this article for meta search..."
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">Article Content</label>
                <textarea 
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  placeholder="Write body content here..."
                  rows="8"
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display font-bold text-xs text-primary">Tags (Comma-separated)</label>
                <input 
                  type="text" 
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="soil investigation, geotechnical, compliance"
                  className="px-4 py-3 rounded-xl border border-outline-variant/50 focus:border-secondary outline-none text-sm"
                />
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
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
