import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, User, FileText, Clock, ArrowRight } from 'lucide-react';

interface ActionCardProps {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'urgent';
  time: string;
  type: string;
}

export function ActionCard({ title, description, status, time, type }: ActionCardProps) {
  const statusConfig = {
    pending: { 
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', 
      icon: Clock,
      gradient: 'from-amber-500/10 to-orange-500/10',
      glow: 'hover:shadow-amber-500/20'
    },
    'in-progress': { 
      color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30', 
      icon: ArrowRight,
      gradient: 'from-cyan-500/10 to-blue-500/10',
      glow: 'hover:shadow-cyan-500/20'
    },
    completed: { 
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', 
      icon: Clock,
      gradient: 'from-emerald-500/10 to-teal-500/10',
      glow: 'hover:shadow-emerald-500/20'
    },
    urgent: { 
      color: 'bg-red-500/20 text-red-400 border-red-500/30', 
      icon: Clock,
      gradient: 'from-red-500/10 to-rose-500/10',
      glow: 'hover:shadow-red-500/20'
    },
  };

  const typeConfig: Record<string, { icon: any; color: string }> = {
    gmail: { icon: Mail, color: 'text-red-400' },
    whatsapp: { icon: MessageCircle, color: 'text-green-400' },
    linkedin: { icon: User, color: 'text-blue-400' },
    file: { icon: FileText, color: 'text-purple-400' },
  };

  const config = statusConfig[status];
  const TypeIcon = typeConfig[type]?.icon || Clock;
  const typeColor = typeConfig[type]?.color || 'text-muted-foreground';
  const StatusIcon = config.icon;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`glass-effect-dark border-border bg-gradient-to-br ${config.gradient} glass-card-hover hover:shadow-lg ${config.glow} transition-all duration-300`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg bg-white/5 ${typeColor}`}>
                <TypeIcon className="h-4 w-4" />
              </div>
              <CardTitle className="text-base font-semibold text-foreground">{title}</CardTitle>
            </div>
            <Badge 
              variant="secondary" 
              className={`${config.color} text-xs px-2 py-0.5 flex items-center gap-1`}
            >
              <StatusIcon className="h-3 w-3" />
              {status}
            </Badge>
          </div>
          <div className="flex items-center text-xs text-muted-foreground mt-2">
            <Clock className="h-3 w-3 mr-1" />
            <span>{time}</span>
            <span className="mx-2">•</span>
            <span className={typeColor}>{type}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}