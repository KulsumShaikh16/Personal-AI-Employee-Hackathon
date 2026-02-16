import json
import os

def test_credentials():
    """Test if credentials.json exists and is properly formatted."""
    cred_path = "Secrets/credentials.json"
    
    if not os.path.exists(cred_path):
        print(f"ERROR: {cred_path} does not exist!")
        return False
    
    try:
        with open(cred_path, 'r') as f:
            creds = json.load(f)
        
        # Check if it has the expected structure
        if 'installed' not in creds:
            print("ERROR: credentials.json doesn't have 'installed' key")
            return False
        
        installed = creds['installed']
        required_keys = ['client_id', 'client_secret', 'project_id', 'auth_uri', 'token_uri', 'redirect_uris']
        
        for key in required_keys:
            if key not in installed:
                print(f"ERROR: Missing required key '{key}' in credentials.json")
                return False
        
        if not installed['client_id'] or installed['client_id'] == '':
            print("ERROR: client_id is empty in credentials.json")
            return False
        
        if not installed['client_secret'] or installed['client_secret'] == '':
            print("ERROR: client_secret is empty in credentials.json")
            return False
        
        print("SUCCESS: credentials.json exists and has the correct structure with non-empty client_id and client_secret")
        print(f"Project ID: {installed['project_id']}")
        print(f"Client ID: {installed['client_id'][:20]}..." if len(installed['client_id']) > 20 else f"Client ID: {installed['client_id']}")
        
        return True
        
    except json.JSONDecodeError:
        print("ERROR: credentials.json is not valid JSON")
        return False
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return False

if __name__ == "__main__":
    test_credentials()