import { useState } from 'react';
import './Homepanel.css';
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
import { useRef } from "react";
import { useEffect } from "react";


export default function HomePanel({ onDocSelect }) {
  const [drag, setDrag] = useState(false);
  const [file,setFile]=useState(null);
  const [loading,setLoading]=useState(false);
  const [documents,setDocuments]=useState([])
  const navigate=useNavigate();
  const fileInputRef = useRef(null);

  
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

  const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];

  if (!selectedFile) return;

  if (selectedFile.type !== "application/pdf") {
    alert("Only PDF files are allowed");
    return;
  }

  if (selectedFile.size > 10 * 1024 * 1024) {
    alert("File must be less than 10MB");
    return;
  }

  setFile(selectedFile);
};

  const onUpload = async () => {
  if (!file) {
    alert("Please select a file");
    return;
  }

  const user = auth.currentUser;

  if (!user) {
    alert("User not logged in");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pdf_upload");
    formData.append("folder", `users/${user.uid}/documents`);

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dnsjnscsh/auto/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!data.secure_url) {
      throw new Error("Upload failed");
    }

    console.log("Upload Response:", data);

    const fileUrl = data.secure_url;
    const publicId = data.public_id;

    alert("Upload successful!");
    const token = await user.getIdToken();

const backend_res = await fetch("http://127.0.0.1:8000/documents/create/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
  body: JSON.stringify({
    public_id: publicId,
    file_url: fileUrl,
    file_name: file.name,
    file_size: file.size,
  }),
});

if (!backend_res.ok) {
  throw new Error("Backend failed");
}

const res = await backend_res.json();

alert(res.message);
    setFile(null);

  } catch (error) {
    console.error("Upload error:", error);
    alert("Upload failed");
  } finally {
    setLoading(false);
  }
};

const fetchDocuments = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const token = await user.getIdToken();

    try {
      const res = await fetch("http://127.0.0.1:8000/documents/", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setDocuments(data);

    } catch (err) {
      console.error("Error fetching documents:", err);
    }
  };
useEffect(() => {
  fetchDocuments();
}, []);

const handleDrop = (e) => {
  e.preventDefault();
  setDrag(false);

  const droppedFile = e.dataTransfer.files[0];

  if (!droppedFile) return;

  if (droppedFile.type !== "application/pdf") {
    alert("Only PDF files allowed");
    return;
  }

  setFile(droppedFile);
};

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
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
      >
        <div className="upload-zone__icon">📄</div>
        <div className="upload-zone__title">
          {file ? file.name : "Drop your PDF here"}
        </div>
        <p className="upload-zone__sub">
          Supports PDF — up to 10MB
        </p>
        {/* Hidden input */}
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {/* Browse button */}
        <button
          className="upload-zone__btn"
          onClick={() => fileInputRef.current.click()}
        >
          Browse Files
        </button>
        {/* Upload button */}
        <button
          className="upload-zone__btn"
          onClick={onUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <div className="feature-grid">
        {features.map(f => (
          <div
            key={f.title}
            className="feature-card"
            style={{ '--card-accent': f.accent }}
            onClick={() => onDocSelect(documents[0])}
          >
            <span className="feature-card__emoji">{f.emoji}</span>
            <div className="feature-card__title">{f.title}</div>
            <div className="feature-card__desc">{f.desc}</div>
          </div>
        ))}
      </div>

      <div className="recent-docs-grid">
  {documents.map(doc => (
    <div
      key={doc.id}
      className="doc-card"
      onClick={() => window.open(doc.file_url, "_blank")}
    >
      <div className="doc-card__header">
        <div className="doc-card__icon">
          📄
        </div>

        <div className="doc-card__badge">
          PDF
        </div>
      </div>

      <div className="doc-card__name">
        {doc.file_name}
      </div>

      <div className="doc-card__meta">
        {doc.status} · {new Date(doc.uploaded_at).toLocaleDateString()}
      </div>
    </div>
  ))}
</div>
    </div>
  );
}