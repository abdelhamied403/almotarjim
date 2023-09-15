import useUser from "@/hooks/useUser";

const CreateRequest = () => {
  const user = useUser();

  return (
    <>
      <p>{JSON.stringify(user)}</p>
      <p>CreateRequest page</p>
    </>
  );
};

export default CreateRequest;
