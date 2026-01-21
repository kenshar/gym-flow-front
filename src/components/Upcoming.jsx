import React from 'react';
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';

const events = [
  {
    title: "HIIT Bootcamp Challenge",
    date: "Jan 20, 2026",
    time: "6:00 AM - 7:00 AM",
    location: "Main Training Floor",
    spots: 12,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400"
  },
  {
    title: "Yoga Flow Session",
    date: "Jan 22, 2026",
    time: "7:30 AM - 8:30 AM",
    location: "Studio B",
    spots: 20,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400"
  },
  {
    title: "Strength Training Workshop",
    date: "Jan 25, 2026",
    time: "5:00 PM - 7:00 PM",
    location: "Weight Room",
    spots: 8,
    image: "https://media.istockphoto.com/id/1937164504/photo/man-dumbbell-and-weightlifting-in-fitness-workout-or-arm-exercise-on-bench-at-indoor-gym.jpg?s=612x612&w=0&k=20&c=0hE2lkA56dsaWVkSZrmeiEf04jRC3yUrtbigGWfXvvU="
  }
];

const Upcoming = () => {
  return (
    <section id="upcoming" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl mb-4">
            UPCOMING <span className="gradient-text">EVENTS</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
            Join our exciting fitness events and challenges. Book your spot today and take your training to the next level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 group card-elevated"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl mb-4">{event.title}</h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground font-body">
                    <FiCalendar className="w-5 h-5 text-primary" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground font-body">
                    <FiMapPin className="w-5 h-5 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground font-body">
                    <FiUsers className="w-5 h-5 text-primary" />
                    <span>{event.spots} spots left</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Upcoming;
