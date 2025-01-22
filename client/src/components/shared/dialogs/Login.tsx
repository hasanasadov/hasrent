import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useAppDispatch } from "@/hooks/redux";
import { getCurrentUserAsync } from "@/store/auth";
import GitHubLogin from "../OAuth/GithubLogin";
import GoogleLoginComponent from "../OAuth/GoogleBtn";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export const LoginDialog = () => {
  const { isOpen, closeDialog, type, openDialog } = useDialog();
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      dispatch(getCurrentUserAsync());
      toast.success(response.data.message);
      closeDialog();
      form.reset();
    },
    onError: (error: AxiosError<RegisterResponse>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (isOpen && type !== DialogTypeEnum.LOGIN) {
    return null;
  }

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-3xl">Sign In</DialogTitle>
          <DialogDescription>
            Don't have an account?{"  "}
            <button
              onClick={() => openDialog(DialogTypeEnum.REGISTER)}
              className="text-primary"
            >
              Create an account
            </button>
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-4 h-10 w-full">
          <GoogleLoginComponent className="w-full" />
          <GitHubLogin className="w-1/2" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="***********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogDescription>
              Forgot your password?{"  "}
              <button
                type="button"
                onClick={() => openDialog(DialogTypeEnum.FORGOT)}
                className="text-primary"
              >
                Reset password
              </button>
            </DialogDescription>
            <Button type="submit" className="w-full" disabled={isPending}>
              Sign In
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
