---
skill_name: process_approval_silver
description: Process approval requests found in Pending_Approval folder
version: 1.0
---

# Process Approval Silver Skill

This skill processes approval requests found in the Pending_Approval folder.

## Task:
- Check the Pending_Approval folder for new .md files
- For each approval request:
  - Read the request content
  - Determine if it should be approved or denied based on simple criteria
  - Move approved requests to Done folder with approval note
  - Move denied requests to Needs_Action folder with denial reason
  - Log the decision in Logs/approval_log.md

## Simple Criteria for Approval:
- Requests with "urgent" or "critical" in the title: Flag for manual review
- Requests from known safe sources: Approve automatically
- Requests with "test" in the title: Deny automatically
- All other requests: Approve automatically

## Rules:
- Use relative paths only (Pending_Approval/, Done/, Needs_Action/, Logs/)
- Log all decisions with timestamp
- If no new approval requests, reply "No new approval requests to process"

Run this skill when I say: @process_approval_silver or "process approvals"