# P-GPT: React AI Chat Assistant

A modern, customizable React chat component with multiple themes, layouts, and OpenAI integration. Add an AI-powered chat assistant to your React app in minutes!

![P-GPT Demo](ss2.png)

## 🚀 Features

- **Beautiful UI Themes** - 15+ themes with light/dark mode variants
- **Responsive Layouts** - Popup, sidebar, or inline chat windows
- **Smart AI Integration** - Connect to OpenAI or your custom backend API
- **Highly Customizable** - Appearance, position, behavior, and more
- **Dark Mode Support** - All themes come with dark mode variants
- **Conversation History** - Auto-saves chats in browser storage
- **Typing Animation** - Optional realistic typing effect for responses
- **Mobile Responsive** - Works great on all device sizes

## 📦 Installation

```bash
# With npm
npm install p-gpt

# With yarn
yarn add p-gpt

# With pnpm (recommended)
pnpm add p-gpt
```

## 🔧 Quick Start

### Basic Usage with OpenAI

```jsx
import { PGPT } from 'p-gpt';
import 'p-gpt/dist/index.css'; // Import styles

function App() {
  return (
    <div className="App">
      <PGPT 
        apiKey="your-openai-api-key" 
        model="gpt-4o" 
        theme="chatgpt"
        appearance="dark" // For dark mode
      />
    </div>
  );
}

export default App;
```

### With Custom API Endpoint

```jsx
import { PGPT } from 'p-gpt';
import 'p-gpt/dist/index.css';

function App() {
  return (
    <div className="App">
      <PGPT 
        routerConfig={{
          endpoint: "https://your-api.com/chat",
          maxTokens: 2000,
          customPayload: {
            // Optional custom payload
            temperature: 0.7
          }
        }}
        theme="gemini"
        appearance="light"
      />
    </div>
  );
}
```

## 🎨 Themes

P-GPT comes with beautiful pre-designed themes that support both light and dark modes:

### Popular LLM Themes
- `chatgpt` - OpenAI's ChatGPT theme (green accents)
- `gemini` - Google's Gemini theme (purple accents)
- `grok` - X's Grok theme (red/orange accents)
- `claude` - Anthropic's Claude theme (purple accents)
- `copilot` - GitHub Copilot theme (blue accents)

### Color Themes
- `light` / `dark` - Classic light and dark themes
- `blue`, `purple`, `green`, `amber`, `teal`, `indigo`, `red`, `pink`
- `midnight` - Deep black theme with blue accents
- `sunset` - Orange-red gradient theme
- `gold`, `silver`, `titanium`, `premium` - Metallic gradient themes

Apply a theme with dark mode:
```jsx
<PGPT 
  theme="chatgpt"  
  appearance="dark"  // "light" or "dark"
/>
```

## 📍 Positioning

Position your chat button and window anywhere on the screen:

```jsx
// Standard corner positions
<PGPT position="bottom-right" /> // Default
<PGPT position="bottom-left" />
<PGPT position="top-right" />
<PGPT position="top-left" />

// Special layouts
<PGPT position="center" />
<PGPT position="left-full-height" />
<PGPT position="right-full-height" />
<PGPT position="fullscreen" />

// Custom position with exact coordinates
<PGPT 
  position={{ 
    x: "20px",   // or number like 20
    y: "50px",   // or relative units like "5vh"
    offsetX: "10px",  // Optional chat window offset
    offsetY: "10px"   // Optional chat window offset
  }} 
/>
```

## 🧠 AI Configuration

### OpenAI Integration

```jsx
<PGPT 
  apiKey="your-openai-api-key"
  model="gpt-4o" // or "gpt-3.5-turbo", etc.
  llmProvider="OpenAI"
/>
```

### Custom Backend

```jsx
<PGPT 
  routerConfig={{
    endpoint: "https://your-api.com/chat",
    headers: {
      "Authorization": "Bearer your-auth-token",
      "Content-Type": "application/json"
    },
    maxTokens: 2000
  }}
/>
```

Your backend should accept messages in this format:
```json
{
  "messages": [
    {"role": "system", "content": "You are a helpful assistant..."},
    {"role": "user", "content": "Hello, how are you?"}
  ],
  "model": "custom-model",
  "temperature": 0.7,
  "max_tokens": 2000
}
```

And respond with:
```json
{
  "role": "bot",
  "content": "I'm doing well, thank you for asking! How can I assist you today?"
}
```

## 💅 Customization

Customize content, appearance, and behavior:

```jsx
<PGPT 
  // Content
  content={{
    title: "Customer Support",
    subtitle: "We're here to help!",
    welcomeMessage: "Hello! How can I assist you today?",
    placeholder: "Type your question here...",
    systemMessage: "You are a helpful customer support agent..."
  }}
  
  // Appearance
  theme="chatgpt"
  appearance="dark"
  colors={{
    primary: "#10a37f",
    secondary: "#1a7f64"
  }}
  buttonSize="medium" // "small", "medium", "large"
  buttonStyle="circle" // "circle", "rounded", "square", "pill"
  
  // Behavior
  defaultOpen={false}
  openTrigger="click" // "click" or "hover"
  enableTypingAnimation={true}
  
  // Layout
  chatLayout="normal" // "normal", "popup", "sidebar"
  position="bottom-right"
  
  // Storage
  storage={{
    type: "localStorage" // "localStorage", "sessionStorage", "none", "custom"
  }}
/>
```

### Custom Styles

Apply your own CSS-in-JS styles:

```jsx
<PGPT 
  styles={{
    chatContainer: { borderRadius: '16px' },
    header: { background: 'linear-gradient(90deg, #4a6cf7, #4a2cf7)' },
    userBubble: { borderRadius: '18px' },
    botBubble: { borderRadius: '18px' }
  }}
/>
```

## 👨‍💻 Advanced Features

### Assistant Roles

Create specialized assistants:

```jsx
<PGPT 
  role="coder" // Programming assistant
  // Other roles: "assistant", "writer", "teacher", "researcher", "translator"
/>
```

### Rules System

Add guardrails for your assistant's behavior:

```jsx
<PGPT 
  rules={[
    "Always be polite and professional",
    "If you don't know the answer, suggest contacting our support team",
    "Never share personal information or financial advice",
    "Offer clear step-by-step instructions when providing solutions"
  ]}
/>
```

### Loading Animation Options

Choose from different loading indicators:

```jsx
<PGPT loadingAnimation="dots" /> // "dots", "spinner", "pulse", "bar", "typingDots"
```

## 📱 Responsive Configuration

Control sizing for different devices:

```jsx
<PGPT 
  minHeight="28rem"
  maxHeight="80vh"
  fixedHeight="400px" // For normal layout
/>
```

## 📋 Complete Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiKey` | string | - | OpenAI API key |
| `routerConfig` | object | - | Custom API endpoint config |
| `theme` | string | "blue" | UI theme |
| `appearance` | string | "light" | "light" or "dark" mode |
| `model` | string | "gpt-4o" | LLM model to use |
| `position` | string/object | "bottom-right" | Button position |
| `content` | object | {} | Text content configuration |
| `colors` | object | {} | Custom color overrides |
| `classes` | object | {} | Custom CSS classes |
| `styles` | object | {} | Custom inline styles |
| `useTextarea` | boolean | false | Use textarea vs input |
| `enableTypingAnimation` | boolean | true | Show typing animation |
| `defaultOpen` | boolean | false | Open on load |
| `openTrigger` | string | "click" | "click" or "hover" |
| `isCloseable` | boolean | true | Show close button |
| `storage` | object | { type: "local" } | History storage config |
| `logo` | ReactNode | - | Custom logo element |
| `buttonSize` | string | "medium" | Button size |
| `buttonStyle` | string | "circle" | Button shape |
| `llmProvider` | string | "OpenAI" | LLM provider name |
| `role` | string | "assistant" | Assistant personality |
| `rules` | string[] | [] | Behavior guidelines |
| `minHeight` | string | "28rem" | Min chat height |
| `maxHeight` | string | "80vh" | Max chat height |
| `fixedHeight` | string | "" | Fixed chat height |
| `chatLayout` | string | "normal" | Window layout |
| `showLabelWithLogo` | boolean | false | Show text with icon |
| `bubbleStyle` | string | "modern" | Message bubble style |
| `loadingAnimation` | string | "typingDots" | Loading indicator |
| `bubbleAnimation` | boolean | true | Animate bubbles |
| `onSendMessage` | function | - | Message sent callback |
| `onReceiveMessage` | function | - | Message received callback |
| `onOpen` | function | - | Open event callback |
| `onClose` | function | - | Close event callback |

## 🔗 Links

- [GitHub Repository](https://github.com/code-abdulrehman/p-gpt)
- [NPM Package](https://www.npmjs.com/package/p-gpt)
- [Issue Tracker](https://github.com/code-abdulrehman/p-gpt/issues)

## 📄 License

MIT © [P-GPT Team](https://github.com/code-abdulrehman)