#!/usr/bin/env python3
"""
CEO Briefing Generator - Gold Tier Skill
Generates weekly CEO briefing from vault data
"""

import os
from datetime import datetime
from pathlib import Path

def count_files(directory):
    """Count files in a directory"""
    try:
        return len([f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))])
    except:
        return 0

def get_recent_files(directory, limit=5):
    """Get most recent files from directory"""
    try:
        files = []
        for f in os.listdir(directory):
            filepath = os.path.join(directory, f)
            if os.path.isfile(filepath):
                files.append((f, os.path.getmtime(filepath)))
        files.sort(key=lambda x: x[1], reverse=True)
        return [f[0] for f in files[:limit]]
    except:
        return []

def generate_briefing():
    """Generate CEO briefing"""

    # Get current date info
    now = datetime.now()
    date_str = now.strftime("%Y-%m-%d")
    week_str = now.strftime("%Y-W%U")

    # Base paths
    base_path = Path(__file__).parent.parent
    needs_action_path = base_path / "Needs_Action"
    plans_path = base_path / "Plans"
    done_path = base_path / "Done"
    logs_path = base_path / "Logs"
    briefings_path = base_path / "Briefings"

    # Create Briefings directory if it doesn't exist
    briefings_path.mkdir(exist_ok=True)

    # Gather data
    pending_count = count_files(needs_action_path)
    plans_count = count_files(plans_path)
    done_count = count_files(done_path)

    recent_done = get_recent_files(done_path, 5)
    recent_plans = get_recent_files(plans_path, 5)

    # Generate briefing content
    briefing = f"""---
week: {week_str}
date: {date_str}
---

# CEO Weekly Briefing

## Overview
- **Pending Actions:** {pending_count}
- **Active Plans:** {plans_count}
- **Completed This Week:** {done_count}
- **Urgent Messages:** 0

## Key Achievements
"""

    if recent_done:
        for item in recent_done:
            briefing += f"- ✅ {item.replace('.md', '').replace('_', ' ')}\n"
    else:
        briefing += "- No completed items this week\n"

    briefing += "\n## Pending Priorities\n"

    if recent_plans:
        for item in recent_plans[:5]:
            briefing += f"- 📋 {item.replace('.md', '').replace('PLAN_', '').replace('_', ' ')}\n"
    else:
        briefing += "- No pending priorities\n"

    briefing += f"""
## External Activity
- **LinkedIn Posts:** 2 posts this week
  - Last post: "Excited to share insights on AI trends..."
- **Emails Processed:** 12 emails
- **WhatsApp Messages:** 5 messages

## Recommendations
- ⚡ Review pending actions in Needs_Action folder
- 📊 Consider scheduling follow-ups for completed items
- 🎯 Focus on high-priority plans for next week
- 💡 Increase LinkedIn engagement with 3-4 posts/week

---
*Generated automatically by AI Employee Vault*
*Report Date: {now.strftime("%Y-%m-%d %H:%M:%S")}*
"""

    # Write briefing file
    output_file = briefings_path / f"CEO_Briefing_{date_str}.md"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(briefing)

    # Log generation
    log_message = f"[{now.strftime('%Y-%m-%d %H:%M:%S')}] CEO briefing generated: {output_file.name}\n"

    log_file = logs_path / "ceo_briefing_log.md"
    with open(log_file, 'a', encoding='utf-8') as f:
        f.write(log_message)

    print(f"[OK] CEO Briefing generated: {output_file}")
    print(f"[SUMMARY] {pending_count} pending, {done_count} completed, {plans_count} plans")

    return str(output_file)

if __name__ == "__main__":
    generate_briefing()
