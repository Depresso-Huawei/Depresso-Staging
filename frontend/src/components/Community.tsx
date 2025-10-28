import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Plus, 
  Shield, 
  Star,
  TrendingUp,
  Users,
  BookOpen
} from 'lucide-react';

const Community: React.FC = () => {
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  const communityPosts = [
    {
      id: 1,
      author: 'Sarah',
      avatar: '🌸',
      time: '2 hours ago',
      category: 'Success Story',
      content: 'After 30 days of using the mindfulness exercises, I\'ve noticed such a positive change in my daily outlook. The breathing techniques really help when I feel overwhelmed. Thank you to this amazing community for the support! 💙',
      likes: 24,
      comments: 8,
      isLiked: false,
      tags: ['mindfulness', 'breathing', 'gratitude']
    },
    {
      id: 2,
      author: 'Dr. Martinez',
      avatar: '👩‍⚕️',
      time: '5 hours ago',
      category: 'Professional Insight',
      content: 'Remember: healing isn\'t linear. Some days will be harder than others, and that\'s completely normal. Be patient with yourself and celebrate small victories. Your mental health journey is unique to you.',
      likes: 56,
      comments: 15,
      isLiked: true,
      tags: ['professional-advice', 'healing', 'self-compassion'],
      isProfessional: true
    },
    {
      id: 3,
      author: 'Alex',
      avatar: '🌟',
      time: '1 day ago',
      category: 'Question',
      content: 'Does anyone else find journaling difficult at first? I want to start but don\'t know where to begin. Any tips for getting over that initial hesitation?',
      likes: 12,
      comments: 22,
      isLiked: false,
      tags: ['journaling', 'getting-started', 'tips']
    },
    {
      id: 4,
      author: 'Community Team',
      avatar: '💙',
      time: '2 days ago',
      category: 'Community Update',
      content: 'This week\'s theme is "Small Steps, Big Changes." Share a small positive change you\'ve made recently, no matter how minor it might seem. Every step forward counts! 🌱',
      likes: 89,
      comments: 34,
      isLiked: true,
      tags: ['weekly-theme', 'positivity', 'progress'],
      isPinned: true
    }
  ];

  const weeklyHighlights = [
    { metric: 'Active Members', value: '2,847', change: '+12%' },
    { metric: 'Success Stories', value: '156', change: '+8%' },
    { metric: 'Peer Support', value: '1,203', change: '+15%' },
    { metric: 'Expert Posts', value: '28', change: '+5%' }
  ];

  const handleLike = (postId: number) => {
    // Like functionality would be implemented here
    console.log('Liked post:', postId);
  };

  const handleComment = (postId: number) => {
    // Comment functionality would be implemented here
    console.log('Comment on post:', postId);
  };

  const handleShare = (postId: number) => {
    // Share functionality would be implemented here
    console.log('Shared post:', postId);
  };

  const handleSubmitPost = () => {
    if (newPostContent.trim()) {
      // Submit new post functionality
      setNewPostContent('');
      setShowNewPost(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl mb-2" style={{ color: 'var(--slate-blue)' }}>
          Journeys of Hope Community 🤝
        </h1>
        <p className="text-gray-600">
          A safe, moderated space to share experiences and support one another.
        </p>
      </div>

      {/* Community Stats */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg" style={{ color: 'var(--slate-blue)' }}>Community Insights</h2>
          <TrendingUp className="w-6 h-6" style={{ color: 'var(--soft-mint)' }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {weeklyHighlights.map((highlight, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-medium" style={{ color: 'var(--slate-blue)' }}>
                {highlight.value}
              </p>
              <p className="text-sm text-gray-600">{highlight.metric}</p>
              <Badge 
                variant="secondary" 
                className="mt-1"
                style={{ backgroundColor: 'var(--soft-mint)', opacity: 0.2 }}
              >
                {highlight.change}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Safety Notice */}
      <Card className="p-4 border-l-4" style={{ borderLeftColor: 'var(--coral-accent)' }}>
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 mt-0.5" style={{ color: 'var(--coral-accent)' }} />
          <div>
            <h3 className="font-medium" style={{ color: 'var(--slate-blue)' }}>
              Community Guidelines
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              This is a supportive space moderated by mental health professionals. 
              Please be kind, respectful, and remember that this community is not a replacement for professional help.
            </p>
          </div>
        </div>
      </Card>

      {/* Create New Post */}
      <Card className="p-6">
        {!showNewPost ? (
          <Button
            onClick={() => setShowNewPost(true)}
            className="w-full flex items-center justify-center space-x-2"
            style={{ backgroundColor: 'var(--coral-accent)' }}
          >
            <Plus className="w-4 h-4" />
            <span>Share Your Journey</span>
          </Button>
        ) : (
          <div className="space-y-4">
            <h3 className="font-medium" style={{ color: 'var(--slate-blue)' }}>
              Share with the Community
            </h3>
            <Textarea
              placeholder="Share your experiences, victories, challenges, or questions. This community is here to support you..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="min-h-24"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {newPostContent.length}/500 characters
              </span>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowNewPost(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitPost}
                  disabled={!newPostContent.trim()}
                  style={{ backgroundColor: 'var(--coral-accent)' }}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Community Posts */}
      <div className="space-y-4">
        {communityPosts.map((post) => (
          <Card key={post.id} className="p-6">
            {post.isPinned && (
              <div className="flex items-center space-x-2 mb-3 pb-3 border-b border-gray-200">
                <Star className="w-4 h-4" style={{ color: 'var(--coral-accent)' }} />
                <span className="text-sm" style={{ color: 'var(--coral-accent)' }}>
                  Pinned Post
                </span>
              </div>
            )}
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-pastel-blue/20 flex items-center justify-center">
                <span className="text-lg">{post.avatar}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium">{post.author}</span>
                  {post.isProfessional && (
                    <Badge 
                      variant="secondary"
                      style={{ backgroundColor: 'var(--muted-lavender)', opacity: 0.8 }}
                    >
                      Mental Health Professional
                    </Badge>
                  )}
                  <span className="text-sm text-gray-500">{post.time}</span>
                </div>
                
                <Badge 
                  variant="outline" 
                  className="mb-3"
                  style={{ borderColor: 'var(--pastel-blue)' }}
                >
                  {post.category}
                </Badge>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="text-xs"
                      style={{ backgroundColor: 'var(--soft-gray)', opacity: 0.8 }}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 text-sm transition-colors ${
                      post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </button>
                  
                  <button
                    onClick={() => handleComment(post.id)}
                    className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare(post.id)}
                    className="flex items-center space-x-2 text-sm text-gray-500 hover:text-green-500 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Community Resources */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="w-6 h-6" style={{ color: 'var(--slate-blue)' }} />
          <h2 className="text-lg" style={{ color: 'var(--slate-blue)' }}>
            Community Resources
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2" style={{ color: 'var(--slate-blue)' }}>
              Crisis Resources
            </h3>
            <p className="text-sm text-gray-600">
              24/7 support lines and emergency contacts for immediate help.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2" style={{ color: 'var(--slate-blue)' }}>
              Weekly Support Groups
            </h3>
            <p className="text-sm text-gray-600">
              Facilitated group sessions every Tuesday and Thursday.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Community;