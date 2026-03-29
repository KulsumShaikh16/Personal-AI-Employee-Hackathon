"""
Gold Tier Skill: Odoo Auto Invoice Creator
Simple and reliable version
"""

import os
import re
import xmlrpc.client
import logging
import json
from datetime import datetime
from pathlib import Path

# Logging setup
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Setup paths
BASE_PATH = Path(__file__).parent.parent
CONFIG_PATH = BASE_PATH / "Secrets" / "odoo_config.json"

def load_odoo_config():
    """Load Odoo configuration from JSON file"""
    try:
        if CONFIG_PATH.exists():
            with open(CONFIG_PATH, 'r') as f:
                return json.load(f)
        else:
            logger.warning(f"⚠️ Config not found at {CONFIG_PATH}. Using defaults.")
            return {
                "url": "http://localhost:8069",
                "db": "ai_employee_db",
                "username": "admin",
                "password": "admin"
            }
    except Exception as e:
        logger.error(f"❌ Error loading config: {e}")
        return None

def get_odoo_connection():
    """Create connection to Odoo"""
    config = load_odoo_config()
    if not config:
        return None, None

    try:
        common = xmlrpc.client.ServerProxy(f"{config['url']}/xmlrpc/2/common")
        uid = common.authenticate(config['db'], config['username'], config['password'], {})
        
        if not uid:
            logger.error("❌ Odoo authentication failed. Check username/password.")
            return None, None
            
        models = xmlrpc.client.ServerProxy(f"{config['url']}/xmlrpc/2/object")
        logger.info(f"✅ Connected to Odoo successfully (User ID: {uid})")
        return models, uid, config
        
    except Exception as e:
        logger.error(f"❌ Failed to connect to Odoo: {e}")
        return None, None, None

def test_odoo_connection():
    """Pre-flight check for Odoo connectivity"""
    models, uid, config = get_odoo_connection()
    return uid is not None

def extract_invoice_info(content: str):
    """Extract invoice information from text"""
    info = {
        'client_name': None,
        'amount': None,
        'description': "Auto-generated invoice",
        'due_date': datetime.now().strftime('%Y-%m-%d')
    }
    
    # Client name patterns
    client_patterns = [
        r'\*?\*?client\*?\*?[:\s]+([^\n\r]+)',
        r'\*?\*?customer\*?\*?[:\s]+([^\n\r]+)',
        r'\*?\*?bill to\*?\*?[:\s]+([^\n\r]+)',
        r'\*?\*?to\*?\*?[:\s]+([^\n\r]+)'
    ]
    
    # Amount patterns
    amount_patterns = [
        r'\*?\*?amount\*?\*?[:\s]*[$€£]?\s*([0-9,]+\.?[0-9]*)',
        r'\*?\*?total\*?\*?[:\s]*[$€£]?\s*([0-9,]+\.?[0-9]*)',
        r'[$€£]([0-9,]+\.?[0-9]*)'
    ]
    
    # Extract client
    for pattern in client_patterns:
        match = re.search(pattern, content, re.IGNORECASE)
        if match:
            info['client_name'] = match.group(1).strip()
            break
    
    # Extract amount
    for pattern in amount_patterns:
        match = re.search(pattern, content, re.IGNORECASE)
        if match:
            try:
                amount_str = match.group(1).replace(',', '')
                info['amount'] = float(amount_str)
                break
            except:
                continue
    
    # Description (first meaningful line)
    lines = [line.strip() for line in content.split('\n') if line.strip()]
    if lines:
        info['description'] = lines[0][:200]
    
    return info

def create_odoo_invoice(content: str, file_path: str):
    """Main function to create invoice in Odoo"""
    models, uid, config = get_odoo_connection()
    if not models or not uid:
        return {'success': False, 'error': 'Odoo connection failed'}
    
    info = extract_invoice_info(content)
    
    if not info['client_name'] or not info['amount']:
        return {
            'success': False, 
            'error': 'Could not extract client name or amount from file'
        }
    
    try:
        # Create invoice
        invoice_vals = {
            'partner_id': 1,  # Default demo customer (change if needed)
            'move_type': 'out_invoice',
            'invoice_date': datetime.now().strftime('%Y-%m-%d'),
            'invoice_date_due': info['due_date'],
            'invoice_line_ids': [
                (0, 0, {
                    'name': info['description'],
                    'quantity': 1,
                    'price_unit': info['amount'],
                })
            ]
        }
        
        invoice_id = models.execute_kw(
            config['db'], uid, config['password'],
            'account.move', 'create', [invoice_vals]
        )
        
        # Create plan file
        original_name = Path(file_path).stem
        plans_dir = BASE_PATH / "Plans"
        plans_dir.mkdir(exist_ok=True)
        plan_path = plans_dir / f"odoo_invoice_{original_name}.md"
        
        with open(plan_path, 'w', encoding='utf-8') as f:
            f.write(f"""# Odoo Invoice Created

**Original File:** {file_path}
**Invoice ID:** {invoice_id}
**Client:** {info['client_name']}
**Amount:** ${info['amount']}
**Date:** {datetime.now().strftime('%Y-%m-%d')}

Status: Draft invoice created in Odoo successfully.
""")
        
        # Log success and paths
        logger.info(f"✅ Invoice created in Odoo! ID: {invoice_id}")
        
        # Move original file to Done
        done_dir = BASE_PATH / "Done"
        done_dir.mkdir(exist_ok=True)
        
        # Ensure folders exist
        (BASE_PATH / "Needs_Action").mkdir(exist_ok=True)
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        done_path = done_dir / f"{timestamp}_{Path(file_path).name}"
        
        try:
            os.replace(file_path, done_path)
        except Exception as e:
            logger.error(f"❌ Failed to move file to Done: {e}")
            # Fallback if move fails
            import shutil
            shutil.copy2(file_path, done_path)
            os.remove(file_path)
        
        return {
            'success': True,
            'invoice_id': invoice_id,
            'plan_file': str(plan_path),
            'done_file': str(done_path)
        }
        
    except Exception as e:
        logger.error(f"❌ Error creating invoice: {e}")
        return {'success': False, 'error': str(e)}

# For direct testing
if __name__ == "__main__":
    print("Testing Odoo Auto Invoice Skill...")
    # Create required directories before testing
    (BASE_PATH / "Needs_Action").mkdir(exist_ok=True)
    (BASE_PATH / "Plans").mkdir(exist_ok=True)
    (BASE_PATH / "Done").mkdir(exist_ok=True)
    
    # Create a test file
    test_content = """# Test Invoice
Client: Test Company
Amount: 2500
Description: AI Consultation Services
Payment due: 2026-03-15
"""
    test_file = BASE_PATH / "Needs_Action" / "test_invoice.md"
    with open(test_file, 'w') as f:
        f.write(test_content)
    
    result = create_odoo_invoice(test_content, str(test_file))
    print(result)
