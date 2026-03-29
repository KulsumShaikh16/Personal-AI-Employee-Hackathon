# Personal AI Employee - Gold Tier

A **local-first, autonomous AI Employee** that works 24/7 like a real senior employee — managing communications, accounting, social media, and business operations with human oversight.

Built for the **Personal AI Employee Hackathon 2026**.

---

## 🏆 Key Features (Gold Tier)

### Core Automation
- **Gmail Watcher** — Automatically processes important unread emails
- **WhatsApp Watcher** — Detects urgent messages ("invoice", "payment", "urgent", etc.)
- **LinkedIn Real Poster** — Generates and publishes professional posts
- **Odoo Auto Invoice** — Automatically creates draft invoices in Odoo when "invoice" keyword is detected
- **Human-in-the-Loop Approval** — Requires human approval for sensitive actions (payments, important emails, posts)

### Intelligence Layer
- Reusable **Agent Skills** system (`Skills/` folder)
- **Reasoning Loop** — Creates detailed Plan.md files for every new item
- **Weekly CEO Briefing** — Automatically generates professional weekly report every Sunday night

### Dashboard & UI
- Modern, futuristic **Next.js Dashboard** with neon + glassmorphism theme
- Real-time status of watchers, pending actions, approval queue, and logs

### Security & Architecture
- Local-first design (all data stays on your machine)
- Sensitive files (credentials, tokens, sessions) are ignored via `.gitignore`
- Proper logging and error handling

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Odoo Community running on `http://localhost:8069`
- Gmail API credentials (`credentials.json`)
- WhatsApp Web login (QR code scan once)

### Installation

```bash
cd AI_Employee_Vault

# Install dependencies
pip install playwright google-api-python-client watchdog requests framer-motion lucide-react

# Install browsers for Playwright
playwright install
```
