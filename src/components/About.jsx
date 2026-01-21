import React from 'react'; // Assuming React is imported for JSX
const features = [
  {
    emoji: '🏋️',
    title: "Diverse Group Class Equipment",
    description: "Top-of-the-line machines and free weights for every workout style.",
  },
  {
    emoji: '👥',
    title: "Expert Trainers",
    description: "Certified professionals to guide you towards your fitness goals.",
  },
  {
    emoji: '⏰',
    title: "24/7 Access",
    description: "Work out on your schedule with round-the-clock gym access.",
  },
  {
    emoji: '🏆',
    title: "Proven Results",
    description: "Join thousands of members who have transformed their lives.",
  }
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl mb-4">
            WHY <span className="gradient-text">GYMFLOW</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
            More than just a gym – we're a community dedicated to helping you achieve your fitness goals with world-class facilities and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg card-elevated border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                 <span className="text-2xl">{feature.emoji}</span>
              </div>
              <h3 className="font-display text-2xl mb-3">{feature.title}</h3>
              <p className="font-body text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
