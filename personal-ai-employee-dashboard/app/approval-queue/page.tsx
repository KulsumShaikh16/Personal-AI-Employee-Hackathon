'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Check, X, Clock, Users, FileText } from 'lucide-react';
import { mockData } from '@/lib/mockData';

export default function ApprovalQueuePage() {
  const { approvalQueue } = mockData;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'linkedin_post':
        return <Users className="h-4 w-4" />;
      case 'payment':
        return <FileText className="h-4 w-4" />;
      case 'skill':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-heading">Approval Queue</h1>
        <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
          {approvalQueue.filter(item => item.status === 'pending').length} pending
        </Badge>
      </div>

      <div className="space-y-4">
        {approvalQueue.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="glass-effect-dark border-border hover:border-purple-500/50 transition-all">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{item.time}</span>
                  <Badge variant={item.status === 'pending' ? 'secondary' : 'default'}>
                    {item.status}
                  </Badge>
                </div>
              </CardHeader>
              {item.status === 'pending' && (
                <CardContent className="flex justify-end space-x-2">
                  <Button variant="outline" className="border-emerald-500/30 text-emerald-400">
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button variant="outline" className="border-red-500/30 text-red-400">
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </CardContent>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}