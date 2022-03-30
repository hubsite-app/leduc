import { Heading } from "@chakra-ui/react";
import ClientOnly from "../components/Common/ClientOnly";
import Container from "../components/Common/Container";
import SettingsClientContent from "../components/pages/settings/ClientContent";

const Settings = () => {
  return (
    <Container>
      <Heading>Settings</Heading>
      <ClientOnly>
        <SettingsClientContent />
      </ClientOnly>
    </Container>
  );
};

export default Settings;
