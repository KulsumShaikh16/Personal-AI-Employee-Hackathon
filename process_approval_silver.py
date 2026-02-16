import os
import datetime
from pathlib import Path

def process_approval_silver():
    """
    Process approval requests found in Pending_Approval folder.
    """
    pending_approval_dir = Path("Pending_Approval")
    done_dir = Path("Done")
    needs_action_dir = Path("Needs_Action")
    logs_dir = Path("Logs")
    
    # Create directories if they don't exist
    pending_approval_dir.mkdir(exist_ok=True)
    done_dir.mkdir(exist_ok=True)
    needs_action_dir.mkdir(exist_ok=True)
    logs_dir.mkdir(exist_ok=True)
    
    # Get all .md files in Pending_Approval folder
    approval_files = list(pending_approval_dir.glob("*.md"))
    
    if not approval_files:
        print("No new approval requests to process")
        return
    
    for file_path in approval_files:
        # Read the request content
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract title from content (first line or after title frontmatter)
        title = ""
        lines = content.split('\n')
        for line in lines:
            if line.startswith('# '):  # Markdown heading
                title = line[2:]  # Remove '# ' prefix
                break
            elif line.startswith('title:'):  # Frontmatter
                title = line[6:].strip()  # Remove 'title:' prefix
                break
            elif not line.startswith('---') and line.strip() != '':
                title = line.strip()  # First non-empty, non-frontmatter line
                break
        
        # Determine if it should be approved or denied based on simple criteria
        should_approve = True
        reason = "Automatic approval"
        
        if "urgent" in title.lower() or "critical" in title.lower():
            # Flag for manual review - we'll put it in Needs_Action
            should_approve = False
            reason = "Flagged for manual review due to urgency/critical nature"
        elif "test" in title.lower():
            # Automatically deny test requests
            should_approve = False
            reason = "Automatically denied as a test request"
        elif "safe" in content.lower() or "approved" in content.lower():
            # Approve requests marked as safe
            should_approve = True
            reason = "Approved based on content markers"
        
        # Move the file based on the decision
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        if should_approve:
            # Move to Done folder with approval note
            new_file_path = done_dir / file_path.name
            with open(new_file_path, 'w', encoding='utf-8') as f:
                f.write(content)
                f.write(f"\n\n## Approval Note\n")
                f.write(f"- Approved automatically on {timestamp}\n")
                f.write(f"- Reason: {reason}\n")
            
            print(f"Approved: {file_path.name}")
        else:
            # Move to Needs_Action folder with denial reason
            new_file_path = needs_action_dir / file_path.name
            with open(new_file_path, 'w', encoding='utf-8') as f:
                f.write(content)
                f.write(f"\n\n## Action Required\n")
                f.write(f"- Decision: {reason}\n")
                f.write(f"- Time: {timestamp}\n")
            
            print(f"Action required for: {file_path.name} ({reason})")
        
        # Remove the original file from Pending_Approval
        file_path.unlink()
        
        # Log the decision
        log_file_path = logs_dir / "approval_log.md"
        with open(log_file_path, 'a', encoding='utf-8') as log_file:
            log_file.write(f"- {timestamp}: {file_path.name} - {'APPROVED' if should_approve else 'DENIED/REVIEW'} - {reason}\n")
    
    print("Approval processing complete.")

if __name__ == "__main__":
    process_approval_silver()