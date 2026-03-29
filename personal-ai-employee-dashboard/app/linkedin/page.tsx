'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Users, Send, Eye, Heart, MessageCircle } from 'lucide-react';
import { mockData } from '@/lib/mockData';

export default function LinkedInPage() {
  const { linkedinPosts } = mockData;

  const draftPost = linkedinPosts.find(post => post.status === 'draft');
  const publishedPost = linkedinPosts.find(post => post.status === 'published');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-heading">LinkedIn Manager</h1>
        <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
          Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {draftPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-effect-dark border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="mr-2 h-5 w-5 text-emerald-400" />
                  Draft Post
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">{draftPost.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{draftPost.content}</p>
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    <Send className="mr-2 h-4 w-4" />
                    Post Now
                  </Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {publishedPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="glass-effect-dark border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-400" />
                  Last Published
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">{publishedPost.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{publishedPost.content}</p>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Heart className="mr-1 h-4 w-4 text-red-400" />
                    {publishedPost.likes}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="mr-1 h-4 w-4 text-blue-400" />
                    {publishedPost.comments}
                  </div>
                  <span className="text-muted-foreground">{publishedPost.created}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-effect-dark border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-cyan-400" />
              Post History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {linkedinPosts.map((post, index) => (
                <div key={post.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                  <div>
                    <h4 className="font-medium">{post.title}</h4>
                    <p className="text-sm text-muted-foreground">{post.created}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-red-400" />
                      <span className="text-sm">{post.likes}</span>
                      <MessageCircle className="ml-2 h-4 w-4 text-blue-400" />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}