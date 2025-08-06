// analytics.js
import { getAnalytics, isSupported } from 'firebase/analytics';
import { app } from './firebase';

let analyticsInstance = null;

export const initAnalytics = async () => {
  const supported = await isSupported();
  if (supported) {
    analyticsInstance = getAnalytics(app);
  }
};

export const logAnalyticsEvent = async (eventName, params = {}) => {
  if (!analyticsInstance) {
    const supported = await isSupported();
    if (!supported) return;

    analyticsInstance = getAnalytics(app);
  }

  import('firebase/analytics').then(({ logEvent }) => {
    logEvent(analyticsInstance, eventName, params);
  });
};
