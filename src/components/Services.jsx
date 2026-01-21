import React from 'react';

const services = [
  {
    name: "Essential Fitness",
    price: "Ksh 1,500",
    period: "/month",
    features: [
      "Cardio",
      "Access to gym floor",
      "Basic equipment usage",
      "Locker room access",
      "Mobile app access"
    ],
    popular: false
  },
  {
    name: "Diverse Group Class",
    price: "Ksh 3,500",
    period: "/month",
    features: [
      "Yoga",
      "Zumba",
      "Everything in Essential Fitness",
      "Group fitness classes",
      "Personal trainer (2x/month)",
      "Nutrition consultation",
      "Sauna & spa access"
    ],
    popular: true
  },
  {
    name: "Wellness % Recovery",
    price: "Ksh 9,000",
    period: "/month",
    features: [
      "Spa Services",
      "Physiotherapy",
      "Unlimited personal training",
      "Private locker",
      "Guest passes (4/month)",
      "Recovery zone access",
      "Priority class booking"
    ],
    popular: false
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl mb-4">
            MEMBERSHIP <span className="gradient-text">PLANS</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose the plan that fits your lifestyle and fitness goals. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card p-8 rounded-lg border transition-all duration-300 hover:scale-105 ${plan.popular ? 'border-primary card-elevated animate-pulse-glow' : 'border-border hover:border-primary/50'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <h3 className="font-display text-3xl mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="font-display text-5xl gradient-text">{plan.price}</span>
                <span className="text-muted-foreground ml-1">{plan.period}</span>
              </div>

              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-body text-muted-foreground">
                    <span className="w-5 h-5">✔️</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
