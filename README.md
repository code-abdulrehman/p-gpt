# p-gpt


A modern, customizable React chatbot component with beautiful UI themes and OpenAI integration. Add an AI-powered chat assistant to your app in minutes!

![P-GPT Demo](ss2.png)

## ✨ Quick Start

### Installation

Install the package
```bash
npm install p-gpt
```

or with yarn
```bash
yarn add p-gpt
```

or with pnpm
```bash
pnpm add p-gpt
```

### Basic Usage

```jsx
import { PBot } from 'p-gpt';
import 'p-gpt/dist/p-gpt.css'; // Import styles

function App() {
  return (
    <div className="App">
      <h1>My Website</h1>
      
      {/* Add the chatbot anywhere in your app */}
      <PBot 
        apiKey="your-openai-api-key" 
        model="gpt-4" // or gpt-3.5-turbo, etc.
      />
    </div>
  );
}
```

## 🌟 Key Features

- **Beautiful UI Themes** - 10+ pre-designed themes (dark, light, blue, purple, etc.)
- **Multiple Layouts** - Choose between popup, sidebar, or normal chat window
- **Smart AI Responses** - Direct integration with OpenAI's models
- **Typing Effect** - Optional realistic typing animation for responses
- **Customizable** - Easily modify appearance, position, and behavior
- **Conversation Persistence** - Auto-saves chats in browser storage
- **Mobile Responsive** - Works great on all device sizes

## 🔧 Configuration

### Essential Props

| Prop | Type | Description |
|------|------|-------------|
| `apiKey` | string | **Required.** Your OpenAI API key |
| `model` | string | OpenAI model to use (default: first available) |
| `theme` | string | UI theme (default: "blue") |
| `position` | string | Button position (default: "bottom-right") |
| `title` | string | Chat title (default: "PBot Assistant") |

### Example with Common Options

```jsx
<PBot 
  apiKey="your-openai-api-key" 
  model="gpt-4"
  title="Customer Support"
  subtitle="How can we help?"
  theme="dark"
  position="bottom-right"
  enableTypingAnimation={true}
/>
```

## 🎨 Themes

Choose from these beautiful themes:

- `light` - Clean, light theme with blue accents
- `dark` - Dark theme with purple accents
- `blue`, `purple`, `green`, `amber`, `teal`, `indigo`, `red`, `pink`, `midnight`, `sunset`

```jsx
<PBot theme="purple" />
```

## 💼 Customer Support Integration

Create a dedicated customer support chatbot with just a few lines of code:

```jsx
<PBot 
  apiKey="your-openai-api-key"
  title="Customer Support"
  subtitle="We're here to help!"
  theme="blue"
  systemMessage="You are a helpful customer support agent for our company. Help users with their questions about our products and services. Be friendly, professional, and concise."
  welcomeMessage="Hello! I'm your customer support assistant. How can I help you today?"
  rules={[
    "Always be polite and professional",
    "If you don't know the answer, suggest contacting our support team at support@example.com",
    "Offer clear step-by-step instructions when providing solutions"
  ]}
/>
```

For different support departments:

```jsx
// Technical Support
<PBot 
  role="coder"  // Technical mindset
  title="Tech Support" 
  systemMessage="You are a technical support specialist. Help users solve technical problems with our software."
/>

// Billing Support
<PBot 
  title="Billing Support"
  systemMessage="You are a billing support specialist. Help users with questions about their account, subscriptions, and payments."
/>

// Product Support
<PBot 
  title="Product Help" 
  systemMessage="You are a product specialist. Help users understand how to use our product features effectively."
/>
```

## 📋 Layout Options

| Layout | Description |
|--------|-------------|
| `normal` | Standard chat window (default) |
| `popup` | Large, centered popup |
| `sidebar` | Full-height sidebar |

```jsx
<PBot chatLayout="sidebar" />
```

## 💬 Assistant Roles

Set up specialized assistants with predefined personalities:

```jsx
<PBot role="coder" />  // Programming assistant
<PBot role="customer_support" /> // Customer Support assistant 
<PBot role="teacher" /> // Educational assistant
```

Available roles: `assistant`, `coder`, `writer`, `teacher`, `researcher`, `translator`, `customer_support`

## 🎭 Custom Styling

Apply your own styles to match your brand:

```jsx
const customStyles = {
  chatContainer: { borderRadius: '16px' },
  header: { background: 'linear-gradient(90deg, #4a6cf7, #4a2cf7)' },
  userBubble: { borderRadius: '18px' },
  botBubble: { borderRadius: '18px' }
};

<PBot customStyles={customStyles} />
```

## 📱 Responsive Options

Control size and position:

```jsx
<PBot 
  position="bottom-right" // or "bottom-left", "top-right", "top-left"
  buttonSize="medium"     // or "small", "large"
  fixedHeight="400px"     // for normal layout
/>
```

## 🔄 Managing Conversations

The library provides utilities to manage saved conversations:

```jsx
import { getAllPBotConversations, clearPBotConversation, clearAllPBotConversations } from 'p-gpt';

// Get all saved conversations
const conversations = getAllPBotConversations();

// Clear a specific conversation
clearPBotConversation('conversation-id');

// Clear all conversations
clearAllPBotConversations();
```

## 👨‍👩‍👧‍👦 Browser Support

Compatible with all modern browsers:
- Chrome, Firefox, Safari, Edge (latest versions)

## 🛠️ Complete Props Reference


| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiKey` | string | - | OpenAI API key (required) |
| `llmProvider` | string | "openai" | LLM provider |
| `model` | string | (first available) | OpenAI model name |
| `placeholder` | string | "Type your message here..." | Input placeholder text |
| `title` | string | "PBot Assistant" | Title displayed in header |
| `subtitle` | string | "AI-powered chat assistant" | Subtitle displayed in header |
| `theme` | string | "blue" | UI theme |
| `position` | string | "bottom-right" | Position of chat button |
| `welcomeMessage` | string | "Hello! How can I help you today?" | Initial message from bot |
| `buttonSize` | string | "medium" | Size of chat button |
| `initiallyOpen` | boolean | false | Whether chat is initially open |
| `role` | string | "assistant" | Role template for the bot |
| `rules` | string[] | [] | Rules to guide AI responses |
| `customLogo` | React.ReactNode | - | Custom icon for button/header |
| `chatLayout` | string | "normal" | Layout style |
| `minHeight` | string | "28rem" | Minimum height of chat window |
| `maxHeight` | string | "80vh" | Maximum height of chat window |
| `systemMessage` | string | - | Custom system message for AI |
| `customStyles` | object | {} | Custom styles for elements |
| `showLabelWithLogo` | boolean | false | Show title with logo in button |
| `fixedHeight` | string | "400px" | Fixed height for normal layout |
| `errorColor` | string | "#ef4444" | Color of error notifications |
| `warningColor` | string | "#f59e0b" | Color of warning notifications |
| `isCloseable` | boolean | true | Whether chat can be closed |
| `enableTypingAnimation` | boolean | false | Enable typing animation |


## 🔗 Links

- [GitHub Repository](https://github.com/p-gpt/p-gpt)
- [Issue Tracker](https://github.com/p-gpt/p-gpt/issues)
- [NPM Package](https://www.npmjs.com/package/p-gpt)

## 👨‍💻 Author

P-GPT is created and maintained by Abdul Rehman.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT