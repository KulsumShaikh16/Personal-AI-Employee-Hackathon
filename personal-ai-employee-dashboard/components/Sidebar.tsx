'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Mail, 
  MessageCircle, 
  Clock, 
  Users, 
  FileText, 
  Settings, 
  Activity,
  Linkedin,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      color: 'from-cyan-500 to-blue-500',
      glow: 'group-hover:shadow-cyan-500/50'
    },
    {
      title: 'Watchers',
      href: '/watchers',
      icon: Activity,
      color: 'from-purple-500 to-pink-500',
      glow: 'group-hover:shadow-purple-500/50'
    },
    {
      title: 'Pending Actions',
      href: '/pending-actions',
      icon: Clock,
      color: 'from-amber-500 to-orange-500',
      glow: 'group-hover:shadow-amber-500/50'
    },
    {
      title: 'Approval Queue',
      href: '/approval-queue',
      icon: Users,
      color: 'from-emerald-500 to-teal-500',
      glow: 'group-hover:shadow-emerald-500/50'
    },
    {
      title: 'Logs',
      href: '/logs',
      icon: FileText,
      color: 'from-slate-500 to-gray-500',
      glow: 'group-hover:shadow-slate-500/50'
    },
    {
      title: 'Skills',
      href: '/skills',
      icon: Settings,
      color: 'from-violet-500 to-purple-500',
      glow: 'group-hover:shadow-violet-500/50'
    },
    {
      title: 'LinkedIn',
      href: '/linkedin',
      icon: Linkedin,
      color: 'from-blue-600 to-blue-400',
      glow: 'group-hover:shadow-blue-500/50'
    },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block w-72 backdrop-blur-xl bg-slate-900/80">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {/* Logo Section */}
        <div className="flex h-16 items-center border-b border-white/10 px-6 lg:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 opacity-30 blur group-hover:opacity-50 transition-opacity"></div>
            </div>
            <div>
              <span className="font-heading text-xl font-bold gradient-text block">AI Employee</span>
              <span className="text-xs text-muted-foreground">Control Panel</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="grid items-start px-3 text-sm font-medium lg:px-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 relative overflow-hidden',
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg ${item.glow}`
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  )}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent shimmer"></div>
                  )}
                  <div className={cn(
                    "relative z-10 flex items-center justify-center h-9 w-9 rounded-lg transition-all duration-300",
                    isActive 
                      ? 'bg-white/20 shadow-inner' 
                      : `bg-gradient-to-br ${item.color} opacity-60 group-hover:opacity-100 group-hover:scale-110`
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="relative z-10 font-medium">{item.title}</span>
                  {isActive && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t border-white/10">
          <div className="glass-effect-dark rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 status-online"></div>
                </div>
                <span className="text-sm font-medium text-emerald-400">System Online</span>
              </div>
              <ThemeToggle />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Watchers</span>
                <span className="text-cyan-400 font-medium">2 Active</span>
              </div>
              <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}