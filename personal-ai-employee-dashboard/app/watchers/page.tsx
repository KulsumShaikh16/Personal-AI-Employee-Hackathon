'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { mockData } from '@/lib/mockData';

export default function WatchersPage() {
  const { watchers } = mockData;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-heading">Watchers</h1>
        <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
          All Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {watchers.map((watcher, index) => (
          <motion.div
            key={watcher.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="glass-effect-dark border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <div className={`mr-3 h-3 w-3 rounded-full ${watcher.status === 'running' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                    {watcher.name}
                  </CardTitle>
                  <Badge variant={watcher.status === 'running' ? 'default' : 'destructive'}>
                    {watcher.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Checked</span>
                    <span className="text-sm">{watcher.lastChecked}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Processed</span>
                    <span className="text-sm">{watcher.processed}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Failures</span>
                    <span className="text-sm">{watcher.failures}</span>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Play className="mr-2 h-4 w-4" />
                      {watcher.status === 'running' ? 'Pause' : 'Start'}
                    </Button>
                    <Button size="sm" variant="outline">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}