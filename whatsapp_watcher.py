from playwright.sync_api import sync_playwright
from pathlib import Path
import time
import logging

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("WhatsAppWatcher")

# Vault path (updated to match actual path)
VAULT_PATH = Path("E:/gemini-cli/Hackathon 0/AI_Employee_Vault")
NEEDS_ACTION = VAULT_PATH / "Needs_Action"

# Create directories if they don't exist
NEEDS_ACTION.mkdir(parents=True, exist_ok=True)
(VAULT_PATH / "Secrets").mkdir(parents=True, exist_ok=True)

# Keywords to detect
URGENT_KEYWORDS = ["urgent", "asap", "invoice", "payment", "help", "jaldi", "paisa"]

def whatsapp_watcher():
    with sync_playwright() as p:
        # Launch browser in headless mode (without UI) since this is for testing
        browser = p.chromium.launch(headless=False, slow_mo=500)  # slow_mo for visibility
        context = browser.new_context()

        # Try to load existing session if available
        session_file = VAULT_PATH / "Secrets" / "whatsapp_session.json"
        if session_file.exists():
            try:
                context = browser.new_context(storage_state=str(session_file))
                logger.info("Loaded existing WhatsApp session")
            except:
                logger.info("No existing session, will need to scan QR code")
        else:
            logger.info("No existing session, will need to scan QR code")

        page = context.new_page()
        page.goto("https://web.whatsapp.com")

        print("WhatsApp Web has opened. If this is your first time, scan QR code with your phone.")
        print("If you've used this before, the session should load automatically.")
        print("Press Ctrl+C to stop the watcher.")

        # Wait for page to load
        try:
            page.wait_for_selector('div[data-testid="chat-list"]', timeout=15000)
            logger.info("WhatsApp Web loaded successfully!")
        except:
            # If we can't detect the chat list, we may still be waiting for QR code
            print("Waiting for QR code scan (if this is your first time)...")
            input("Press Enter after scanning QR code to continue...")

        while True:
            try:
                # Check for unread chats or new messages (selector may change - inspect element to verify)
                unread_chats = page.query_selector_all('[data-testid="chat"] [data-testid="muted"]')

                # Alternative selector for unread messages
                if not unread_chats:
                    unread_chats = page.query_selector_all('div[aria-label*="unread"]')

                # Another possible selector for unread messages
                if not unread_chats:
                    unread_chats = page.query_selector_all('div[aria-label*="Unread"]')

                for chat in unread_chats:
                    chat.click()  # Open the chat
                    time.sleep(2)  # Wait for load

                    # Get messages - selector may vary depending on WhatsApp Web version
                    messages = page.query_selector_all('div[data-testid="msg"]')
                    if not messages:
                        # Alternative selector for messages
                        messages = page.query_selector_all('div.message-in, div.message-out')

                    if messages:
                        last_message = messages[-1].inner_text().lower()
                        sender_element = page.query_selector('div[title]') or page.query_selector('div.chat-title')
                        sender_name = sender_element.inner_text() if sender_element else "Unknown Sender"

                        # Check for urgent keywords
                        if any(keyword in last_message for keyword in URGENT_KEYWORDS):
                            timestamp = time.strftime("%Y-%m-%d_%H-%M-%S")
                            filename = f"WHATSAPP_{sender_name.replace(' ', '_')}_{timestamp}.md"
                            filepath = NEEDS_ACTION / filename

                            content = f"""---
type: whatsapp
from: {sender_name}
time: {timestamp}
priority: high
status: pending
---

## Message
{last_message}

## Suggested Actions
- [ ] Reply
- [ ] Forward
- [ ] Create invoice if needed
- [ ] Move to Done after processing
"""

                            filepath.write_text(content)
                            logger.info(f"Urgent message saved: {filename}")

                    page.goto("https://web.whatsapp.com")  # Back to main chat list
                    time.sleep(1)

                time.sleep(60)  # Check every 60 seconds

            except KeyboardInterrupt:
                logger.info("WhatsApp watcher stopped by user")
                break
            except Exception as e:
                logger.error(f"Error: {e}")
                time.sleep(30)

if __name__ == "__main__":
    whatsapp_watcher()