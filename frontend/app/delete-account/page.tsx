"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDeleteUser } from "@/hooks/useUser";

export default function DeleteAccountPage() {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const deleteMutation = useDeleteUser();

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    deleteMutation.mutate(void {}, {
      onSuccess: (data) => {
        toast.success(data.message);
        router.push("/");
        setIsDeleting(false);
      },
    });
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <Trash2 className="w-8 h-8 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold">
              Sad to see you go
            </CardTitle>
            <CardDescription className="mt-2">
              We&apos;re sorry to see you leave. Your account and all associated data
              will be permanently removed.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-destructive mb-1">
                  This action cannot be undone
                </p>
                <p className="text-muted-foreground">
                  Deleting your account will permanently remove all your data,
                  settings, and content. This action is irreversible.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              variant="destructive"
              className="w-full"
              size="lg"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Deleting Account...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete My Account Permanently
                </>
              )}
            </Button>

            <Button
              onClick={handleGoBack}
              variant="outline"
              className="w-full bg-transparent"
              size="lg"
              disabled={isDeleting}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Changed your mind? You can always go back and keep your account
            active.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
