import React, { useState, useEffect, useRef } from "react";
import apiService from "../services/api";

export default function ChatInterface({ onClose, initialContact, currentUserRole }) {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(initialContact || null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);
  const [sending, setSending] = useState(false);
  const [hasAcceptedBooking, setHasAcceptedBooking] = useState(false);
  const [allBookings, setAllBookings] = useState([]);
  
  const currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        let bookingsData = [];
        if (currentUserRole === "organizer") {
          const res = await apiService.getSentBookings();
          bookingsData = res.bookings || [];
        } else {
          const res = await apiService.getReceivedBookings();
          bookingsData = res.bookings || [];
        }
        setAllBookings(bookingsData);
        
        // Extract unique contacts
        const uniqueContacts = [];
        const contactIds = new Set();
        bookingsData.forEach(b => {
          const contact = currentUserRole === "organizer" ? b.official : b.organizer;
          if (contact && !contactIds.has(contact._id)) {
            contactIds.add(contact._id);
            uniqueContacts.push(contact);
          }
        });
        
        // If initialContact is not in bookings (e.g. from SearchOfficials before booking), add them
        if (initialContact && !contactIds.has(initialContact._id)) {
            uniqueContacts.unshift(initialContact);
        }

        setContacts(uniqueContacts);
        if (!selectedContact && uniqueContacts.length > 0) {
            setSelectedContact(uniqueContacts[0]);
        }
      } catch (err) {
        console.error("Error fetching contacts", err);
      } finally {
        setLoadingContacts(false);
      }
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    if (!selectedContact) return;
    
    // Check if there is an accepted booking for this contact
    const hasAccepted = allBookings.some(b => {
        const contactId = currentUserRole === "organizer" ? b.official?._id : b.organizer?._id;
        return contactId === selectedContact._id && b.status === "accepted";
    });
    setHasAcceptedBooking(hasAccepted);

    const fetchMessages = async () => {
      setLoadingChat(true);
      try {
        const data = await apiService.getChatHistory(selectedContact._id);
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Error fetching chat", err);
      } finally {
        setLoadingChat(false);
      }
    };
    fetchMessages();
  }, [selectedContact, allBookings]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSending(true);
    try {
      const data = await apiService.sendMessage(selectedContact._id, input);
      setMessages([...messages, data.data]);
      setInput("");
    } catch (err) {
      alert(err.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const isLastMessageMine = messages.length > 0 && messages[messages.length - 1].sender === currentUser._id;
  const showWaitWarning = currentUserRole === "organizer" && !hasAcceptedBooking && isLastMessageMine;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 md:p-8">
      <div className="bg-white rounded-2xl w-full max-w-5xl h-[80vh] flex shadow-2xl overflow-hidden relative">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-full transition-colors"
        >
            ✕
        </button>
        
        {/* Left Sidebar - Contacts */}
        <div className="w-1/3 border-r border-gray-200 bg-gray-50 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-bold text-[#0B405B]">Chats</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loadingContacts ? (
                <div className="p-4 text-center text-gray-500">Loading contacts...</div>
            ) : contacts.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No active chats</div>
            ) : (
                contacts.map(contact => (
                    <div 
                        key={contact._id} 
                        onClick={() => setSelectedContact(contact)}
                        className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${selectedContact?._id === contact._id ? 'bg-[#0B405B] text-white' : 'hover:bg-gray-100'}`}
                    >
                        <div className="font-semibold">{contact.name}</div>
                        <div className={`text-sm truncate ${selectedContact?._id === contact._id ? 'text-blue-200' : 'text-gray-500'}`}>{contact.email}</div>
                    </div>
                ))
            )}
          </div>
        </div>

        {/* Right - Active Chat */}
        <div className="w-2/3 flex flex-col bg-white">
            {selectedContact ? (
                <>
                    <div className="p-4 border-b border-gray-200 bg-white shadow-sm flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{selectedContact.name}</h3>
                            <p className="text-sm text-gray-500">{selectedContact.email}</p>
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
                        {loadingChat ? (
                            <div className="text-center text-gray-500 mt-4">Loading messages...</div>
                        ) : messages.length === 0 ? (
                            <div className="text-center text-gray-500 mt-10">
                                <div className="text-4xl mb-2">👋</div>
                                <p>No messages yet. Say hello!</p>
                            </div>
                        ) : (
                            messages.map(msg => {
                                const isMe = msg.sender === currentUser._id;
                                return (
                                    <div key={msg._id} className={`flex ${isMe ? "justify-start" : "justify-end"}`}>
                                        <div className={`max-w-[70%] rounded-2xl px-5 py-3 shadow-sm ${
                                            isMe ? "bg-[#0B405B] text-white rounded-tl-none" : "bg-white border border-gray-200 text-gray-800 rounded-tr-none"
                                        }`}>
                                            <p className="text-sm md:text-base whitespace-pre-wrap">{msg.text}</p>
                                            <span className={`text-[10px] block mt-1 ${isMe ? "text-left text-blue-200" : "text-right text-gray-400"}`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 bg-white border-t border-gray-200">
                        {showWaitWarning && (
                            <div className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg mb-3 border border-amber-200 flex items-center">
                                <span className="mr-2">⚠️</span>
                                You must wait for the official to reply before sending more messages. Accepted bookings unlock endless chat.
                            </div>
                        )}
                        <form onSubmit={handleSend} className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                disabled={showWaitWarning || sending}
                                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#94D82A] outline-none"
                            />
                            <button
                                type="submit"
                                disabled={showWaitWarning || sending || !input.trim()}
                                className="bg-[#0B405B] text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {sending ? "..." : "Send"}
                            </button>
                        </form>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-50">
                    Select a contact to start chatting
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
