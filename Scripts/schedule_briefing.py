"""
CEO Briefing Scheduler - Gold Tier
Schedules and runs the CEO briefing every Sunday at 10:00 PM.
Updates Dashboard.md with the latest briefing link.
"""

import os
import sys
import logging
import time
from datetime import datetime
from pathlib import Path
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

# Setup paths
BASE_PATH = Path(__file__).parent.parent
LOGS_PATH = BASE_PATH / "Logs"
LOGS_PATH.mkdir(exist_ok=True)
DASHBOARD_PATH = BASE_PATH / "Dashboard.md"

# Add Skills directory to sys.path for importing ceo_briefing_gold
sys.path.append(str(BASE_PATH / "Skills"))
import ceo_briefing_gold

# Logging setup
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOGS_PATH / "scheduler_log.txt", encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def update_dashboard(briefing_path):
    """Update Dashboard.md with the latest briefing link"""
    try:
        if not DASHBOARD_PATH.exists():
            content = f"# AI Employee Dashboard\n\n## Latest CEO Briefing\n- None\n"
        else:
            with open(DASHBOARD_PATH, 'r', encoding='utf-8') as f:
                content = f.read()

        briefing_rel_path = Path(briefing_path).relative_to(BASE_PATH)
        date_str = datetime.now().strftime("%Y-%m-%d")
        briefing_link = f"- [CEO Briefing ({date_str})]({briefing_rel_path.as_posix()})"

        # Check if section exists
        section_header = "## Latest CEO Briefing"
        if section_header in content:
            # Replace existing link line (assuming it's right under the header or a list)
            lines = content.split('\n')
            new_lines = []
            found_header = False
            updated = False
            for line in lines:
                new_lines.append(line)
                if line.strip() == section_header:
                    found_header = True
                elif found_header and not updated:
                    # If the next line is a link or "None", replace it or insert
                    if line.strip().startswith("- [CEO Briefing") or line.strip() == "- None":
                        new_lines[-1] = briefing_link
                        updated = True
                    elif line.strip() == "":
                        # Just a spacer, keep going
                        continue
                    else:
                        # Something else, insert before
                        new_lines.insert(-1, briefing_link)
                        updated = True
            
            if not updated:
                new_lines.append(briefing_link)
            content = '\n'.join(new_lines)
        else:
            # Append section
            content += f"\n\n## Latest CEO Briefing\n{briefing_link}\n"

        # Update last_updated in frontmatter if it exists
        if "last_updated:" in content:
            content = content.replace(f"last_updated: {date_str}", f"last_updated: {date_str}") # dummy for now or regex
            import re
            content = re.sub(r'last_updated: \d{4}-\d{2}-\d{2}', f'last_updated: {date_str}', content)

        with open(DASHBOARD_PATH, 'w', encoding='utf-8') as f:
            f.write(content)
        
        logger.info(f"✅ Dashboard updated with link to: {briefing_path}")
    except Exception as e:
        logger.error(f"❌ Failed to update Dashboard: {e}")

def run_briefing_job():
    """Trigger the CEO Briefing generation and update Dashboard"""
    logger.info("Starting scheduled CEO Briefing generation...")
    try:
        briefing_file = ceo_briefing_gold.generate_briefing()
        logger.info(f"CEO Briefing generated successfully: {briefing_file}")
        update_dashboard(briefing_file)
    except Exception as e:
        logger.error(f"Error during CEO Briefing job: {e}")

if __name__ == "__main__":
    # Check if we should run immediately for testing
    if len(sys.argv) > 1 and sys.argv[1] == "--test":
        logger.info("Running in test mode (Immediate execution)...")
        run_briefing_job()
        sys.exit(0)

    scheduler = BackgroundScheduler()
    
    # Schedule: Every Sunday at 10:00 PM (22:00)
    trigger = CronTrigger(day_of_week='sun', hour=22, minute=0)
    scheduler.add_job(run_briefing_job, trigger, id='ceo_briefing_weekly')
    
    scheduler.start()
    logger.info("CEO Briefing Scheduler started.")
    logger.info("   Schedule: Sundays at 10:00 PM")
    logger.info("   Logs folder: Logs/")
    
    try:
        while True:
            time.sleep(10)
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()
        logger.info("👋 Scheduler stopped.")
