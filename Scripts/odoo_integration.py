# Odoo integration script
from xmlrpc import client
import datetime
from pathlib import Path

# ================== CONFIG ==================
URL = "http://localhost:8069"
DB = "ai_employee_db"
USERNAME = "kulsumshaikh1605@gmail.com"  # MUST BE EMAIL: e.g. "admin" or "kulsum@example.com"
PASSWORD = "Kiswa2020@"   # ← yahan apna Odoo password daal do

# ===========================================

common = client.ServerProxy(f'{URL}/xmlrpc/2/common')
uid = common.authenticate(DB, USERNAME, PASSWORD, {})

models = client.ServerProxy(f'{URL}/xmlrpc/2/object')

if not uid:
    raise SystemExit(
        f"❌ Authentication failed! Check your DB name ('{DB}'), USERNAME ('{USERNAME}'), and PASSWORD.\n"
        f"   Also verify Odoo is running at {URL}"
    )

print(f"✅ Connected to Odoo successfully! User ID: {uid}")

# Example: Create Invoice from Needs_Action file
def create_invoice_from_file(filename):
    # Yeh function baad mein Needs_Action se file padh ke invoice create karegi
    print(f"Creating invoice for: {filename}")
    
    invoice_data = {
        'partner_id': 1,                    # Demo customer
        'move_type': 'out_invoice',
        'invoice_date': datetime.date.today().isoformat(),
        'invoice_line_ids': [
            (0, 0, {
                'product_id': 1,
                'quantity': 1,
                'price_unit': 1500,
            })
        ]
    }
    
    invoice_id = models.execute_kw(DB, uid, PASSWORD, 'account.move', 'create', [invoice_data])
    print(f"✅ Invoice created with ID: {invoice_id}")
    return invoice_id

# Test connection
if __name__ == "__main__":
    create_invoice_from_file("test_invoice.md")