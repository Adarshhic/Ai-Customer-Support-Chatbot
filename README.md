# 🤖 AI Customer Support Chatbot — Multi-Tenant SaaS

A full-stack SaaS platform that lets you embed an AI-powered customer support chatbot on **any website** — built with Next.js, MongoDB, Scalekit, and deployed on Vercel.

> Built for developers, startups, SaaS founders, and agencies who want to ship a production-ready chatbot product fast.

---

## 📺 Project Origin

This project was built as part of a **full-stack SaaS tutorial** covering:

- AI-powered chatbot from scratch
- Embeddable chat widget (script/tag based)
- Multi-tenant SaaS architecture
- Auth & organizations with Scalekit
- Secure data storage in MongoDB
- Modern UI with Next.js App Router
- One-click deploy to Vercel

---

## ✨ Features

- 🧠 **AI Chat Engine** — Intelligent responses powered by an LLM integration
- 🏢 **Multi-Tenant Architecture** — Each organization gets an isolated workspace
- 🔐 **Auth & Organizations via Scalekit** — SSO, org management, and secure sessions out of the box
- 📦 **Embeddable Widget** — Drop a `<script>` tag on any site to activate the chatbot
- 🗂️ **Conversation History** — All chats stored and queryable from MongoDB
- ⚙️ **Per-Tenant Config** — Custom system prompts, branding, and settings per client
- 📊 **Dashboard** — Manage clients, view chat logs, configure bots
- 🚀 **Vercel-Ready** — Zero-config deployment

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Backend | Next.js API Routes |
| Database | MongoDB (via Mongoose) |
| Auth & Orgs | Scalekit |
| AI Integration | OpenAI / Anthropic API |
| Widget | Vanilla JS (embeddable script) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
ai-chatbot-saas/
├── app/
│   ├── (dashboard)/         # Protected dashboard routes
│   │   ├── layout.tsx
│   │   ├── page.tsx          # Overview / stats
│   │   ├── clients/          # Manage client sites
│   │   └── chats/            # View conversation logs
│   ├── api/
│   │   ├── chat/             # Chat completion endpoint
│   │   │   └── route.ts
│   │   ├── widget/           # Widget config endpoint
│   │   │   └── route.ts
│   │   └── auth/             # Auth callbacks
│   │       └── [...scalekit]/route.ts
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── callback/page.tsx
│   └── layout.tsx
│
├── components/
│   ├── ChatWidget.tsx         # Embedded chat UI (iframe version)
│   ├── ChatWindow.tsx         # Full dashboard chat view
│   ├── ClientCard.tsx
│   └── ui/                   # Shared UI primitives
│
├── lib/
│   ├── mongodb.ts             # DB connection singleton
│   ├── scalekit.ts            # Scalekit client setup
│   ├── ai.ts                  # AI provider wrapper
│   └── utils.ts
│
├── models/
│   ├── Client.ts              # Tenant/client model
│   ├── Conversation.ts        # Chat session model
│   └── Message.ts             # Individual message model
│
├── public/
│   └── widget.js              # Embeddable chatbot script
│
├── middleware.ts               # Auth protection middleware
├── .env.local.example
└── README.md
```

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-chatbot-saas.git
cd ai-chatbot-saas
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in the values:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/chatbot

# Scalekit (Auth & Organizations)
SCALEKIT_ENV_URL=https://your-env.scalekit.com
SCALEKIT_CLIENT_ID=your_client_id
SCALEKIT_CLIENT_SECRET=your_client_secret

# AI Provider
OPENAI_API_KEY=sk-...
# or
ANTHROPIC_API_KEY=sk-ant-...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🧩 Embedding the Widget

After creating a client in the dashboard, you'll get a unique `clientId`. Add this to any website:

```html
<script>
  window.ChatbotConfig = {
    clientId: "your_client_id",
    primaryColor: "#6366f1",
    welcomeMessage: "Hi! How can I help you today?"
  };
</script>
<script src="https://your-app.vercel.app/widget.js" async></script>
```

That's it. The chatbot will appear in the bottom-right corner of the page.

---

## 🗄️ MongoDB Data Models

### Client (Tenant)
```ts
{
  _id: ObjectId,
  orgId: string,           // Scalekit org ID
  name: string,
  websiteUrl: string,
  systemPrompt: string,    // Custom AI behavior per client
  apiKey: string,          // Widget auth token
  createdAt: Date
}
```

### Conversation
```ts
{
  _id: ObjectId,
  clientId: ObjectId,
  visitorId: string,       // Anonymous session ID
  startedAt: Date,
  lastMessageAt: Date
}
```

### Message
```ts
{
  _id: ObjectId,
  conversationId: ObjectId,
  role: "user" | "assistant",
  content: string,
  createdAt: Date
}
```

---

## 🔐 Authentication Flow (Scalekit)

1. User visits `/auth/login` → redirected to Scalekit
2. After login, Scalekit calls `/api/auth/callback`
3. Session token stored → middleware protects `/dashboard/*`
4. Organizations map 1:1 with tenants — each org sees only their clients and chats

---

## 🚀 Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo directly on [vercel.com](https://vercel.com) and add the environment variables in the project settings.

Make sure to also:
- Add your Vercel URL to Scalekit's allowed redirect URIs
- Set `NEXT_PUBLIC_APP_URL` to your production URL

---

## 💡 Use Cases

- **SaaS products** — Onboarding and support automation
- **E-commerce** — Product Q&A, order tracking chatbot
- **Agencies** — White-label chatbot for multiple clients
- **Startups** — Affordable support layer before hiring a team
- **Portfolios & business sites** — Lead capture and FAQ bot

---

## 🗺️ Roadmap

- [ ] Analytics dashboard (messages/day, top queries)
- [ ] Custom widget themes per client
- [ ] Webhook support for new conversation events
- [ ] RAG support — train bot on uploaded documents
- [ ] Usage-based billing integration (Stripe)
- [ ] Chat handoff to human agent

---

## 🤝 Contributing

PRs and issues are welcome. Please open an issue first to discuss major changes.

---

## 📄 License

MIT License. See [LICENSE](./LICENSE) for details.

---

## 👤 Author

**Adarsh Mishra**  
B.Tech IT — SRCEM Lucknow (2023–2027)  
[GitHub](https://github.com/your-username) · [LinkedIn](https://linkedin.com/in/your-profile) · [LeetCode](https://leetcode.com/hitman_hit)
