# CEO Briefing Generator - Gold Tier Skill

## Description
Automatically generates weekly CEO briefings from vault data, providing a comprehensive overview of activities, achievements, and priorities.

## Usage

### Manual Execution
```bash
python Skills/ceo_briefing_gold.py
```

### Scheduled Execution (Recommended)
Set up a cron job to run every Sunday night:
```bash
# Run every Sunday at 11:00 PM
0 23 * * 0 cd /path/to/AI_Employee_Vault && python Skills/ceo_briefing_gold.py
```

## Output

### File Location
`Briefings/CEO_Briefing_[YYYY-MM-DD].md`

### Content Structure
- **Overview**: Summary statistics (pending, completed, urgent)
- **Key Achievements**: Recent completed tasks from Done folder
- **Pending Priorities**: Top 5 items from Plans/Needs_Action
- **External Activity**: LinkedIn posts, emails, WhatsApp messages
- **Recommendations**: AI-generated suggestions based on data

## Data Sources
- `Needs_Action/` - Pending items count
- `Plans/` - Active plans
- `Done/` - Completed tasks
- `Logs/` - Recent activity logs
- LinkedIn drafts/posts
- Gmail/WhatsApp messages

## Logging
All briefing generations are logged to: `Logs/ceo_briefing_log.md`

## Example Output
```markdown
---
week: 2026-W08
date: 2026-02-24
---

# CEO Weekly Briefing

## Overview
- **Pending Actions:** 0
- **Active Plans:** 13
- **Completed This Week:** 12
- **Urgent Messages:** 0

## Key Achievements
- ✅ EMAIL 19bdd230636fdf29
- ✅ EMAIL 19bdd536c55b4621
...
```

## Features
- Automatic data aggregation from multiple sources
- Week number tracking
- Timestamp logging
- Relative path handling
- Graceful handling of missing data

## Requirements
- Python 3.6+
- Standard library only (no external dependencies)

## Notes
- If folders are empty, placeholders are used
- All dates use ISO format (YYYY-MM-DD)
- Briefings are cumulative and not overwritten
