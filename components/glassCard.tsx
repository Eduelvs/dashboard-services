import LiquidGlass from "@nkzw/liquid-glass";
import React, { Fragment, useRef } from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Ref do container que tem o fundo (ex.: div com a imagem). Obrigatório para o fundo opaco funcionar: o LiquidGlass precisa ser filho direto desse container. */
  mouseContainerRef?: React.RefObject<HTMLDivElement | null>;
}

const glassStyle = {
  position: "fixed" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function GlassCard({ children, className, mouseContainerRef }: GlassCardProps) {
  const ownRef = useRef<HTMLDivElement>(null);
  const containerRef = mouseContainerRef ?? ownRef;

  const liquidGlass = (
    <LiquidGlass
      mouseContainer={containerRef}
      elasticity={0.3}
      style={glassStyle}
    >
      <div className="p-6">
        {children}
      </div>
    </LiquidGlass>
  );

  // Com mouseContainerRef: renderiza só o LiquidGlass para ficar no mesmo container da imagem (fundo opaco correto).
  if (mouseContainerRef) {
    return <Fragment>{liquidGlass}</Fragment>;
  }

  return (
    <div ref={ownRef} className={`relative z-10 w-full min-h-screen h-screen overflow-hidden ${className ?? ""}`}>
      {liquidGlass}
    </div>
  );
}

export { GlassCard };


