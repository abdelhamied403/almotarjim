import useUser from "@/hooks/useUser";

const SubmitRequest = () => {
  const user = useUser();

  return (
    <>
      <p>{JSON.stringify(user)}</p>
      <p>SubmitRequest page</p>
    </>
  );
};

export default SubmitRequest;
