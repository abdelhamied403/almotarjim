import facebook from "@/assets/auth/Facebook.svg";
import google from "@/assets/auth/Google.svg";
import apple from "@/assets/auth/Apple.svg";
import AuthService from "@/services/auth.service";
import { Button } from "./ui/button";

const SocialLinks = () => {
  const handleFacebookLogin = async () => {
    const res = await AuthService.facebookLogin();
    console.log(res);
  };

  return (
    <div className="flex gap-2 items-center justify-center">
      <Button
        variant="link"
        onClick={handleFacebookLogin}
        className="bg-primary-500 w-12 h-11 flex items-center justify-center rounded-lg shadow-xl"
      >
        <img src={facebook} alt="almotarjim-facebook" />
      </Button>
      <Button variant="link">
        <img src={google} alt="almotarjim-google" />
      </Button>
      <Button variant="link">
        <img src={apple} alt="almotarjim-apple" />
      </Button>
    </div>
  );
};

export default SocialLinks;
