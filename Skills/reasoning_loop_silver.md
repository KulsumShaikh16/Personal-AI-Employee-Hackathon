---
skill_name: reasoning_loop_silver
description: Creates detailed plan for new items in Needs_Action
version: 1.0
---

# Reasoning Loop Silver Skill

Task:
- Read the latest file in Needs_Action (or the one I specify)
- Think step-by-step (but keep output clean)
- Create a file in Plans/ with name PLAN_[original_name].md
- Content:
  ---
  plan_for: [original_name]
  created: [current date]
  status: pending
  ---
  # Reasoning Plan
  Objective: [what needs to be done]
  Steps:
  - [ ] Step 1: ...
  - [ ] Step 2: ...
  - [ ] If needed: Create approval in Pending_Approval
  - [ ] Final action: Move to Done

Rules:
- Use checkboxes for steps
- If action is sensitive (money, new contact), add approval step
- Log in Logs: "Plan created for [file]"

Call this skill with: @reason_plan path:Needs_Action/somefile.md
