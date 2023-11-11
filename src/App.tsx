import { useCallback, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import LanguageProvider from "./providers/LanguageProvider";
import MainRouter from "./router/MainRouter";
import AuthService from "./services/auth.service";
import useProfileStore from "./store/profile.slice";
import Spinner from "./components/ui/Spinner";

const queryClient = new QueryClient();

const App = () => {
  const { setUser } = useProfileStore();
  const [loading, setLoading] = useState(false);

  const getUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await AuthService.getUser();
      setUser(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
      <LanguageProvider defaultLocale="en">
        <QueryClientProvider client={queryClient}>
          {loading ? <Spinner /> : <MainRouter></MainRouter>}
        </QueryClientProvider>
      </LanguageProvider>
    </>
  );
};

export default App;
