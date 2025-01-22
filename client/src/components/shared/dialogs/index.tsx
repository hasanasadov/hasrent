import { ForgotDialog } from "./Forgot";
import { LoginDialog } from "./Login";
import { RegisterDialog } from "./Register";
import { ResetDialog } from "./ResetPassword";

export const Dialogs = () => {
  return (
    <>
      <LoginDialog />
      <RegisterDialog />
      <ForgotDialog />
      <ResetDialog />
    </>
  );
};
