"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Mail, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useVerifyOtp } from "@/hooks/useUser";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

type VerificationState = "input" | "loading" | "success" | "error";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const [verificationState, setVerificationState] =
    useState<VerificationState>("input");
  const verifyMutation = useVerifyOtp();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp && otp.length === 6) {
      const email = searchParams.get("email") as string;
      setVerificationState("loading");
      verifyMutation.mutate(
        { email, otp },
        {
          onSuccess: () => {
            setVerificationState("success");
            toast.success("email verification succeed.");
            router.push("/dashboard");
          },
          onError: () => {
            setVerificationState("error");
          },
        }
      );
    }
  };

  const handleTryAgain = () => {
    setOtp("");
    setVerificationState("input");
  };

  const renderContent = () => {
    switch (verificationState) {
      case "loading":
        return (
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
            <p className="text-muted-foreground">Verifying your email...</p>
          </div>
        );

      case "success":
        return (
          <div className="text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-green-700">
                Email Verified!
              </h3>
              <p className="text-muted-foreground">
                Your email has been successfully verified.
              </p>
            </div>
            <Button className="w-full">Continue</Button>
          </div>
        );

      case "error":
        return (
          <div className="text-center space-y-4">
            <XCircle className="h-12 w-12 text-red-600 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-red-700">
                Verification Failed
              </h3>
              <p className="text-muted-foreground">
                The code you entered is invalid or has expired.
              </p>
            </div>
            <Button
              onClick={handleTryAgain}
              variant="outline"
              className="w-full bg-transparent"
            >
              Try Again
            </Button>
          </div>
        );

      default:
        return (
          <form onSubmit={handleVerifySubmit} className="space-y-4">
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
                We sent a verification code to your email
              </p>
              <Button variant="link" className="text-sm">
                Didn&apos;t receive code? Resend
              </Button>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={otp.length !== 6}
            >
              Verify Email
            </Button>
          </form>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Mail className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Verify Your Email
          </CardTitle>
          <CardDescription>
            Enter the verification code to confirm your email address
          </CardDescription>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  );
}
