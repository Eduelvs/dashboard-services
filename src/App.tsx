import { useRef } from "react";
import { GlassCard } from "../components";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen h-screen overflow-hidden">
      <img
        src="/img/image-like.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      <GlassCard mouseContainerRef={containerRef}>
        <h2>Glass responds to mouse anywhere in the container</h2>
      </GlassCard>
    </div>
  );
}