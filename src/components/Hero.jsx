const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background using local image provided by user */}
      <div
        className="hero-bg absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/download.jpeg')`,
        }}
        aria-hidden
      />

      {/* Fallback background for browsers that don't support video */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary" />
      {/* Gradient overlay from left for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 via-100% to-transparent" />
      {/* Content - Left aligned */}
      <div className="container mx-auto px-6 relative z-10 pt-32 pb-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-left">
            <span className="text-blue-500">TRANSFORM YOUR</span>
            <span className="block gradient-text">BODY & MIND</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-white max-w-xl mb-10 text-left">
            Join GymFlow and experience the ultimate fitness journey. State-of-the-art equipment, expert trainers, and a community that motivates.
          </p>
          {/* Subtle zoom animation for the hero background */}
          <style>{`
            .hero-bg {
              transform-origin: center;
              will-change: transform;
              animation: zoomSlow 20s ease-in-out infinite;
            }

            @keyframes zoomSlow {
              0% { transform: scale(1); }
              50% { transform: scale(1.06); }
              100% { transform: scale(1); }
            }
      `}</style>
        </div>
      </div>
    </section>
  );
}

export default Hero;
// touch
// touch
