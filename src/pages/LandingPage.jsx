import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const plans = [
    {
      name: 'Basic',
      price: '2,500',
      period: 'month',
      features: [
        'Access to gym equipment',
        'Locker room access',
        'Free Wi-Fi',
        '2 guest passes per month'
      ],
      popular: false
    },
    {
      name: 'Premium',
      price: '4,500',
      period: 'month',
      features: [
        'All Basic features',
        'Group fitness classes',
        'Personal trainer consultation',
        'Sauna & steam room',
        '5 guest passes per month'
      ],
      popular: true
    },
    {
      name: 'VIP',
      price: '8,000',
      period: 'month',
      features: [
        'All Premium features',
        'Unlimited personal training',
        'Nutrition planning',
        'Priority booking',
        'Unlimited guest passes',
        'Exclusive VIP lounge'
      ],
      popular: false
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero">
        <nav className="nav">
          <div className="logo">GymFlow</div>
          <div className="nav-links">
            <a href="#plans">Plans</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <Link to="/login" className="btn btn-outline">Login</Link>
          </div>
        </nav>
        <div className="hero-content">
          <h1>Transform Your Body, Transform Your Life</h1>
          <p>Join GymFlow today and start your fitness journey with state-of-the-art equipment, expert trainers, and a supportive community.</p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary btn-lg">Get Started</Link>
            <a href="#plans" className="btn btn-outline btn-lg">View Plans</a>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2>Why Choose GymFlow?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Modern Equipment</h3>
            <p>State-of-the-art fitness equipment for all your workout needs</p>
          </div>
          <div className="feature-card">
            <h3>Expert Trainers</h3>
            <p>Certified personal trainers to guide your fitness journey</p>
          </div>
          <div className="feature-card">
            <h3>Track Progress</h3>
            <p>Digital tools to monitor your workouts and achievements</p>
          </div>
          <div className="feature-card">
            <h3>Group Classes</h3>
            <p>Fun and engaging group fitness classes for all levels</p>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="plans-section">
        <h2>Choose Your Plan</h2>
        <p className="plans-subtitle">Select the membership that fits your fitness goals</p>
        <div className="plans-grid">
          {plans.map((plan) => (
            <div key={plan.name} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <h3>{plan.name}</h3>
              <div className="plan-price">
                <span className="currency">KES </span>
                <span className="amount">{plan.price}</span>
                <span className="period">/{plan.period}</span>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About GymFlow</h2>
        <p>GymFlow is more than just a gym - it's a community dedicated to helping you achieve your fitness goals. With over 10 years of experience, we've helped thousands of members transform their lives through fitness.</p>
        <div className="stats-grid">
          <div className="stat">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Active Members</span>
          </div>
          <div className="stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Expert Trainers</span>
          </div>
          <div className="stat">
            <span className="stat-number">100+</span>
            <span className="stat-label">Classes Weekly</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Gym Access</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>GymFlow</h3>
            <p>Your fitness journey starts here</p>
          </div>
          <div className="footer-links">
            <a href="#plans">Plans</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <Link to="/login">Login</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 GymFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
