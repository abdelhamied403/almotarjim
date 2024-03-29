import { useCallback, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import LanguageProvider from "./providers/LanguageProvider";
import MainRouter from "./router/MainRouter";
import AuthService from "./services/auth.service";
import useProfileStore from "./store/profile.slice";
import Spinner from "./components/ui/Spinner";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

const App = () => {
  const { setUser } = useProfileStore();
  const [loading, setLoading] = useState(true);

  const getUser = useCallback(async () => {
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
      <GoogleOAuthProvider clientId="83118576653-8akhfen8jq9uvei8ht5nbja3m39oom0e.apps.googleusercontent.com">
        <LanguageProvider defaultLocale="en">
          <QueryClientProvider client={queryClient}>
            {loading ? <Spinner /> : <MainRouter></MainRouter>}
          </QueryClientProvider>
        </LanguageProvider>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
