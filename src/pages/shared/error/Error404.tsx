import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import error from "../../../assets/error.png";

const Error404 = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen w-screen bg-primary-600">
        <div className="grid md:grid-cols-2 gap-10 items-center ">
          <div className="flex flex-col text-white text-4xl gap-10 text-center">
            <h1>404</h1>
            <Link to="/">
              <Button variant={"error"}>Go To Home Page</Button>
            </Link>
          </div>
          <div className="order-first">
            <img src={error} alt="404 not found" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
