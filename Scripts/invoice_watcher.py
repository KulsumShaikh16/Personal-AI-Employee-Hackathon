"""
Gold Tier: Invoice Watcher + Odoo Auto Invoice Creator
Simple, clean and reliable version
"""

import time
import logging
import sys
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

sys.path.append(str(Path(__file__).parent))

# Import the Odoo invoice function
from odoo_auto_invoice import create_odoo_invoice

# Logging setup
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Setup paths
BASE_PATH = Path(__file__).parent.parent
NEEDS_ACTION = BASE_PATH / "Needs_Action"

class InvoiceWatcherHandler(FileSystemEventHandler):
    """Handler for new invoice-related files"""
    def __init__(self):
        super().__init__()
        self.processed_files = set()

    def on_moved(self, event):
        if not event.is_directory:
            self.process_file(Path(event.dest_path))

    def on_modified(self, event):
        if not event.is_directory:
            self.process_file(Path(event.src_path))

    def on_created(self, event):
        if not event.is_directory:
            self.process_file(Path(event.src_path))
            
    def process_file(self, file_path):
        # Give the OS a moment to finish writing the file contents
        time.sleep(0.5)
        
        # Only process .md files
        if file_path.suffix.lower() != '.md':
            return

        # Avoid processing the same file twice
        if str(file_path) in self.processed_files:
            return

        try:
            # Read file content
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()

            # Check if it contains invoice keywords
            invoice_keywords = ["invoice", "bill", "payment due", "facture", "billing"]
            if any(keyword in content.lower() for keyword in invoice_keywords):
                logger.info(f"🎯 Invoice-related file detected: {file_path.name}")

                self.processed_files.add(str(file_path))

                # Call Odoo auto invoice skill
                result = create_odoo_invoice(content, str(file_path))

                if result.get('success'):
                    logger.info(f"✅ Successfully processed invoice! Odoo ID: {result.get('invoice_id')}")
                else:
                    logger.error(f"❌ Failed to process invoice: {result.get('error', 'Unknown error')}")
            else:
                logger.info(f"File {file_path.name} does not contain invoice keywords, skipping.")

        except Exception as e:
            logger.error(f"Error processing file {file_path.name}: {e}")

def start_invoice_watcher():
    """Start the invoice watcher"""
    # Ensure required folders exist
    for folder in ["Needs_Action", "Plans", "Done", "Logs"]:
        (BASE_PATH / folder).mkdir(exist_ok=True)

    event_handler = InvoiceWatcherHandler()
    observer = Observer()
    observer.schedule(event_handler, str(NEEDS_ACTION), recursive=False)

    observer.start()
    logger.info("🚀 Gold Tier Invoice Watcher started!")
    logger.info("Monitoring Needs_Action folder for invoice keywords...")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        logger.info("👋 Invoice Watcher stopped.")
    observer.join()

if __name__ == "__main__":
    start_invoice_watcher()
