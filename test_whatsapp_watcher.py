import unittest
from pathlib import Path
import sys
from unittest.mock import patch, MagicMock

# Add the current directory to path to import whatsapp_watcher
sys.path.insert(0, str(Path(__file__).parent))

import whatsapp_watcher

class TestWhatsAppWatcher(unittest.TestCase):

    def setUp(self):
        """Set up test fixtures before each test method."""
        self.vault_path = Path("E:/gemini-cli/Hackathon 0/AI_Employee_Vault")
        self.needs_action_path = self.vault_path / "Needs_Action"

    def test_vault_path_exists(self):
        """Test that the vault path is correctly set."""
        # Check that the vault path in the module matches our expected path
        # We'll access the module's VAULT_PATH after importing
        import importlib
        importlib.reload(whatsapp_watcher)
        self.assertEqual(whatsapp_watcher.VAULT_PATH, self.vault_path)

    def test_urgent_keywords(self):
        """Test that urgent keywords are properly defined."""
        expected_keywords = ["urgent", "asap", "invoice", "payment", "help", "jaldi", "paisa"]
        self.assertEqual(whatsapp_watcher.URGENT_KEYWORDS, expected_keywords)

    def test_needs_action_path(self):
        """Test that the Needs_Action path is correctly constructed."""
        expected_path = self.vault_path / "Needs_Action"
        # We'll access the module's NEEDS_ACTION after importing
        import importlib
        importlib.reload(whatsapp_watcher)
        self.assertEqual(whatsapp_watcher.NEEDS_ACTION, expected_path)

if __name__ == '__main__':
    print("Running WhatsApp Watcher tests...")
    unittest.main()