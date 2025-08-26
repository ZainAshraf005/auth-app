"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowLeft, Mail, Shield, Lock } from "lucide-react";
import { useResetOtp, useResetPassword, useVerifyOtp } from "@/hooks/useUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PasswordResetFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const otpMutation = useResetOtp();
  const verifyMutation = useVerifyOtp();
  const resetPassword = useResetPassword();
  const router = useRouter();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      otpMutation.mutate(
        { email, type: "reset" },
        {
          onSuccess: () => {
            setCurrentStep(2);
          },
        }
      );
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp && otp.length === 6) {
      verifyMutation.mutate(
        { email, otp },
        {
          onSuccess: () => {
            setCurrentStep(3);
          },
        }
      );
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && confirmPassword && password === confirmPassword) {
      resetPassword.mutate(
        { email, password },
        {
          onSuccess: () => {
            toast.success("password updated successfully.", {
              description: "now you can login with updated credentials.",
            });
            router.push("/login");
          },
        }
      );
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            {currentStep > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={goBack}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex-1" />
          </div>

          <div className="flex justify-center mb-4">
            {currentStep === 1 && <Mail className="h-12 w-12 text-blue-600" />}
            {currentStep === 2 && (
              <Shield className="h-12 w-12 text-green-600" />
            )}
            {currentStep === 3 && (
              <Lock className="h-12 w-12 text-purple-600" />
            )}
          </div>

          <CardTitle className="text-2xl font-bold">
            {currentStep === 1 && "Reset Password"}
            {currentStep === 2 && "Verify Code"}
            {currentStep === 3 && "New Password"}
          </CardTitle>

          <CardDescription>
            {currentStep === 1 &&
              "Enter your email address to receive a reset code"}
            {currentStep === 2 && "Enter the 6-digit code sent to your email"}
            {currentStep === 3 && "Create a new secure password"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}
            >
              {/* Step 1: Email Input */}
              <div className="w-full flex-shrink-0">
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={otpMutation.isPending}
                  >
                    Send Reset Code
                  </Button>
                </form>
              </div>

              {/* Step 2: OTP Input */}
              <div className="w-full flex-shrink-0">
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => setOtp(value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Code sent to {email}
                    </p>
                    <Button variant="link" className="text-sm">
                      Didn&apos;t receive code? Resend
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={verifyMutation.isPending}
                  >
                    Verify Code
                  </Button>
                </form>
              </div>

              {/* Step 3: Password Reset */}
              <div className="w-full flex-shrink-0">
                <form onSubmit={handlePasswordReset} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={resetPassword.isPending}
                  >
                    Reset Password
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 w-8 rounded-full transition-colors duration-200 ${
                  step === currentStep
                    ? "bg-blue-600"
                    : step < currentStep
                    ? "bg-green-500"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
