"""
Odoo Connection Test Script
Checks if the Odoo instance is reachable and credentials are valid.
"""

import xmlrpc.client
import logging
import sys
from pathlib import Path

# Setup paths to import from Scripts folder
sys.path.append(str(Path(__file__).parent))
from odoo_auto_invoice import load_odoo_config

# Logging setup
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def test_connection():
    """Test the Odoo XML-RPC connection using the central config"""
    config = load_odoo_config()
    if not config:
        logger.error("❌ Failed to load Odoo configuration.")
        return False

    logger.info(f"🔍 Testing connection to Odoo at {config['url']}...")
    try:
        # Check common endpoint
        common = xmlrpc.client.ServerProxy(f"{config['url']}/xmlrpc/2/common")
        version = common.version()
        logger.info(f"✅ Odoo Server Reachable! Server Version: {version.get('server_version')}")
        
        # Authenticate
        uid = common.authenticate(config['db'], config['username'], config['password'], {})
        if uid:
            logger.info(f"✅ Authentication Successful! User ID: {uid}")
            return uid
        else:
            logger.error("❌ Authentication Failed. Check DB name, username, and password.")
            return False
            
    except Exception as e:
        logger.error(f"❌ Connection Error: {e}")
        logger.info("💡 Tip: Make sure the Odoo server is running on http://localhost:8069")
        return False

if __name__ == "__main__":
    success = test_connection()
    if success:
        print("\n[SUCCESS] Odoo integration is ready for use.")
    else:
        print("\n[FAILURE] Connection check failed.")
        sys.exit(1)
