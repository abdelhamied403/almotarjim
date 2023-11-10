import facebook from "../../../assets/auth/Facebook.svg";
import google from "../../../assets/auth/Google.svg";
import apple from "../../../assets/auth/Apple.svg";
import { Link } from "react-router-dom";

const SocialLinks = () => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <Link
        to="#"
        className="bg-primary-500 w-12 h-11 flex items-center justify-center rounded-lg shadow-xl"
      >
        <img src={facebook} alt="almotarjim-facebook" />
      </Link>
      <Link to="#">
        <img src={google} alt="almotarjim-google" />
      </Link>
      <Link to="#">
        <img src={apple} alt="almotarjim-apple" />
      </Link>
    </div>
  );
};

export default SocialLinks;
