import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PGPT from "./components/PGPT" 
import { FaRobot, FaCode } from "react-icons/fa"

// Main entry point for the application
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

// Define some example rules
const exampleRules = [
  "Always provide concise answers",
  "Use code examples when applicable",
  "Be friendly and helpful"
];

// Example custom styles
const customStyles = {
  chatContainer: {
    borderRadius: '26px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
  },
  body: {
    // backgroundColor: 'white',
    minHeight: '300px',
  },
  header: {
    background: 'linear-gradient(90deg, #4a6cf7 0%,rgb(247, 244, 44) 100%)',
    color: 'white'
  },
  userBubble: {
    borderRadius: '18px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
  },
  botBubble: {
    borderRadius: '18px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  }
};

root.render(
  <StrictMode>
    <div className="p-4 min-h-screen bg-gray-100 flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">P-GPT Demo</h1>
      
      <div className="my-4 max-w-3xl mx-auto">
        <p className="text-gray-700 text-center mb-8">
          This demo showcases the updated PGPT component with position matching, 
          fixed height normal layout, error messages, and custom styling.
        </p>
      </div>
      
      {/* PGPT with different configurations */}
      
      {/* Normal layout - Positioned in bottom-right corner */}
      <PGPT 
        apiKey="YOUR_API_KEY" 
        model="gpt-4o"
        role="customer_support"
      />
      
      {/* Popup layout - Center */}
      <PGPT 
        apiKey="YOUR_API_KEY" 
        model="gpt-4o"
        initiallyOpen={true}
        llmProvider="openai"
        theme="dark"
        position="bottom-left"
        title="Popup Chat" 
        subtitle="Centered large popup"
        buttonSize="medium"
        chatLayout="popup"
        role="assistant"
        customLogo={<FaRobot className="text-white h-3/5 w-3/5" />}
        errorColor="#ff4444"
        warningColor="#ffaa00"
      />
      
      {/* Custom styled chat */}
      <PGPT 
        apiKey="YOUR_API_KEY" 
        theme="teal"
        position="top-right"
        title="Custom Styled"
        subtitle="With customized elements"
        buttonSize="medium"
        chatLayout="normal"
        role="teacher"
        rules={exampleRules}
        initiallyOpen={false}
        customStyles={customStyles}
        fixedHeight="450px"
      />
      
      {/* Sidebar layout */}
      <PGPT 
        apiKey="YOUR_API_KEY" 
        theme="sunset"
        position="top-left"
        title="Sidebar Chat"
        subtitle="Full height sidebar"
        buttonSize="large"
        chatLayout="sidebar"
        isCloseable={false}
        role="writer"
        showLabelWithLogo={true}
        enableTypingAnimation={true}
      />
    </div>

  </StrictMode>,
);

// Export the components for library usage
export { default as PGPT } from './components/PGPT'; 