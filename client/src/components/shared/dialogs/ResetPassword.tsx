import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { DialogTypeEnum, useDialog } from "@/hooks/useDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth";
import { AxiosError } from "axios";
import { RegisterResponse } from "@/services/auth/types";
import { toast } from "sonner";

const formSchema = z.object({
  password: z.string().min(2, "Password must be at least 2 characters").max(50),
  confirmPassword: z
    .string()
    .min(2, "Password must be at least 2 characters")
    .max(50),
});

export const ResetDialog = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { isOpen, type, closeDialog, openDialog } = useDialog();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    openDialog(DialogTypeEnum.RESET);
  }, [token, navigate, openDialog]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: (response) => {
      toast.success(response.data.message || "Password reset successfully!");
      closeDialog();
      navigate("/");
    },
    onError: (error: AxiosError<RegisterResponse>) => {
      toast.error(error.response?.data.message || "Something went wrong!");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.password !== values.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    mutate({ password: values.password, token: token! });
  };

  //!!!!!!!! Prevent rendering the dialog if the token is invalid or missing
  if (!token || !isOpen || type !== DialogTypeEnum.RESET) return null;

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Don't have an account?{" "}
            <button
              onClick={() => openDialog(DialogTypeEnum.REGISTER)}
              className="text-primary"
            >
              Create an account
            </button>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="New Password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Confirm Password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Processing..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
