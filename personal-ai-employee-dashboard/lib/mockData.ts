export const mockData = {
  dashboardStats: {
    activeWatchers: 2,
    pendingActions: 5,
    urgentTasks: 2,
    lastPostDate: '2024-02-15',
    gmailStatus: 'running',
    whatsappStatus: 'running',
    gmailLastChecked: '2 minutes ago',
    whatsappLastChecked: '1 minute ago',
    recentActivity: [
      {
        type: 'success',
        message: 'Gmail watcher processed 3 new emails',
        timestamp: '2 minutes ago'
      },
      {
        type: 'warning',
        message: 'Urgent WhatsApp message detected',
        timestamp: '5 minutes ago'
      },
      {
        type: 'info',
        message: 'LinkedIn post published successfully',
        timestamp: '1 hour ago'
      },
      {
        type: 'success',
        message: 'Approval request completed',
        timestamp: '2 hours ago'
      }
    ]
  },
  pendingActions: [
    {
      id: 1,
      title: 'Invoice Payment Required',
      description: 'Client has requested immediate payment for services rendered',
      status: 'pending',
      time: '2 hours ago',
      type: 'WhatsApp'
    },
    {
      id: 2,
      title: 'Gmail: New Business Inquiry',
      description: 'Received a potential partnership opportunity email',
      status: 'in-progress',
      time: '4 hours ago',
      type: 'Email'
    },
    {
      id: 3,
      title: 'Urgent: Server Down',
      description: 'System monitoring detected server issue',
      status: 'urgent',
      time: '1 hour ago',
      type: 'System'
    },
    {
      id: 4,
      title: 'Schedule Meeting',
      description: 'Client requested meeting for next week',
      status: 'pending',
      time: '6 hours ago',
      type: 'Email'
    },
    {
      id: 5,
      title: 'LinkedIn Post Review',
      description: 'New post draft ready for approval',
      status: 'in-progress',
      time: '1 day ago',
      type: 'Social'
    }
  ],
  approvalQueue: [
    {
      id: 1,
      title: 'LinkedIn Post: AI Employee Update',
      description: 'Share latest milestone about AI employee project',
      type: 'linkedin_post',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Invoice Payment: Client ABC',
      description: 'Process payment for completed project',
      type: 'payment',
      time: '1 day ago',
      status: 'pending'
    },
    {
      id: 3,
      title: 'New Skill: Data Analysis',
      description: 'Add new data analysis capability to AI employee',
      type: 'skill',
      time: '3 days ago',
      status: 'approved'
    }
  ],
  watchers: [
    {
      id: 1,
      name: 'Gmail Watcher',
      status: 'running',
      lastChecked: '2 minutes ago',
      processed: 12,
      failures: 0
    },
    {
      id: 2,
      name: 'WhatsApp Watcher',
      status: 'running',
      lastChecked: '1 minute ago',
      processed: 8,
      failures: 1
    }
  ],
  logs: [
    { id: 1, timestamp: '2024-02-16 10:30:15', level: 'INFO', message: 'Gmail watcher started successfully' },
    { id: 2, timestamp: '2024-02-16 10:30:16', level: 'INFO', message: 'WhatsApp watcher started successfully' },
    { id: 3, timestamp: '2024-02-16 10:32:45', level: 'INFO', message: 'Processed new email from client@example.com' },
    { id: 4, timestamp: '2024-02-16 10:35:22', level: 'WARN', message: 'WhatsApp message parsing failed - retrying' },
    { id: 5, timestamp: '2024-02-16 10:40:10', level: 'INFO', message: 'Created action item: Invoice Payment Required' },
    { id: 6, timestamp: '2024-02-16 10:42:33', level: 'INFO', message: 'LinkedIn post published successfully' },
    { id: 7, timestamp: '2024-02-16 10:45:01', level: 'INFO', message: 'Approval request created for LinkedIn post' },
    { id: 8, timestamp: '2024-02-16 10:47:29', level: 'INFO', message: 'System health check passed' },
  ],
  skills: [
    {
      id: 1,
      name: 'Gmail Processing',
      description: 'Automatically processes and categorizes emails',
      status: 'active',
      usage: 128
    },
    {
      id: 2,
      name: 'WhatsApp Monitoring',
      description: 'Monitors WhatsApp messages for urgent keywords',
      status: 'active',
      usage: 95
    },
    {
      id: 3,
      name: 'LinkedIn Posting',
      description: 'Creates and publishes LinkedIn posts',
      status: 'active',
      usage: 24
    },
    {
      id: 4,
      name: 'File Processing',
      description: 'Processes and categorizes new files',
      status: 'active',
      usage: 42
    },
    {
      id: 5,
      name: 'Approval Workflow',
      description: 'Manages approval requests for sensitive actions',
      status: 'active',
      usage: 18
    },
    {
      id: 6,
      name: 'Log Analysis',
      description: 'Analyzes system logs for anomalies',
      status: 'active',
      usage: 67
    }
  ],
  linkedinPosts: [
    {
      id: 1,
      title: 'AI Employee Update',
      content: 'Just achieved a major milestone with my personal AI employee project. Automated workflows for email, messaging, and social media management.',
      status: 'published',
      created: '2024-02-15',
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      title: 'New LinkedIn Post Draft',
      content: 'Building the future of productivity with AI integration. My personal AI employee now handles email triage, social media monitoring, and task management.',
      status: 'draft',
      created: '2024-02-16',
      likes: 0,
      comments: 0
    }
  ]
};