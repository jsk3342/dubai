import { useEffect, useRef, useState } from 'react';
import './ScrollVideo.css';

const ScrollVideo = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Animation starts after scrolling past first viewport
      // 0 at top, 1 after scrolling 3x viewport height
      const animationStart = 0;
      const animationEnd = windowHeight * 3;

      let progress = (scrollY - animationStart) / (animationEnd - animationStart);
      progress = Math.max(0, Math.min(1, progress));

      setScrollProgress(progress);

      // Video time sync
      if (video && video.duration) {
        const targetTime = progress * video.duration;
        video.currentTime = targetTime;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation phase (0 ~ 0.25): Video moves from center to right + shrinks
  const animationProgress = Math.min(scrollProgress / 0.25, 1);

  // Video transform calculations
  // Scale: 1 -> 0.95 (shrink slightly)
  const videoScale = 1 - (animationProgress * 0.05);
  // Move: center (-50%) -> right side with padding (-5%)
  const videoTranslateX = -50 + (animationProgress * 45);

  // Text animation: appears from bottom
  const textProgress = Math.max(0, Math.min((scrollProgress - 0.1) / 0.15, 1));
  const textTranslateY = (1 - textProgress) * 80;

  return (
    <div className="landing-page">
      {/* Hero Section with Video */}
      <div ref={containerRef} className="hero-container">
        <div className="sticky-hero">

          {/* Text Content - Left side, comes from bottom */}
          <div
            className="hero-text"
            style={{
              opacity: textProgress,
              transform: `translateY(calc(-50% + ${textTranslateY}px))`
            }}
          >
            <span className="tag">Viral Sensation</span>
            <h1>Dubai<br />Chewy<br />Cookie</h1>
            <p className="subtitle">
              The dessert that broke the internet.<br />
              Crispy kataifi meets pistachio cream.
            </p>
            <div className="features">
              <div className="feature">Pistachio</div>
              <div className="feature">Kataifi</div>
              <div className="feature">Chocolate</div>
            </div>
          </div>

          {/* Video - Starts centered, moves to right on scroll */}
          <div
            className="video-wrapper"
            style={{
              transform: `translate(${videoTranslateX}%, -50%) scale(${videoScale})`
            }}
          >
            <video
              ref={videoRef}
              className="hero-video"
              muted
              playsInline
              preload="auto"
              src="/kling_20260118_Image_to_Video_A_smaller__3681_0.mp4"
            />
          </div>

          {/* Scroll indicator */}
          <div
            className="scroll-indicator"
            style={{ opacity: scrollProgress < 0.02 ? 1 : 0 }}
          >
            <span>Scroll</span>
            <div className="scroll-line"></div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="story-section">
        <div className="story-content">
          <h2>What is <span className="highlight">Dubai Cookie</span>?</h2>
          <p>
            Born from the viral Dubai chocolate bar craze, this indulgent treat combines
            luxurious pistachio cream and crispy kataifi noodles in a thick, chewy cookie.
          </p>
          <div className="story-stats">
            <div className="stat">
              <span className="stat-number">100M+</span>
              <span className="stat-label">Views</span>
            </div>
            <div className="stat">
              <span className="stat-number">#1</span>
              <span className="stat-label">Trending</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* BBC Feature Section */}
      <section className="press-section">
        <div className="press-content">
          <div className="press-badge">Featured in</div>
          <div className="bbc-logo">BBC</div>
          <blockquote>
            "The Dubai chocolate craze has swept across continents, inspiring countless
            variations including the beloved chewy cookie adaptation."
          </blockquote>
          <a
            href="https://www.bbc.com/news/articles/c07xdv0mggzo"
            target="_blank"
            rel="noopener noreferrer"
            className="read-more"
          >
            Read Article
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Dubai Chewy Cookie</p>
      </footer>
    </div>
  );
};

export default ScrollVideo;
