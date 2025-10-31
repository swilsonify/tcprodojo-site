import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, ArrowLeft, Trash2 } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    verifyAuth();
    loadContacts();
  }, []);

  const verifyAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const loadContacts = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await axios.get(`${API}/contacts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Sort by date (newest first)
      const sortedContacts = response.data.sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      setContacts(sortedContacts);
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) {
      return;
    }

    const token = localStorage.getItem('adminToken');
    try {
      // Note: We need to add a delete endpoint for contacts in the backend
      // For now, this will show an error but the UI is ready
      await axios.delete(`${API}/contacts/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedContact(null);
      loadContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Error deleting contact. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="bg-gray-900 border-b border-blue-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/admin/dashboard" className="text-blue-400 hover:text-blue-300">
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
            </div>
            <div className="text-gray-400">
              {contacts.length} message{contacts.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading messages...</div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="text-gray-600 mx-auto mb-4" size={64} />
            <p className="text-gray-400 text-lg">No contact messages yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Messages List */}
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`bg-gray-900 border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id
                      ? 'border-blue-500'
                      : 'border-blue-500/20 hover:border-blue-500/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-white font-bold">{contact.name}</h3>
                      <p className="text-blue-400 text-sm">{contact.email}</p>
                    </div>
                    <span className="text-gray-500 text-xs">
                      {formatDate(contact.created_at)}
                    </span>
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">{contact.subject}</p>
                  <p className="text-gray-400 text-sm line-clamp-2">{contact.message}</p>
                </div>
              ))}
            </div>

            {/* Message Detail */}
            <div className="lg:sticky lg:top-4 h-fit">
              {selectedContact ? (
                <div className="bg-gray-900 border border-blue-500/20 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-white">Message Details</h2>
                    <button
                      onClick={() => handleDelete(selectedContact.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                      title="Delete message"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm font-semibold">From</label>
                      <p className="text-white text-lg">{selectedContact.name}</p>
                    </div>

                    <div>
                      <label className="text-gray-400 text-sm font-semibold">Email</label>
                      <p className="text-white">
                        <a 
                          href={`mailto:${selectedContact.email}`}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          {selectedContact.email}
                        </a>
                      </p>
                    </div>

                    {selectedContact.phone && (
                      <div>
                        <label className="text-gray-400 text-sm font-semibold">Phone</label>
                        <p className="text-white">
                          <a 
                            href={`tel:${selectedContact.phone}`}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            {selectedContact.phone}
                          </a>
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="text-gray-400 text-sm font-semibold">Subject</label>
                      <p className="text-white">{selectedContact.subject}</p>
                    </div>

                    <div>
                      <label className="text-gray-400 text-sm font-semibold">Date</label>
                      <p className="text-white">{formatDate(selectedContact.created_at)}</p>
                    </div>

                    <div>
                      <label className="text-gray-400 text-sm font-semibold">Message</label>
                      <div className="bg-black border border-blue-500/20 rounded p-4 mt-2">
                        <p className="text-white whitespace-pre-wrap">{selectedContact.message}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-blue-500/20">
                      <a
                        href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
                      >
                        <Mail size={18} />
                        <span>Reply via Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-900 border border-blue-500/20 rounded-lg p-12 text-center">
                  <Mail className="text-gray-600 mx-auto mb-4" size={64} />
                  <p className="text-gray-400">Select a message to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContacts;
