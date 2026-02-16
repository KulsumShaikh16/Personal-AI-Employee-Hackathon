---
skill_name: approval_workflow_silver
description: Handles sensitive actions with human approval
version: 1.0
---

# Approval Workflow Silver Skill

Task:
- For any sensitive action (payment > $50, new email, post to social):
  - Create file in Pending_Approval/approval_[id]_[date].md
  - Content example:
    ---
    type: approval_request
    action: send_email / post_linkedin / payment
    details: [full details]
    amount: $100 (if applicable)
    reason: [why needed]
    ---
    To approve: Move this file to Approved folder
    To reject: Move to Rejected folder

- If file moved to Approved, execute the action (or log "Ready to execute")
- If Rejected, log "Action cancelled"

Rules:
- Never execute sensitive action without approval
- Check Pending_Approval folder when called

Call this skill when I say: @request_approval details:"Send invoice to client"
