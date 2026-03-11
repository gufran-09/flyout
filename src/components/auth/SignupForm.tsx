import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const signupSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [stage, setStage] = useState<"signup" | "otp">("signup");
    const [emailToVerify, setEmailToVerify] = useState("");
    const [otp, setOtp] = useState("");

    const { signUp, verifyEmailOTP } = useAuth();
    const navigate = useNavigate();

    const form = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
        defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
    });

    const handleSignup = async (data: SignupForm) => {
        setIsLoading(true);
        const { error } = await signUp(data.email, data.password, data.fullName);
        setIsLoading(false);

        if (error) {
            if (error.message.includes("already registered")) {
                toast.error("This email is already registered. Please sign in instead.");
            } else {
                toast.error(error.message);
            }
        } else {
            toast.success("Account created! Please verify your email.");
            setEmailToVerify(data.email);
            setStage("otp");
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
            toast.success("Email verified successfully! Welcome to Flyout Tours.");
            navigate("/");
        }
    };

    if (stage === "otp") {
        return (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="text-center mb-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Check your email</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        We've sent a 6-digit verification code to <span className="font-medium text-foreground">{emailToVerify}</span>
                    </p>
                </div>

                <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div>
                        <Label htmlFor="otp">Verification Code</Label>
                        <div className="relative mt-1">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="otp"
                                type="text"
                                placeholder="123456"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="pl-10 tracking-widest text-lg"
                                autoFocus
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Verifying..." : "Verify Email"}
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        className="w-full"
                        onClick={() => setStage("signup")}
                        disabled={isLoading}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Sign Up
                    </Button>
                </form>
            </div>
        );
    }

    return (
        <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
            <div>
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10"
                        {...form.register("fullName")}
                        data-testid="fullName"
                    />
                </div>
                {form.formState.errors.fullName && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.fullName.message}</p>
                )}
            </div>

            <div>
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="signup-email"
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
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="signup-password"
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

            <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10"
                        {...form.register("confirmPassword")}
                        data-testid="confirmPassword"
                    />
                </div>
                {form.formState.errors.confirmPassword && (
                    <p className="text-destructive text-sm mt-1">{form.formState.errors.confirmPassword.message}</p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
            </Button>
        </form>
    );
}
