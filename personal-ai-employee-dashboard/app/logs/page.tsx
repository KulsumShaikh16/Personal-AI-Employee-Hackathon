'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { FileText, Search, Filter, Clock } from 'lucide-react';
import { mockData } from '@/lib/mockData';
import { useState } from 'react';

export default function LogsPage() {
  const { logs } = mockData;
  const [filter, setFilter] = useState('all');

  const filteredLogs = filter === 'all'
    ? logs
    : logs.filter(log => log.level.toLowerCase() === filter);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'INFO':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'WARN':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'ERROR':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-muted text-foreground border-border';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-heading">System Logs</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search logs..."
              className="pl-8 pr-4 py-2 bg-background border border-border rounded-lg text-sm"
            />
          </div>
          <div className="flex items-center space-x-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-background border border-border rounded-lg px-2 py-1 text-sm"
            >
              <option value="all">All</option>
              <option value="INFO">Info</option>
              <option value="WARN">Warning</option>
              <option value="ERROR">Error</option>
            </select>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="glass-effect-dark border-border h-[calc(100vh-200px)]">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-cyan-400" />
              Recent Activity Logs
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto h-[calc(100%-80px)]">
            <div className="space-y-3">
              {filteredLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start p-3 rounded-lg bg-secondary/30 border border-border"
                >
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs text-muted-foreground font-mono">{log.timestamp}</span>
                    </div>
                    <Badge variant="secondary" className={getLevelColor(log.level)}>
                      {log.level}
                    </Badge>
                    <p className="text-sm truncate">{log.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}