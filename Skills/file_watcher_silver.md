---
skill_name: file_watcher_silver
description: Silver tier watcher for new files in Needs_Action folder
version: 1.0
---

# File Watcher Silver Skill

Task:
- Check the Needs_Action folder every time this skill is called.
- For each new .md file (that you haven't seen before):
  - Read the file content
  - Generate a simple plan: Create a new file in Plans folder called PLAN_[original_filename].md
  - Plan content example:
    ---
    plan_for: [original_filename]
    status: pending
    ---
    # Plan for this task
    - [ ] Read and understand the incoming item
    - [ ] Decide action (reply, archive, etc.)
    - [ ] If sensitive, create approval request in Pending_Approval
    - [ ] Move original to Done after processing
  - Log the action in Logs/watcher_log.md (append line): "Processed [filename] at [current time]"

Rules:
- Use relative paths only (Needs_Action/, Plans/, Logs/ etc.)
- Keep track of processed files in your memory or a simple list
- If no new files, reply "No new files to process"
- If you cannot write files directly, give me exact content and paths to create manually

Call this skill when I say: @watch_files or "check needs action"
