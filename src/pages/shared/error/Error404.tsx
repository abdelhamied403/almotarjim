import useUser from "@/hooks/useUser";

const Error404 = () => {
  const user = useUser();

  return (
    <>
      <p>{JSON.stringify(user)}</p>
      <p>Error404 page</p>
    </>
  );
};

export default Error404;
