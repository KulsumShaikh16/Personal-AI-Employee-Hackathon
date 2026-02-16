# Gmail API Credentials Setup Guide

## Location
Your `credentials.json` file should be placed in the `Secrets` folder in your vault root:
```
AI_Employee_Vault/
├── Secrets/
│   └── credentials.json  ← Place file here
```

## How to obtain credentials.json

1. Go to the [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select an existing one
3. Enable the Gmail API:
   - Click "Enable APIs and Services"
   - Search for "Gmail API"
   - Click on "Gmail API" and press "Enable"
4. Create credentials:
   - Go to "Credentials" in the left sidebar
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Desktop application" as the application type
   - Give it a name (e.g., "AI Employee Gmail Access")
   - Click "Create"
5. Download the credentials file:
   - Click the download icon next to your newly created OAuth 2.0 client
   - Rename the downloaded file to `credentials.json`
   - Place it in the `Secrets` folder in your vault

## File Structure
The credentials.json file should have the following structure:
{
  "installed": {
    "client_id": "your-client-id",
    "project_id": "your-project-id",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "your-client-secret",
    "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
  }
}

## Important Notes
- Keep your credentials.json file secure and never share it publicly
- The first time you run a script that uses these credentials, you'll be prompted to authenticate via your browser
- After the first authentication, a `token.json` file will be created to store your access tokens
- If you revoke access to the application, you'll need to delete `token.json` and re-authenticate