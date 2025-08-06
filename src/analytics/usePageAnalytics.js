import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAnalytics, logEvent } from 'firebase/analytics';

const analytics = getAnalytics();

const usePageAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const pagePath = location.pathname;

    // Log the page_view event
    logEvent(analytics, 'page_view', {
      page_location: window.location.href,
      page_path: pagePath,
    });

  }, [location]);
};

export default usePageAnalytics;
