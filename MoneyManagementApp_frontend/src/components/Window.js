import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ContentWindow from "./ContentWindow";
import "../styles/windowStyle.css";

function Window() {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className={`window ${isMinimized ? "sidebar-minimized" : ""}`}>
      <Topbar />
      <Sidebar 
        isMinimized={isMinimized} 
        setIsMinimized={setIsMinimized} 
      />
      <ContentWindow />
    </div>
  );
}

export default Window;
