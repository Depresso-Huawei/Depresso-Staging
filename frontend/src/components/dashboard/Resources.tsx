import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { supabase } from '../../lib/supabase';
import { ExternalLink, Phone, MessageSquare, Book, Brain } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
}

const categoryIcons: Record<string, any> = {
  crisis: Phone,
  meditation: Brain,
  therapy: Book,
  default: MessageSquare,
};

const categoryColors: Record<string, string> = {
  crisis: 'bg-red-100 text-red-700',
  meditation: 'bg-teal-100 text-teal-700',
  therapy: 'bg-blue-100 text-blue-700',
  default: 'bg-slate-100 text-slate-700',
};

export function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      const { data, error } = await supabase
        .from('mental_health_resources')
        .select('*')
        .eq('is_active', true)
        .limit(6);

      if (!error && data) {
        setResources(data);
      }
      setLoading(false);
    };

    fetchResources();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mental Health Resources</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-slate-500 text-center py-4">Loading resources...</p>
        ) : (
          <div className="space-y-3">
            {resources.map((resource) => {
              const Icon = categoryIcons[resource.category] || categoryIcons.default;
              const colorClass = categoryColors[resource.category] || categoryColors.default;

              return (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group"
                >
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-slate-800 group-hover:text-teal-600 transition-colors">
                        {resource.title}
                      </span>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
                    </div>
                    <p className="text-sm text-slate-600">{resource.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
