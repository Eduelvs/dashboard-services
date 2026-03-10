import { Button } from "@mui/material";
import LiquidGlass from "@nkzw/liquid-glass";
import React, { useRef } from "react";

interface GlassButtonProps {
  children: React.ReactNode;
}

function GlassButton({ children }: GlassButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen h-screen overflow-hidden">
    <LiquidGlass
        mouseContainer={containerRef}
        elasticity={0.3}
        style={{ position: 'fixed', top: '50%', left: '50%' }}
      >
        <Button variant="contained" className="p-6">
          {children}
        </Button>
      </LiquidGlass>
    </div>
  );
}

export { GlassButton };

