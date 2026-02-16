---
skill_name: create_vault_item
description: Creates folder or markdown file if missing
version: 1.0
---

# Create Vault Item Skill

Parameters:
- type: folder or file
- path: relative path (e.g. Plans or Dashboard.md)
- content: markdown text (only for file)

Rules:
- If already exists → say "Already exists"
- Create with given content
- Log: "Created {path}"

Run this skill when I say: @create type:folder path:NewFolder or @create type:file path:Test.md content:Hello