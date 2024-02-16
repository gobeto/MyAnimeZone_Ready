import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  // State to control button visibility
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle button visibility
  const toggleVisibility = () => {
    // If we have scrolled more than 200px from the top, show the button
    if (window.pageYOffset > 200) {
      setIsVisible(true);
    } else {
      // Otherwise, hide the button
      setIsVisible(false);
    }
  };

  // Effect to add/remove event listener on scroll
  useEffect(() => {
    // Add scroll event listener when component mounts
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup: remove scroll event listener when component unmounts
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll
    });
  };

  // Render the button only if isVisible is true
  return (
    isVisible && (
      <button 
        onClick={scrollToTop} // On click, scroll to top
        className="fixed bottom-4 right-4 p-2 bg-slate-500 text-white rounded-full" // Styling classes
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
        </svg>

      </button>
    )
  );
};

export default ScrollToTopButton; // Export the component