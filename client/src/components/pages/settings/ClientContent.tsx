import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import AdminOnly from "../../Common/AdminOnly";
import CompanySettings from "./views/Companies";
import MaterialSettings from "./views/Materials";
import ProfileSettings from "./views/Profile";
import SystemSettings from "./views/System";

const SettingsClientContent = () => {
  return (
    <Tabs isFitted>
      <TabList>
        <Tab>Profile</Tab>
        <AdminOnly>
          <Tab>System</Tab>
          <Tab>Materials</Tab>
          <Tab>Companies</Tab>
        </AdminOnly>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ProfileSettings />
        </TabPanel>
        <TabPanel>
          <SystemSettings />
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
