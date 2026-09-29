import React, { useEffect } from 'react';
import { ActiveScreen } from '../../types';

interface AerisCinematicLandingPageProps {
  onNavigateToScreen: (screen: ActiveScreen) => void;
  onSwitchToLegacy?: () => void;
}

export function AerisCinematicLandingPage({
  onNavigateToScreen,
  onSwitchToLegacy,
}: AerisCinematicLandingPageProps) {
  // Listen for postMessage from the embedded home-robot.html
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'NAVIGATE' && event.data.screen) {
        onNavigateToScreen(event.data.screen as ActiveScreen);
      }
      if (event.data && event.data.type === 'SWITCH_LEGACY' && onSwitchToLegacy) {
        onSwitchToLegacy();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onNavigateToScreen, onSwitchToLegacy]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-sans">


      {/* Embedded High-Fidelity AERIS-TWIN Website */}
      <iframe
        id="aerisLandingFrame"
        src="/home-robot.html"
        title="AERIS-TWIN Cinematic Digital Twin"
        className="w-full h-full border-none m-0 p-0 block bg-black"
        allow="autoplay; fullscreen; xr-spatial-tracking"
      />
    </div>
  );
}
