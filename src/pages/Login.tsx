import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isBlinking, setIsBlinking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Random blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(true);
    setTimeout(() => setIsError(false), 2000);
  };

  // Eye tracking
  const eyeOffsetX = (mousePos.x - 0.5) * 10;
  const eyeOffsetY = (mousePos.y - 0.5) * 6;

  // Body movement
  const bodyMoveX = (mousePos.x - 0.5) * 15;
  const bodyMoveY = (mousePos.y - 0.5) * 8;
  const bodyRotation = (mousePos.x - 0.5) * 5;

  // When showing password, all except black character look left
  const lookLeftOffsetX = -8;
  const lookLeftOffsetY = 0;

  // Calculate eye positions for each character
  const purpleEyeX = showPassword ? lookLeftOffsetX : eyeOffsetX;
  const purpleEyeY = showPassword ? lookLeftOffsetY : eyeOffsetY;

  const orangeEyeX = showPassword ? lookLeftOffsetX : eyeOffsetX;
  const orangeEyeY = showPassword ? lookLeftOffsetY : eyeOffsetY;

  const blackEyeX = eyeOffsetX;
  const blackEyeY = eyeOffsetY;

  const yellowEyeX = showPassword ? lookLeftOffsetX : eyeOffsetX;
  const yellowEyeY = showPassword ? lookLeftOffsetY : eyeOffsetY;

  // Body transforms
  const orangeBodyTransform = showPassword
    ? "translate(-6px, 0) rotate(-3deg)"
    : `translate(${bodyMoveX * 0.6}px, ${bodyMoveY * 0.4}px) rotate(${bodyRotation * 0.4}deg)`;

  const yellowBodyTransform = showPassword
    ? "translate(-8px, 0) rotate(-4deg)"
    : `translate(${bodyMoveX * 0.7}px, ${bodyMoveY * 0.5}px) rotate(${bodyRotation * 0.5}deg)`;

  const purpleBodyTransform = showPassword
    ? "translate(-5px, 0) rotate(-2deg)"
    : `translate(${bodyMoveX * 0.5}px, ${bodyMoveY * 0.3}px) rotate(${bodyRotation * 0.3}deg)`;

  const blackBodyTransform = `translate(${bodyMoveX * 0.4}px, ${bodyMoveY * 0.3}px) rotate(${bodyRotation * 0.2}deg)`;

  // Eye height for blinking
  const eyeScaleY = isBlinking ? 0.1 : 1;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex max-w-4xl w-full">
        {/* Left Panel - Characters */}
        <div className="w-1/2 bg-[#f5f5f0] p-8 flex flex-col justify-end items-start relative min-h-[520px]">
          <div className="relative w-[320px] h-[280px] ml-6 mb-2">
            {/* Purple Character - Tall irregular quadrilateral (back, behind orange) */}
            <div
              className={`absolute left-[70px] bottom-[80px] transition-transform duration-100 ease-out origin-bottom ${isError ? "animate-shake" : ""}`}
              style={{ transform: purpleBodyTransform, zIndex: 1 }}
            >
              <svg viewBox="0 0 90 180" className="w-[100px] h-[200px]">
                {/* Irregular quadrilateral body - tilted left */}
                <path d="M20 180 L0 45 L30 0 L90 15 L75 180 Z" fill="#8B5CF6" />
                {/* Face */}
                <g style={{ transform: `translate(${purpleEyeX}px, ${purpleEyeY}px)` }}>
                  {/* Left Eye */}
                  <ellipse
                    cx="32"
                    cy="55"
                    rx="5"
                    ry={6 * eyeScaleY}
                    fill="#1a1a2e"
                    style={{ transition: "ry 0.1s ease" }}
                  />
                  {/* Right Eye */}
                  <ellipse
                    cx="55"
                    cy="55"
                    rx="5"
                    ry={6 * eyeScaleY}
                    fill="#1a1a2e"
                    style={{ transition: "ry 0.1s ease" }}
                  />
                </g>
                {/* Mouth */}
                <path
                  d={isError ? "M32 85 Q43 75 55 85" : "M32 80 Q43 90 55 80"}
                  stroke="#1a1a2e"
                  strokeWidth="2.5"
                  fill="none"
                  className="transition-all duration-300"
                />
              </svg>
            </div>

            {/* Orange Character - Large half dome (front left, bottom) */}
            <div
              className={`absolute left-0 bottom-0 transition-transform duration-100 ease-out origin-bottom ${isError ? "animate-shake" : ""}`}
              style={{ transform: orangeBodyTransform, zIndex: 3 }}
            >
              <svg viewBox="0 0 200 120" className="w-[180px] h-[110px]">
                {/* Half dome body */}
                <ellipse cx="100" cy="120" rx="100" ry="90" fill="#F97316" />
                {/* Face */}
                <g style={{ transform: `translate(${orangeEyeX}px, ${orangeEyeY}px)` }}>
                  {/* Left Eye */}
                  <ellipse
                    cx="70"
                    cy="60"
                    rx="6"
                    ry={7 * eyeScaleY}
                    fill="#1a1a2e"
                    style={{ transition: "ry 0.1s ease" }}
                  />
                  {/* Right Eye */}
                  <ellipse
                    cx="115"
                    cy="60"
                    rx="6"
                    ry={7 * eyeScaleY}
                    fill="#1a1a2e"
                    style={{ transition: "ry 0.1s ease" }}
                  />
                </g>
                {/* Mouth */}
                <path
                  d={isError ? "M80 90 Q93 80 106 90" : "M80 85 Q93 95 106 85"}
                  stroke="#1a1a2e"
                  strokeWidth="2.5"
                  fill="none"
                  className="transition-all duration-300"
                />
              </svg>
            </div>

            {/* Black Character - Small rounded rectangle (middle, between orange and yellow) */}
            <div
              className={`absolute left-[145px] bottom-0 transition-transform duration-100 ease-out origin-bottom ${isError ? "animate-shake" : ""}`}
              style={{ transform: blackBodyTransform, zIndex: 2 }}
            >
              <svg viewBox="0 0 50 80" className="w-[55px] h-[90px]">
                {/* Rounded rectangle body */}
                <rect x="3" y="3" width="44" height="74" rx="6" fill="#1a1a2e" />
                {/* Face */}
                <g style={{ transform: `translate(${blackEyeX}px, ${blackEyeY}px)` }}>
                  {/* Left Eye */}
                  <ellipse
                    cx="16"
                    cy="30"
                    rx="4"
                    ry={5 * eyeScaleY}
                    fill="white"
                    style={{ transition: "ry 0.1s ease" }}
                  />
                  {/* Right Eye */}
                  <ellipse
                    cx="34"
                    cy="30"
                    rx="4"
                    ry={5 * eyeScaleY}
                    fill="white"
                    style={{ transition: "ry 0.1s ease" }}
                  />
                </g>
              </svg>
            </div>

            {/* Yellow Character - Rounded pill shape (right side) */}
            <div
              className={`absolute left-[195px] bottom-0 transition-transform duration-100 ease-out origin-bottom ${isError ? "animate-shake" : ""}`}
              style={{ transform: yellowBodyTransform, zIndex: 2 }}
            >
              <svg viewBox="0 0 70 115" className="w-[75px] h-[120px]">
                {/* Pill/rounded rectangle body */}
                <rect x="3" y="3" width="64" height="109" rx="32" fill="#FBBF24" />
                {/* Face */}
                <g style={{ transform: `translate(${yellowEyeX}px, ${yellowEyeY}px)` }}>
                  {/* Eyes - horizontal lines (squinting) */}
                  <line x1="18" y1="42" x2="28" y2="42" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
                  <line x1="40" y1="42" x2="50" y2="42" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
                </g>
                {/* Mouth - wavy squiggle */}
                <path
                  d={isError ? "M20 68 Q28 62 35 68 Q42 74 50 68" : "M20 65 Q28 70 35 65 Q42 60 50 65"}
                  stroke="#1a1a2e"
                  strokeWidth="2.5"
                  fill="none"
                  className="transition-all duration-300"
                />
              </svg>
            </div>
          </div>
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
              <label className={`text-sm mb-1.5 block ${isError ? "text-red-500" : "text-muted-foreground"}`}>
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className={`border-0 border-b rounded-none px-0 pr-10 focus-visible:ring-0 ${
                    isError
                      ? "border-red-500 focus-visible:border-red-500"
                      : "border-border focus-visible:border-foreground"
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

            <Button type="button" variant="outline" className="w-full rounded-lg h-11 gap-2">
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
