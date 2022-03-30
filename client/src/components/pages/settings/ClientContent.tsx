import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import CompanySettings from "./views/Companies";
import MaterialSettings from "./views/Materials";
import ProfileSettings from "./views/Profile";

const SettingsClientContent = () => {
  return (
    <Tabs isFitted>
      <TabList>
        <Tab>Profile</Tab>
        <Tab>Materials</Tab>
        <Tab>Companies</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ProfileSettings />
        </TabPanel>
        <TabPanel>
          <MaterialSettings />
        </TabPanel>
        <TabPanel>
          <CompanySettings />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SettingsClientContent;
