"""
AI Employee Vault - Unified Gold Launcher
Starts all automation watchers and the CEO briefing scheduler.
"""

import subprocess
import time
import sys
import os
from pathlib import Path
import threading

# Base path
BASE_PATH = Path(__file__).parent.absolute()

def run_script(script_path, name):
    """Run a python script as a subprocess"""
    print(f"🚀 Starting {name}...")
    try:
        # Use sys.executable to ensure we use the same python environment
        process = subprocess.Popen(
            [sys.executable, str(script_path)],
            cwd=str(BASE_PATH),
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
            universal_newlines=True
        )
        
        # Thread to read and print output
        def log_output():
            for line in process.stdout:
                print(f"[{name}] {line.strip()}")
        
        threading.Thread(target=log_output, daemon=True).start()
        return process
    except Exception as e:
        print(f"❌ Failed to start {name}: {e}")
        return None

def main():
    print("="*50)
    print("       AI EMPLOYEE VAULT - GOLD TIER       ")
    print("="*50)
    
    scripts = [
        (BASE_PATH / "check_gmail.py", "Gmail Watcher"),
        (BASE_PATH / "whatsapp_watcher.py", "WhatsApp Watcher"),
        (BASE_PATH / "Scripts" / "invoice_watcher.py", "Odoo Invoice Watcher"),
        (BASE_PATH / "Scripts" / "ceo_briefing_scheduler.py", "CEO Briefing Scheduler")
    ]
    
    processes = []
    
    for script_path, name in scripts:
        if script_path.exists():
            proc = run_script(script_path, name)
            if proc:
                processes.append((proc, name))
        else:
            print(f"⚠️ Warning: Script not found: {script_path}")

    print("\n✅ All systems online. Press Ctrl+C to stop.\n")
    
    try:
        while True:
            time.sleep(1)
            # Check if any process has died
            for proc, name in processes:
                if proc.poll() is not None:
                    print(f"🛑 {name} has stopped (Exit code: {proc.returncode})")
                    processes.remove((proc, name))
    except KeyboardInterrupt:
        print("\n👋 Stopping all services...")
        for proc, name in processes:
            print(f"Shutting down {name}...")
            proc.terminate()
        print("Done.")

if __name__ == "__main__":
    # Ensure Dependencies are installed (can't do it here but helpful to warn)
    # required = ["watchdog", "apscheduler", "google-api-python-client", "playwright"]
    
    main()
