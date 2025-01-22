import { useAppDispatch } from "@/hooks/redux";
import authService from "@/services/auth";
import { getCurrentUserAsync } from "@/store/auth";
import { AxiosResponseError } from "@/types";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

function GoogleBtn({ className }: { className?: string }) {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const dispatch = useAppDispatch();
  const { mutate } = useMutation({
    mutationFn: authService.googleLogin,
    onSuccess: (response) => {
      console.log("response", response);

      dispatch(getCurrentUserAsync());
      toast.success(response.data.message);
    },
    onError: (err: AxiosResponseError) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  const handleSuccess = (response: any) => {
    const credential = response.credential;
    const decoded: { email: string; name: string; picture: string } =
      jwtDecode(credential);
    const { email, name, picture } = decoded;
    console.log(email, name, picture);
    mutate();
  };

  const handleError = () => {
    console.error("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className={className}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleBtn;
