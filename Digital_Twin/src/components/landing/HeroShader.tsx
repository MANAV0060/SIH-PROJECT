import React, { Component, ReactNode } from 'react';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ShaderErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('WebGPU/Shader context notice:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * High-performance Fallback Shader Effect in CSS/SVG
 * Matches the exact #ffffff, #f0f0f0, #ff5f03 chromatic flow and fluted refraction
 */
function FallbackCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div 
        className="absolute -top-[20%] -left-[10%] w-[120%] h-[140%] opacity-85"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 48% 40%, rgba(255, 95, 3, 0.45) 0%, rgba(255, 138, 64, 0.25) 35%, rgba(240, 240, 240, 0.6) 70%, rgba(239, 239, 239, 0.95) 100%)',
          filter: 'blur(55px)',
          animation: 'pulse 14s ease-in-out infinite alternate',
        }}
      />
      <div 
        className="absolute top-[10%] right-[15%] w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 95, 3, 0.38) 0%, rgba(255, 160, 90, 0.18) 50%, transparent 75%)',
          filter: 'blur(60px)',
          animation: 'float 18s ease-in-out infinite alternate',
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

export function HeroShader() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none w-full h-full overflow-hidden">
      <ShaderErrorBoundary fallback={<FallbackCanvas />}>
        <Shader className="w-full h-full">
          <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
          <ChromaFlow 
            baseColor="#ffffff" 
            downColor="#ff5f03" 
            leftColor="#ff5f03" 
            rightColor="#ff5f03" 
            upColor="#ff5f03" 
            momentum={13} 
            radius={3.5} 
          />
          <FlutedGlass 
            aberration={0.61} 
            angle={31} 
            frequency={8} 
            highlight={0.12} 
            highlightSoftness={0} 
            lightAngle={-90} 
            refraction={4} 
            shape="rounded" 
            softness={1} 
            speed={0.15} 
          />
          <FilmGrain strength={0.05} />
        </Shader>
      </ShaderErrorBoundary>
    </div>
  );
}
