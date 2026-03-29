'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Settings, Activity, CheckCircle } from 'lucide-react';
import { mockData } from '@/lib/mockData';

export default function SkillsPage() {
  const { skills } = mockData;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-heading">AI Skills</h1>
        <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
          {skills.length} skills
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="glass-effect-dark border-border hover:border-cyan-500/50 transition-all h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5 text-cyan-400" />
                    {skill.name}
                  </CardTitle>
                  <Badge variant={skill.status === 'active' ? 'default' : 'secondary'}>
                    {skill.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{skill.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Usage count</span>
                  <span className="font-medium">{skill.usage}</span>
                </div>
                <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    style={{ width: `${Math.min(100, (skill.usage / 150) * 100)}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}