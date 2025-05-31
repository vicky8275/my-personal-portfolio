import { useEffect, useRef, useState } from 'react';

/**
 * Custom React hook to trigger animations when an element scrolls into view.
 * Uses Intersection Observer API for efficient visibility detection.
 *
 * @param {number} threshold - A number between 0 and 1, indicating the percentage of the target element
 * that should be visible to trigger the callback.
 * @returns {[React.RefObject, boolean]} - A ref to attach to the DOM element and a boolean indicating
 * if the element is currently visible (and thus should animate).
 */
const useAnimateOnScroll = (threshold = 0.1) => {
  const ref = useRef(null); // Ref to attach to the DOM element
  const [isVisible, setIsVisible] = useState(false); // State to track visibility

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the element is intersecting (i.e., in view)
        if (entry.isIntersecting) {
          setIsVisible(true); // Set visibility to true
          observer.unobserve(entry.target); // Stop observing once it has animated
        }
      },
      { threshold } // Options for the observer, including the visibility threshold
    );

    // If the ref is attached to a DOM element, start observing it
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup function: disconnect the observer when the component unmounts
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current); // Ensure observer is disconnected
      }
      observer.disconnect(); // Disconnect the observer completely
    };
  }, [threshold]); // Re-run effect if threshold changes

  return [ref, isVisible]; // Return the ref and visibility state
};

export default useAnimateOnScroll;
