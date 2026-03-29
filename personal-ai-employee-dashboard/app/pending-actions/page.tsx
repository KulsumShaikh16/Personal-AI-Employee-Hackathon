'use client';

import { KanbanBoard } from '@/components/KanbanBoard';
import { mockData } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PendingActionsPage() {
  const { dashboardStats } = mockData;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-heading">Pending Actions</h1>
        <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
          {dashboardStats.pendingActions} items
        </Badge>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="glass-effect-dark border-border">
          <CardHeader>
            <CardTitle>Action Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <KanbanBoard />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}