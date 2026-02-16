import os
import datetime
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from pathlib import Path

def check_gmail():
    """
    Gmail Watcher Silver Skill Implementation
    Checks for new unread important emails and creates .md files in Needs_Action
    """
    # Authenticate with Gmail
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', ['https://www.googleapis.com/auth/gmail.readonly'])
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            print("Error: No valid credentials found. Please run test_gmail_auth.py first to authenticate.")
            return
    
    service = build('gmail', 'v1', credentials=creds)
    
    # Query for unread important emails
    query = "is:unread is:important"
    results = service.users().messages().list(
        userId='me',
        q=query,
        maxResults=10
    ).execute()
    
    messages = results.get('messages', [])
    
    if not messages:
        print("No new unread important emails found.")
        return
    
    # Create Needs_Action folder if it doesn't exist
    needs_action_dir = Path("Needs_Action")
    needs_action_dir.mkdir(exist_ok=True)
    
    # Create Logs folder if it doesn't exist
    logs_dir = Path("Logs")
    logs_dir.mkdir(exist_ok=True)
    
    for msg in messages:
        msg_detail = service.users().messages().get(userId='me', id=msg['id']).execute()
        
        # Extract headers
        headers = msg_detail['payload']['headers']
        email_data = {}
        
        for header in headers:
            name = header['name'].lower()
            if name == 'from':
                email_data['from'] = header['value']
            elif name == 'subject':
                email_data['subject'] = header['value']
        
        # Extract snippet
        snippet = msg_detail.get('snippet', '')
        
        # Create markdown file in Needs_Action
        message_id = msg['id']
        filename = f"EMAIL_{message_id}.md"
        filepath = needs_action_dir / filename
        
        # Get current time
        current_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        # Create content
        content = f"""---
type: email
from: {email_data.get('from', 'Unknown')}
subject: {email_data.get('subject', 'No Subject')}
received: {current_time}
priority: high
status: pending
---
## Content
{snippet}

## Suggested Actions
- [ ] Reply
- [ ] Forward
- [ ] Archive
"""
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Created email file: {filename}")
        
        # Log the action
        log_file = logs_dir / "gmail_watcher_log.md"
        with open(log_file, 'a', encoding='utf-8') as log:
            log.write(f"- {current_time}: Created {filename} from email '{email_data.get('subject', 'No Subject')}'\n")
    
    print(f"Processed {len(messages)} new important emails.")
    
    # After creating the email files, call the reasoning loop to create plans
    print("Calling @reasoning_loop_silver to create plans for new emails...")
    # In a real implementation, this would call the reasoning loop skill

if __name__ == "__main__":
    check_gmail()