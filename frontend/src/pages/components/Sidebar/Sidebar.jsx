import './Sidebar.css';
import { MOCK_DOCS } from '../Mockdata';
import { AiFillHome } from "react-icons/ai";
import { BsChatLeftDotsFill } from "react-icons/bs";
import { TbNotes } from "react-icons/tb";
import { PiExam } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";




export default function Sidebar({ activeDoc, setActiveDoc, activeView, setActiveView, user, onLogout, onUpload, isOpen }) {
  const navItems = [
    { id: 'home',    label: 'Home',    icon: <AiFillHome /> },
    { id: 'chat',    label: 'Ask AI',  icon: <BsChatLeftDotsFill /> },
    { id: 'summary', label: 'Summary', icon: <TbNotes /> },
    { id: 'quiz',    label: 'Quiz',    icon: <PiExam />},
    { id: 'search',  label: 'Search',  icon: <FaSearch />},
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__logo">
        <img src="/cornPDF_logo.png" alt="cornPDF logo" />
      </div>

      <button className="sidebar__upload-btn" onClick={onUpload}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Upload Document
      </button>

      <div className="sidebar__section-title">Navigation</div>
      <nav className="sidebar__nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`sidebar__nav-item ${activeView === item.id ? 'sidebar__nav-item--active' : ''}`}
            onClick={() => setActiveView(item.id)}
          >
            <div className="sidebar__nav-item-icon">{item.icon}</div>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar__section-title" style={{ marginTop: '0.5rem' }}>Your Documents</div>
      <div className="sidebar__docs">
        {MOCK_DOCS.map(doc => (
          <button
            key={doc.id}
            className={`sidebar__doc-item ${activeDoc?.id === doc.id ? 'sidebar__doc-item--active' : ''}`}
            onClick={() => { setActiveDoc(doc); setActiveView('chat'); }}
          >
            <div className="sidebar__doc-icon" style={{ background: `linear-gradient(135deg, ${doc.color}, ${doc.color}88)` }}>
              {doc.emoji}
            </div>
            <div>
              <div className="sidebar__doc-name">{doc.name.split('—')[0].trim()}</div>
              <div className="sidebar__doc-date">{doc.date}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="premium-banner">
        <div>
          <div className="premium-banner__text">⚡ Premium</div>
          <div className="premium-banner__price">$19 / month</div>
        </div>
        <button className="premium-banner__btn">›</button>
      </div>

      
    </aside>
  );
}

