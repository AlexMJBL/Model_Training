import logoLight from '../assets/logo_light.png';

export default function NavBar() {
  return (
    <nav className="py-5 px-10 bg-glass-bg backdrop-blur-md border-b border-glass-border flex justify-center items-center sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-3">
        <img 
          src={logoLight} 
          alt="ML Vision Logo" 
          className="h-14 object-contain drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]" 
        />
        <h1 className="font-main text-[28px] font-bold text-text-main m-0 tracking-[1px]">
          <span className="text-accent-cyan drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]">ML</span> <span className="bg-gradient-to-r from-[#E2E8F0] to-[#94A3B8] bg-clip-text text-transparent">Vision</span>
        </h1>
      </div>
    </nav>
  );
}
