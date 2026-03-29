'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageCircle,
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  BarChart3,
  Zap,
  TrendingUp,
  Bell
} from 'lucide-react';
import { mockData } from '@/lib/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const statCardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export default function DashboardPage() {
  const { dashboardStats } = mockData;

  return (
    <div className="animated-gradient min-h-screen">
      <div className="p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold font-heading gradient-text neon-text-glow">
              AI Employee Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Monitor and manage your AI employee system</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="h-3 w-3 rounded-full bg-emerald-500 status-online"></div>
            </div>
            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-2">
              <Activity className="mr-2 h-4 w-4 pulse-dot" />
              System Online
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div variants={statCardVariants}>
            <Card className="glass-effect-dark border-cyan-500/30 neon-border-cyan glass-card-hover group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-cyan-100">Active Watchers</CardTitle>
                <div className="p-2 rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                  <BarChart3 className="h-5 w-5 text-cyan-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-heading gradient-text">{dashboardStats.activeWatchers}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-cyan-400">●</span> {dashboardStats.gmailStatus === 'running' ? 'Gmail' : 'WhatsApp'} active
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={statCardVariants}>
            <Card className="glass-effect-dark border-purple-500/30 neon-border-purple glass-card-hover group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-100">Pending Actions</CardTitle>
                <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                  <Clock className="h-5 w-5 text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-heading gradient-text">{dashboardStats.pendingActions}</div>
                <p className="text-xs text-muted-foreground mt-1">awaiting your attention</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={statCardVariants}>
            <Card className="glass-effect-dark border-amber-500/30 neon-border-amber glass-card-hover group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-100">Urgent Tasks</CardTitle>
                <div className="p-2 rounded-lg bg-amber-500/20 group-hover:bg-amber-500/30 transition-colors">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-heading gradient-text">{dashboardStats.urgentTasks}</div>
                <p className="text-xs text-muted-foreground mt-1">require immediate action</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={statCardVariants}>
            <Card className="glass-effect-dark border-emerald-500/30 neon-border-emerald glass-card-hover group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-100">Last Post</CardTitle>
                <div className="p-2 rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                  <Users className="h-5 w-5 text-emerald-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-heading gradient-text">{dashboardStats.lastPostDate}</div>
                <p className="text-xs text-muted-foreground mt-1">LinkedIn activity</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Watcher Status */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass-effect-dark border-cyan-500/30 neon-border-cyan glass-card-hover">
              <CardHeader>
                <CardTitle className="flex items-center text-cyan-100">
                  <div className="p-2 rounded-lg bg-cyan-500/20 mr-3">
                    <Mail className="h-5 w-5 text-cyan-400" />
                  </div>
                  Gmail Watcher Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-cyan-100">Gmail Monitor</span>
                  <Badge
                    variant={dashboardStats.gmailStatus === 'running' ? 'default' : 'destructive'}
                    className={`${dashboardStats.gmailStatus === 'running' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-red-500 shadow-lg shadow-red-500/50'} px-3 py-1`}
                  >
                    <Zap className="mr-1 h-3 w-3" />
                    {dashboardStats.gmailStatus}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Last checked: <span className="text-cyan-400">{dashboardStats.gmailLastChecked}</span></p>
                <div className="relative h-3 w-full bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-full shimmer"
                    style={{ width: '85%' }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span className="text-cyan-400">85%</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-effect-dark border-purple-500/30 neon-border-purple glass-card-hover">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-100">
                  <div className="p-2 rounded-lg bg-purple-500/20 mr-3">
                    <MessageCircle className="h-5 w-5 text-purple-400" />
                  </div>
                  WhatsApp Watcher Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-purple-100">WhatsApp Monitor</span>
                  <Badge
                    variant={dashboardStats.whatsappStatus === 'running' ? 'default' : 'destructive'}
                    className={`${dashboardStats.whatsappStatus === 'running' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-red-500 shadow-lg shadow-red-500/50'} px-3 py-1`}
                  >
                    <Zap className="mr-1 h-3 w-3" />
                    {dashboardStats.whatsappStatus}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Last checked: <span className="text-purple-400">{dashboardStats.whatsappLastChecked}</span></p>
                <div className="relative h-3 w-full bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full shimmer"
                    style={{ width: '65%' }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span className="text-purple-400">65%</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="glass-effect-dark border-amber-500/30 neon-border-amber glass-card-hover">
            <CardHeader>
              <CardTitle className="flex items-center text-amber-100">
                <div className="p-2 rounded-lg bg-amber-500/20 mr-3">
                  <Bell className="h-5 w-5 text-amber-400" />
                </div>
                Recent Activity
                <Badge variant="secondary" className="ml-auto bg-amber-500/20 text-amber-400 border-amber-500/30">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Live
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardStats.recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="flex items-start space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className={`mt-2 h-3 w-3 rounded-full ${
                      activity.type === 'success' 
                        ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' 
                        : activity.type === 'warning' 
                        ? 'bg-amber-500 shadow-lg shadow-amber-500/50' 
                        : 'bg-red-500 shadow-lg shadow-red-500/50'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground group-hover:text-cyan-400 transition-colors">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="glass-effect-dark border-cyan-500/30 glass-card-hover cursor-pointer hover:border-cyan-500/60 transition-all">
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <CheckCircle className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <p className="font-medium text-cyan-100">Review Pending</p>
                <p className="text-xs text-muted-foreground">{dashboardStats.pendingActions} items</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-effect-dark border-purple-500/30 glass-card-hover cursor-pointer hover:border-purple-500/60 transition-all">
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-purple-500/20">
                <Mail className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-purple-100">Check Emails</p>
                <p className="text-xs text-muted-foreground">Last: {dashboardStats.gmailLastChecked}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-effect-dark border-emerald-500/30 glass-card-hover cursor-pointer hover:border-emerald-500/60 transition-all">
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-emerald-500/20">
                <Users className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <p className="font-medium text-emerald-100">LinkedIn Post</p>
                <p className="text-xs text-muted-foreground">Create new post</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}