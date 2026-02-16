import os
import time
import shutil
from datetime import datetime

def monitor_needs_action():
    # Define folder paths
    needs_action_path = "Needs_Action"
    plans_path = "Plans"
    done_path = "Done"
    logs_path = "Logs"
    
    # Create folders if they don't exist
    for folder in [needs_action_path, plans_path, done_path, logs_path]:
        if not os.path.exists(folder):
            os.makedirs(folder)
    
    # Keep track of files we've already processed
    processed_files = set()
    
    print("Starting to monitor Needs_Action folder...")
    print("Checking for new .md files every 30 seconds...")
    
    try:
        while True:
            # Get all .md files in Needs_Action folder
            if os.path.exists(needs_action_path):
                current_files = {f for f in os.listdir(needs_action_path) if f.lower().endswith('.md')}
                
                # Find new files that we haven't processed yet
                new_files = current_files - processed_files
                
                for filename in new_files:
                    print(f"New file: {filename}")
                    
                    # Create plan file in Plans folder
                    plan_filename = f"PLAN_{filename}"
                    plan_filepath = os.path.join(plans_path, plan_filename)
                    
                    with open(plan_filepath, 'w') as plan_file:
                        plan_content = f"""# Plan for {filename}

- [ ] Review the content of {filename}
- [ ] Determine appropriate action
- [ ] Execute required tasks
- [ ] Mark as completed
"""
                        plan_file.write(plan_content)
                    
                    # Move original file to Done folder
                    original_filepath = os.path.join(needs_action_path, filename)
                    done_filepath = os.path.join(done_path, filename)
                    shutil.move(original_filepath, done_filepath)
                    
                    # Log the action
                    log_filepath = os.path.join(logs_path, "watcher_log.md")
                    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    log_entry = f"Processed {filename} at {timestamp}\n"
                    
                    with open(log_filepath, 'a') as log_file:
                        log_file.write(log_entry)
                    
                    # Add to processed files set
                    processed_files.add(filename)
            
            # Wait 30 seconds before next check
            time.sleep(30)
            
    except KeyboardInterrupt:
        print("\nMonitoring stopped by user.")

if __name__ == "__main__":
    monitor_needs_action()