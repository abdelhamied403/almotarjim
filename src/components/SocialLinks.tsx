import facebook from "@/assets/auth/Facebook.svg";
import google from "@/assets/auth/Google.svg";
import AuthService from "@/services/auth.service";
import { Button } from "./ui/button";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const SocialLinks = () => {
  const handleGoogleLogin = async (credential: CredentialResponse) => {
    await AuthService.googleLoginCallback(credential);
  };

  return (
    <div className="flex gap-2 items-center justify-center">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      <Button
        variant="link"
        className="bg-primary-500 w-12 h-11 flex items-center justify-center rounded-lg shadow-xl"
      >
        <img src={facebook} alt="almotarjim-facebook" />
      </Button>
      <Button variant="link">
        <img src={google} alt="almotarjim-google" />
      </Button>
    </div>
  );
};

export default SocialLinks;
