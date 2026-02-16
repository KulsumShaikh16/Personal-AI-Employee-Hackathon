---
skill_name: linkedin_post_generator
description: Generates professional LinkedIn post for business updates
version: 1.0
---

# LinkedIn Post Generator Skill

Task:
- When called, generate a short professional LinkedIn post.
- Use information from Dashboard.md or Business_Goals.md if available.
- Post example format:
  "Excited to share that we just completed [milestone]!  
  Key achievement: [brief detail]  
  Looking forward to [next step].  
  #Business #Growth #AI"

- Create a draft file in Plans/linkedin_draft_[date].md with the post content
- If MCP is ready, suggest sending it (but do not send without approval)

Rules:
- Keep post polite, engaging, and under 200 words
- Add relevant hashtags
- If no data, use placeholder like "Today's update"

Call this skill when I say: @generate_linkedin or "make linkedin post"
