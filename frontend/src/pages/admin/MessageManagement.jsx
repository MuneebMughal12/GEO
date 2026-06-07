import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const MessageManagement = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await API.get('/messages');
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const res = await API.put(`/messages/${id}/read`);
      if (res.data.success) {
        fetchMessages();
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(res.data.data);
        }
      }
    } catch (err) {
      console.error('Error marking message as read:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await API.delete(`/messages/${id}`);
        fetchMessages();
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }
      } catch (err) {
        console.error('Error deleting message:', err);
      }
    }
  };

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-display text-3xl font-bold text-primary mb-2">Contact Messages</h1>
        <p className="text-outline-variant font-sans text-sm">Review incoming requests, project quote queries, and division enquiries.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Message List Sidebar */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-outline-variant/30 overflow-hidden shadow-sm flex flex-col h-[600px]">
          <div className="p-4 bg-surface-container-low border-b border-outline-variant/20 font-display font-semibold text-xs text-primary uppercase tracking-widest">
            Inbox ({messages.filter(m => !m.isRead).length} Unread)
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/10">
            {loading ? (
              <p className="text-center text-on-surface-variant py-10 font-sans text-xs">Loading messages...</p>
            ) : messages.length > 0 ? (
              messages.map((msg) => (
                <div 
                  key={msg._id}
                  onClick={() => { setSelectedMessage(msg); if (!msg.isRead) handleMarkAsRead(msg._id); }}
                  className={`p-5 cursor-pointer hover:bg-surface-container-low transition-colors relative ${
                    selectedMessage && selectedMessage._id === msg._id ? 'bg-[#e0e0ff]/30' : ''
                  } ${!msg.isRead ? 'border-l-4 border-secondary' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-display font-bold text-xs text-primary truncate max-w-[150px]">{msg.name}</span>
                    <span className="text-[10px] text-outline-variant">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span className="bg-primary/5 text-primary text-[9px] font-bold px-2 py-0.5 rounded border border-primary/10 inline-block mb-2">
                    GEO {msg.division}
                  </span>
                  <p className="text-on-surface-variant text-xs font-sans line-clamp-1">{msg.message}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-on-surface-variant py-12 font-sans text-xs">No messages in inbox.</p>
            )}
          </div>
        </div>

        {/* Message Details Viewer */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-outline-variant/30 p-8 md:p-10 shadow-sm h-[600px] flex flex-col justify-between">
          {selectedMessage ? (
            <div className="space-y-6 flex-grow overflow-y-auto">
              <div className="flex justify-between items-start border-b border-outline-variant/20 pb-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-primary">{selectedMessage.name}</h3>
                  <p className="text-on-surface-variant font-sans text-xs mt-1">{selectedMessage.email} • {selectedMessage.phone || 'No phone supplied'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-secondary/10 text-secondary text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    GEO {selectedMessage.division}
                  </span>
                  <button 
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="p-2 text-outline-variant hover:text-error transition-colors" 
                    title="Delete Message"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>

              <div className="font-sans text-on-surface-variant text-sm leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full text-outline-variant">
              <span className="material-symbols-outlined text-5xl mb-4">mail_outline</span>
              <p className="font-sans text-xs">Select a message from the inbox to read details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageManagement;
