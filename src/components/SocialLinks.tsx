import AuthService from "@/services/auth.service";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import useProfileStore from "@/store/profile.slice";
import { useNavigate } from "react-router-dom";

const SocialLinks = () => {
  const { setUser } = useProfileStore();
  const navigate = useNavigate();

  const handleGoogleLogin = async (credential: CredentialResponse) => {
    const res = await AuthService.googleLoginCallback({
      access_token: credential.credential,
    });
    localStorage.setItem("token", res.token);
    const userData = await AuthService.getUser();
    setUser(userData.data);
    navigate("/dashboard");
  };

  return (
    <div className="flex gap-2 items-center justify-center">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default SocialLinks;
