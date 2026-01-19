import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && !isPasswordFocused) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isPasswordFocused]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate error for demo
    setIsError(true);
    setTimeout(() => setIsError(false), 2000);
  };

  const eyeOffsetX = isPasswordFocused ? -4 : (mousePos.x - 0.5) * 6;
  const eyeOffsetY = isPasswordFocused ? 2 : (mousePos.y - 0.5) * 4;

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex max-w-4xl w-full">
        {/* Left Panel - Characters */}
        <div className="w-1/2 bg-[#f5f5f0] p-8 flex flex-col justify-center items-center relative">
          <div className="relative w-full h-80 flex items-end justify-center gap-2">
            {/* Purple Character */}
            <svg 
              viewBox="0 0 120 180" 
              className={`w-28 h-44 transition-transform duration-300 ${isError ? 'animate-shake' : ''}`}
            >
              {/* Body */}
              <path 
                d="M20 180 L40 20 Q60 0 80 20 L100 180 Z" 
                fill="#8B5CF6" 
              />
              {/* Face */}
              <g transform={`translate(${eyeOffsetX}, ${eyeOffsetY})`}>
                {/* Left Eye */}
                <ellipse cx="50" cy="80" rx="6" ry="8" fill="#1a1a2e" />
                {/* Right Eye */}
                <ellipse cx="70" cy="80" rx="6" ry="8" fill="#1a1a2e" />
              </g>
              {/* Mouth */}
              <path 
                d={isError ? "M50 110 Q60 100 70 110" : "M50 105 Q60 115 70 105"} 
                stroke="#1a1a2e" 
                strokeWidth="3" 
                fill="none"
                className="transition-all duration-300"
              />
            </svg>

            {/* Orange Character */}
            <svg 
              viewBox="0 0 140 120" 
              className={`w-32 h-28 transition-transform duration-300 ${isError ? 'animate-shake' : ''}`}
              style={{ animationDelay: '0.1s' }}
            >
              {/* Body */}
              <ellipse cx="70" cy="70" rx="65" ry="50" fill="#F97316" />
              {/* Face */}
              <g transform={`translate(${eyeOffsetX}, ${eyeOffsetY})`}>
                {/* Left Eye */}
                <circle cx="45" cy="55" r="5" fill="#1a1a2e" />
                {/* Right Eye */}
                <circle cx="75" cy="55" r="5" fill="#1a1a2e" />
              </g>
              {/* Mouth */}
              <path 
                d={isError ? "M50 80 Q60 70 70 80" : "M50 75 Q60 85 70 75"} 
                stroke="#1a1a2e" 
                strokeWidth="2.5" 
                fill="none"
                className="transition-all duration-300"
              />
            </svg>

            {/* Black Character */}
            <svg 
              viewBox="0 0 100 140" 
              className={`w-24 h-32 transition-transform duration-300 ${isError ? 'animate-shake' : ''}`}
              style={{ animationDelay: '0.15s' }}
            >
              {/* Body */}
              <rect x="10" y="20" width="80" height="100" rx="8" fill="#1a1a2e" />
              {/* Face */}
              <g transform={`translate(${eyeOffsetX}, ${eyeOffsetY})`}>
                {/* Left Eye */}
                <ellipse cx="35" cy="55" rx="5" ry="6" fill="white" />
                {/* Right Eye */}
                <ellipse cx="65" cy="55" rx="5" ry="6" fill="white" />
              </g>
              {/* Mouth */}
              <path 
                d={isError ? "M40 85 Q50 75 60 85" : "M40 80 Q50 90 60 80"} 
                stroke="white" 
                strokeWidth="2.5" 
                fill="none"
                className="transition-all duration-300"
              />
            </svg>

            {/* Yellow Character */}
            <svg 
              viewBox="0 0 100 130" 
              className={`w-24 h-32 transition-transform duration-300 ${isError ? 'animate-shake' : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              {/* Body */}
              <rect x="10" y="10" width="80" height="110" rx="12" fill="#FBBF24" />
              {/* Face */}
              <g transform={`translate(${eyeOffsetX}, ${eyeOffsetY})`}>
                {/* Left Eye - line */}
                <line x1="30" y1="50" x2="42" y2="50" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
                {/* Right Eye - line */}
                <line x1="58" y1="50" x2="70" y2="50" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
              </g>
              {/* Mouth */}
              <path 
                d={isError ? "M40 80 Q50 70 60 80" : "M40 75 Q50 85 60 75"} 
                stroke="#1a1a2e" 
                strokeWidth="2.5" 
                fill="none"
                className="transition-all duration-300"
              />
            </svg>
          </div>
          
          <p className="text-[#c4c4c0] text-4xl font-bold mt-8 tracking-wider">ZDAK</p>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-10 h-10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M12 2L15 8L12 14L9 8L12 2Z" fill="currentColor" />
                <path d="M12 10L18 14L12 22L6 14L12 10Z" fill="currentColor" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-center mb-2">Welcome back!</h1>
          <p className="text-muted-foreground text-center mb-8">Please enter your details</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="anna@gmail.com"
                className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
              />
            </div>

            <div>
              <label className={`text-sm mb-1.5 block ${isError ? 'text-red-500' : 'text-muted-foreground'}`}>
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  placeholder="••••••••••"
                  className={`border-0 border-b rounded-none px-0 pr-10 focus-visible:ring-0 ${
                    isError ? 'border-red-500 focus-visible:border-red-500' : 'border-border focus-visible:border-foreground'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                  Remember for 30 days
                </label>
              </div>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Forgot password?
              </a>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-lg h-11"
            >
              Log in
            </Button>

            <Button 
              type="button" 
              variant="outline" 
              className="w-full rounded-lg h-11 gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Log in with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="#" className="text-foreground font-medium hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
