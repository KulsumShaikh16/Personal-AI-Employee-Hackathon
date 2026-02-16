# Personal AI Employee – Silver Tier Hackathon Project

A local-first, agent-driven Personal AI Employee that proactively manages Gmail, WhatsApp, LinkedIn, and more.

## Key Features (Silver Tier)
- Gmail Watcher: Monitors unread important emails → creates .md files in Needs_Action
- WhatsApp Watcher: Monitors urgent messages (keywords: urgent, invoice, payment, asap) → creates .md files
- LinkedIn Real Posting: Generates and publishes posts via official API
- Reasoning Loop: Creates Plan.md files with checkboxes for new items
- Human-in-the-Loop Approval: Pending_Approval folder for sensitive actions
- Reusable Agent Skills saved in Skills/ folder
- All sensitive files (credentials, tokens, sessions) protected via .gitignore

## Setup Instructions
1. Install dependencies:
   ```
   pip install requests google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client playwright
   ```
2. Set up Gmail API credentials (follow instructions in GMAIL_CREDENTIALS_SETUP.md)
3. Run the system:
   - For Gmail watcher: `python check_gmail.py`
   - For WhatsApp watcher: `python whatsapp_watcher.py` (scan QR code when prompted)
   - For LinkedIn posting: `python linkedin_real_post.py`

## Project Structure
- `Needs_Action/` - Items requiring your attention
- `Plans/` - Generated action plans
- `Done/` - Completed tasks
- `Skills/` - Reusable agent skills
- `Pending_Approval/` - Actions requiring human approval
- `Logs/` - System logs
- `Secrets/` - Sensitive data (protected by .gitignore)

## Security
- Credentials and tokens are stored in protected files excluded from git
- Human approval required for sensitive actions like LinkedIn posting
- Local-first architecture keeps your data private

## Testing
Run the test suite to verify all components:
- `python test_credentials_format.py`
- `python test_gmail_auth.py`
- `python test_whatsapp_watcher.py`

