import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [emailToVerify, setEmailToVerify] = useState("");
    const [otp, setOtp] = useState("");

    const { signIn, verifyEmailOTP, resendEmailOTP } = useAuth();
    const navigate = useNavigate();

    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const handleLogin = async (data: LoginForm) => {
        setIsLoading(true);
        const { error } = await signIn(data.email, data.password);
        setIsLoading(false);

        if (error) {
            if (error.message.includes("Email not confirmed")) {
                toast.error("Please verify your email to continue.");
                setEmailToVerify(data.email);
                setShowOTP(true);
                // Optionally resend OTP immediately
                await resendEmailOTP(data.email);
                toast.info("A new verification code has been sent to your email.");
            } else if (error.message.includes("Invalid login credentials")) {
                toast.error("Invalid email or password. Please try again.");
            } else {
                toast.error(error.message);
            }
        } else {
            toast.success("Welcome back!");
            navigate("/");
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp || otp.length < 6) {
            toast.error("Please enter a valid 6-digit code");
            return;
        }

        setIsLoading(true);
        const { error } = await verifyEmailOTP(emailToVerify, otp);
        setIsLoading(false);

        if (error) {
            toast.error(error.message || "Invalid OTP. Please try again.");
        } else {
            toast.success("Email verified successfully!");
            // After verification, try to sign in again automatically or just redirect
            // Since verifyOtp returns a session, we might be logged in already.
            // Let's check if we have a session or just redirect.
            navigate("/");
        }
    };

    const handleResendOTP = async () => {
        setIsLoading(true);
        const { error } = await resendEmailOTP(emailToVerify);
        setIsLoading(false);

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Verification code resent!");
        }
    };

    if (showOTP) {
        return (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="text-center mb-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Verify your email</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        Enter the code sent to <span className="font-medium text-foreground">{emailToVerify}</span>
                    </p>
                </div>

                <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div>
                        <Label htmlFor="otp">Verification Code</Label>
                        <div className="relative mt-1">
                            <Input
                                id="otp"
                                type="text"
                                placeholder="123456"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="pl-10 tracking-widest text-lg text-center"
                                autoFocus
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Verifying..." : "Verify & Sign In"}
                    </Button>

                    <div className="flex flex-col gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full"
                            onClick={handleResendOTP}
                            disabled={isLoading}
                        >
                            Resend Code
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full"
                            onClick={() => setShowOTP(false)}
                            disabled={isLoading}
                        >
                            Back to Login
                        </Button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
            <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        {...form.register("email")}
                        data-testid="email"
                    />
                </div>
                {form.formState.errors.email && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
            </div>

            <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        {...form.register("password")}
                        data-testid="password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>
                {form.formState.errors.password && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.password.message}</p>
                )}
            </div>

            <button
                type="button"
                onClick={() => navigate("/auth?mode=reset")}
                className="text-sm text-primary hover:underline"
            >
                Forgot password?
            </button>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
            </Button>
        </form>
    );
}
