import authService from "@/services/auth";
import { AxiosResponseError } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const GitHubLogin = ({ className }: { className?: string }) => {
  const { mutate } = useMutation({
    mutationFn: authService.githubLogin,
    onSuccess: (response) => {
      console.log("response", response);

      toast.success(response.data.message);
    },
    onError: (err: AxiosResponseError) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full flex items-center justify-center bg-white border border-gray-300 rounded-sm ${className}`}
    >
      <span className="ml-2">Sign in with GitHub</span>
    </button>
  );
};

export default GitHubLogin;
