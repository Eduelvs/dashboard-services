import LiquidGlass from "@nkzw/liquid-glass";
import React, { useRef } from "react";

interface GlassButtonProps {
  children: React.ReactNode;
  top: number;
  left: number;
}

function GlassButton({ children, top, left }: GlassButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen h-screen overflow-hidden">
        <LiquidGlass
            displacementScale={28}
            aberrationIntensity={1}
            elasticity={0.1}
            borderRadius={100}
            mouseContainer={containerRef}
            overLight={true}
            mode="standard"
            padding="8px 16px"
            style={{
              position: "fixed",
              top: `${top}%`,
              left: `${left}%`, 
            }}
          >
            <h3 className="text-lg font-medium flex items-center gap-2">
              {children}
            </h3>
          </LiquidGlass>
    </div>
  );
}

export { GlassButton };

