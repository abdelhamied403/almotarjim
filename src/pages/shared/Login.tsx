import useUser from "@/hooks/useUser";

const Login = () => {
  const user = useUser();

  return (
    <>
      <p>{JSON.stringify(user)}</p>
      <p>Login page</p>
    </>
  );
};

export default Login;
