import useUser from "@/hooks/useUser";

const SingleRequest = () => {
  const user = useUser();

  return (
    <>
      <p>{JSON.stringify(user)}</p>
      <p>SingleRequest page</p>
    </>
  );
};

export default SingleRequest;
