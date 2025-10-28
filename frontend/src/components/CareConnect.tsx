import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { 
  Heart, 
  Search, 
  MapPin, 
  Star, 
  Calendar, 
  Clock,
  Video,
  Phone,
  MessageSquare,
  Filter,
  User,
  CheckCircle
} from 'lucide-react';

const CareConnect: React.FC = () => {
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    specialty: '',
    availability: '',
    sessionType: '',
    priceRange: [50, 200]
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState<number | null>(null);

  const therapists = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      title: 'Licensed Clinical Psychologist',
      specialty: 'Depression & Anxiety',
      rating: 4.9,
      reviewCount: 127,
      location: 'San Francisco, CA',
      availability: 'Available this week',
      priceRange: '$120-150',
      sessionTypes: ['In-person', 'Video', 'Phone'],
      bio: 'Specializing in cognitive behavioral therapy and mindfulness-based interventions for depression and anxiety disorders.',
      languages: ['English', 'Mandarin'],
      yearsExperience: 8,
      nextAvailable: 'Tomorrow 2:00 PM',
      image: '👩‍⚕️'
    },
    {
      id: 2,
      name: 'Dr. Michael Rodriguez',
      title: 'Licensed Marriage & Family Therapist',
      specialty: 'Depression & Trauma',
      rating: 4.8,
      reviewCount: 89,
      location: 'Los Angeles, CA',
      availability: 'Available next week',
      priceRange: '$100-130',
      sessionTypes: ['Video', 'Phone'],
      bio: 'Compassionate approach to treating depression, trauma, and relationship issues using evidence-based therapies.',
      languages: ['English', 'Spanish'],
      yearsExperience: 12,
      nextAvailable: 'Monday 10:00 AM',
      image: '👨‍⚕️'
    },
    {
      id: 3,
      name: 'Dr. Emily Thompson',
      title: 'Clinical Social Worker',
      specialty: 'Young Adults & Depression',
      rating: 4.9,
      reviewCount: 156,
      location: 'Seattle, WA',
      availability: 'Available today',
      priceRange: '$80-110',
      sessionTypes: ['In-person', 'Video'],
      bio: 'Focused on helping young adults navigate depression, life transitions, and building healthy coping strategies.',
      languages: ['English'],
      yearsExperience: 6,
      nextAvailable: 'Today 4:30 PM',
      image: '👩‍💼'
    },
    {
      id: 4,
      name: 'Dr. James Park',
      title: 'Psychiatrist',
      specialty: 'Medication Management',
      rating: 4.7,
      reviewCount: 203,
      location: 'Austin, TX',
      availability: 'Available this week',
      priceRange: '$200-250',
      sessionTypes: ['In-person', 'Video'],
      bio: 'Board-certified psychiatrist specializing in medication management for depression and mood disorders.',
      languages: ['English', 'Korean'],
      yearsExperience: 15,
      nextAvailable: 'Thursday 11:00 AM',
      image: '👨‍⚕️'
    }
  ];

  const bookingSteps = [
    { step: 1, title: 'Select Therapist', completed: false, current: true },
    { step: 2, title: 'Choose Appointment', completed: false, current: false },
    { step: 3, title: 'Complete Intake', completed: false, current: false },
    { step: 4, title: 'Confirmation', completed: false, current: false }
  ];

  const handleBookAppointment = (therapistId: number) => {
    setSelectedTherapist(therapistId);
    // Booking logic would go here
  };

  const renderSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Video className="w-4 h-4" />;
      case 'Phone':
        return <Phone className="w-4 h-4" />;
      case 'In-person':
        return <User className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl mb-2" style={{ color: 'var(--slate-blue)' }}>
          Care Connect 💙
        </h1>
        <p className="text-gray-600">
          Find and connect with qualified mental health professionals who understand your journey.
        </p>
      </div>

      {/* Progress Indicator */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          {bookingSteps.map((step, index) => (
            <div key={step.step} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                step.completed 
                  ? 'bg-soft-mint border-soft-mint text-white' 
                  : step.current
                  ? 'border-slate-blue text-slate-blue'
                  : 'border-gray-300 text-gray-300'
              }`}
              style={
                step.completed 
                  ? { backgroundColor: 'var(--soft-mint)', borderColor: 'var(--soft-mint)' }
                  : step.current
                  ? { borderColor: 'var(--slate-blue)', color: 'var(--slate-blue)' }
                  : {}
              }>
                {step.completed ? <CheckCircle className="w-4 h-4" /> : step.step}
              </div>
              <span className={`ml-2 text-sm ${
                step.current ? 'font-medium' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
              {index < bookingSteps.length - 1 && (
                <div className={`w-8 h-0.5 mx-4 ${
                  step.completed ? 'bg-soft-mint' : 'bg-gray-300'
                }`}
                style={step.completed ? { backgroundColor: 'var(--soft-mint)' } : {}} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, specialty, or location..."
                className="pl-10"
                value={searchFilters.location}
                onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>

          {showFilters && (
            <div className="grid md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="depression">Depression</SelectItem>
                  <SelectItem value="anxiety">Anxiety</SelectItem>
                  <SelectItem value="trauma">Trauma</SelectItem>
                  <SelectItem value="couples">Couples Therapy</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Session Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-person">In-person</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Available Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="next-week">Next Week</SelectItem>
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">Price Range: ${searchFilters.priceRange[0]}-${searchFilters.priceRange[1]}</label>
                <Slider
                  value={searchFilters.priceRange}
                  onValueChange={(value) => setSearchFilters({ ...searchFilters, priceRange: value })}
                  max={300}
                  min={50}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Therapist Directory */}
      <div className="grid gap-6">
        {therapists.map((therapist) => (
          <Card key={therapist.id} className="p-6">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 rounded-full bg-pastel-blue/20 flex items-center justify-center text-2xl">
                {therapist.image}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-medium" style={{ color: 'var(--slate-blue)' }}>
                      {therapist.name}
                    </h3>
                    <p className="text-gray-600">{therapist.title}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{therapist.rating}</span>
                        <span className="text-sm text-gray-500">({therapist.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{therapist.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium" style={{ color: 'var(--slate-blue)' }}>
                      {therapist.priceRange}
                    </p>
                    <p className="text-sm text-gray-500">per session</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge style={{ backgroundColor: 'var(--muted-lavender)', opacity: 0.8 }}>
                    {therapist.specialty}
                  </Badge>
                  <Badge variant="outline">{therapist.yearsExperience} years experience</Badge>
                  {therapist.languages.map((lang, index) => (
                    <Badge key={index} variant="secondary">{lang}</Badge>
                  ))}
                </div>

                <p className="text-gray-700 mb-4">{therapist.bio}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">{therapist.nextAvailable}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {therapist.sessionTypes.map((type, index) => (
                        <div key={index} className="flex items-center space-x-1 text-gray-500">
                          {renderSessionTypeIcon(type)}
                          <span className="text-xs">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleBookAppointment(therapist.id)}
                      style={{ backgroundColor: 'var(--coral-accent)' }}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Emergency Resources */}
      <Card className="p-6 border-l-4" style={{ borderLeftColor: 'var(--coral-accent)' }}>
        <div className="flex items-start space-x-3">
          <Heart className="w-6 h-6 mt-1" style={{ color: 'var(--coral-accent)' }} />
          <div>
            <h3 className="font-medium mb-2" style={{ color: 'var(--slate-blue)' }}>
              Need Immediate Support?
            </h3>
            <p className="text-gray-600 mb-3">
              If you're experiencing a mental health crisis, please reach out for immediate help:
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" style={{ color: 'var(--coral-accent)' }} />
                <span className="text-sm">National Suicide Prevention Lifeline: 988</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" style={{ color: 'var(--coral-accent)' }} />
                <span className="text-sm">Crisis Text Line: Text HOME to 741741</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CareConnect;