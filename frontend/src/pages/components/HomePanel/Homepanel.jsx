import { useState } from 'react';
import './Homepanel.css';
import { MOCK_DOCS } from '../Mockdata';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase/config';




export default function HomePanel({ onDocSelect, onUpload }) {
  const [drag, setDrag] = useState(false);
  const navigate=useNavigate();
  const features = [
    { emoji: '💬', title: 'Ask Questions',    desc: 'Chat with your documents naturally',    accent: '#f5c518' },
    { emoji: '✨', title: 'Smart Summaries',  desc: 'Get concise overviews in seconds',      accent: '#f97316' },
    { emoji: '🧩', title: 'Generate Quizzes', desc: 'Test your knowledge automatically',     accent: '#fbbf24' },
    { emoji: '🔍', title: 'Semantic Search',  desc: 'Find anything across all documents',    accent: '#ef4444' },
    { emoji: '💡', title: 'Extract Insights', desc: 'Surface hidden patterns & key data',    accent: '#f5c518' },
  ];
  async function Logout(){
    try{
      await signOut(auth);
      localStorage.removeItem("token");
      navigate('/');
    }
    catch(error){
      console.error("Logout error:",error)
    }
  }
  return (
    <div className="panel home-panel">
      <div className="home-panel__header">
        <h1 className="home-panel__greeting">
          Good morning,  
          <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={()=>{Logout()}}>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu><mark>Genius</mark>
        </h1>
        <p className="home-panel__sub">What would you like to explore today?</p>
      </div>

      <div
        className={`upload-zone ${drag ? 'upload-zone--active' : ''}`}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); onUpload(); }}
      >
        <div className="upload-zone__icon">
          <svg width="44" height="36" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 28V14M22 14L16 20M22 14L28 20" stroke="#f5c518" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 28H10a8 8 0 1 1 2.17-15.71A10 10 0 1 1 34 18h-2" stroke="#f5c518" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
        <div className="upload-zone__title">Drop your PDF here</div>
        <p className="upload-zone__sub">Supports PDF, DOCX, TXT — up to 50 MB</p>
        <button className="upload-zone__btn" onClick={onUpload}>Browse Files</button>
      </div>

      <div className="feature-grid">
        {features.map(f => (
          <div
            key={f.title}
            className="feature-card"
            style={{ '--card-accent': f.accent }}
            onClick={() => onDocSelect(MOCK_DOCS[0])}
          >
            <span className="feature-card__emoji">{f.emoji}</span>
            <div className="feature-card__title">{f.title}</div>
            <div className="feature-card__desc">{f.desc}</div>
          </div>
        ))}
      </div>

      <div className="recent-docs__title">Recent Documents</div>
      <div className="recent-docs-grid">
        {MOCK_DOCS.map(doc => (
          <div key={doc.id} className="doc-card" onClick={() => onDocSelect(doc)}>
            <div className="doc-card__header">
              <div className="doc-card__icon" style={{ background: `${doc.color}18` }}>
                {doc.emoji}
              </div>
              <div className="doc-card__badge" style={{ background: `${doc.color}18`, color: doc.color }}>
                PDF
              </div>
            </div>
            <div className="doc-card__name">{doc.name}</div>
            <div className="doc-card__meta">{doc.size} · {doc.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}