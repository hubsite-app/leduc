import { useRouter } from "next/router";
import React from "react";
import Container from "../components/Common/Container";
import Loading from "../components/Common/Loading";
import { useAuth } from "../contexts/Auth";

const Home = () => {
  /**
   * ----- Hook Initialization -----
   */

  const {
    state: { user },
  } = useAuth();

  const router = useRouter();

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (user) {
      switch (user.settings.homeView) {
        case "DailyReports": {
          router.push("/daily-reports");
          break;
        }
        default: {
          router.push("/daily-reports");
          break;
        }
      }
    }
  }, [router, user]);

  return (
    <Container>
      <Loading />
    </Container>
  );
};

export default Home;
