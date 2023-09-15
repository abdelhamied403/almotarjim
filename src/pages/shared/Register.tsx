import useUser from "@/hooks/useUser";

const Register = () => {
  const user = useUser();

  return (
    <>
      <p>{JSON.stringify(user)}</p>
      <p>Register page</p>
    </>
  );
};

export default Register;
