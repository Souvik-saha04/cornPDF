import { useState } from 'react';
import './Dashboard.css';

import Sidebar from "./components/Sidebar/Sidebar";
import HomePanel from "./components/HomePanel/Homepanel";
import ChatPanel from "./components/ChatPanel/Chatpanel";
import SummaryPanel from "./components/SummaryPanel/Summarypanel";
import QuizPanel from "./components/QuizPanel/Quizpanel";
import SearchPanel from "./components/SearchPanel/Searchpanel";
import { MOCK_DOCS } from "./components/Mockdata";

export default function Dashboard({ user, onLogout }) {
  const [activeDoc,   setActiveDoc]   = useState(MOCK_DOCS[0]);
  const [activeView,  setActiveView]  = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleUpload = () => {
    setActiveDoc(MOCK_DOCS[0]);
    setActiveView('chat');
  };

  const handleDocSelect = (doc) => {
    setActiveDoc(doc);
    setActiveView('chat');
  };

  const renderPanel = () => {
    switch (activeView) {
      case 'home':    return <HomePanel    onDocSelect={handleDocSelect} onUpload={handleUpload} />;
      case 'chat':    return <ChatPanel    doc={activeDoc} userName={user?.name} />;
      case 'summary': return <SummaryPanel doc={activeDoc} />;
      case 'quiz':    return <QuizPanel    doc={activeDoc} />;
      case 'search':  return <SearchPanel />;
      default:        return null;
    }
  };

  return (
    <div className="dashboard">
      <button className="sidebar__toggle" onClick={() => setSidebarOpen(o => !o)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6"  x2="21" y2="6"  />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {sidebarOpen && (
        <div
          className="sidebar__overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
        
      <Sidebar
        activeDoc={activeDoc}
        setActiveDoc={setActiveDoc}
        activeView={activeView}
        setActiveView={setActiveView}
        user={user}
        onLogout={onLogout}
        onUpload={handleUpload}
        isOpen={sidebarOpen}
      />
      
      <main className="dashboard__main">
        {renderPanel()}
      </main>
    </div>
  );
}