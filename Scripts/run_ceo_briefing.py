"""
CEO Briefing Runner - Manual Trigger
Generates a CEO briefing immediately and updates the Dashboard.
"""

import sys
import logging
from pathlib import Path
from datetime import datetime
import re

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
        logging.FileHandler(LOGS_PATH / "manual_briefing_log.txt", encoding='utf-8'),
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
            lines = content.split('\n')
            new_lines = []
            found_header = False
            updated = False
            for line in lines:
                new_lines.append(line)
                if line.strip() == section_header:
                    found_header = True
                elif found_header and not updated:
                    if line.strip().startswith("- [CEO Briefing") or line.strip() == "- None":
                        new_lines[-1] = briefing_link
                        updated = True
                    elif line.strip() == "":
                        continue
                    else:
                        new_lines.insert(-1, briefing_link)
                        updated = True
            
            if not updated:
                new_lines.append(briefing_link)
            content = '\n'.join(new_lines)
        else:
            content += f"\n\n## Latest CEO Briefing\n{briefing_link}\n"

        # Update last_updated in frontmatter
        if "last_updated:" in content:
            content = re.sub(r'last_updated: \d{4}-\d{2}-\d{2}', f'last_updated: {date_str}', content)

        with open(DASHBOARD_PATH, 'w', encoding='utf-8') as f:
            f.write(content)
        
        logger.info(f"✅ Dashboard updated with link to: {briefing_path}")
    except Exception as e:
        logger.error(f"❌ Failed to update Dashboard: {e}")

def run():
    """Manual trigger for the CEO Briefing"""
    logger.info("🚀 Starting manual CEO Briefing generation...")
    try:
        briefing_file = ceo_briefing_gold.generate_briefing()
        logger.info(f"CEO Briefing generated successfully: {briefing_file}")
        update_dashboard(briefing_file)
        logger.info("✨ Manual run complete.")
    except Exception as e:
        logger.error(f"Error during CEO Briefing run: {e}")

if __name__ == "__main__":
    run()