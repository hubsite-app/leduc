import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FiX } from "react-icons/fi";

import { useImmerReducer } from "use-immer";
import Panel from "../../components/Common/Panel";
import ExpenseInvoices from "../../components/pages/jobsite/id/views/ExpenseInvoices";
import JobsiteMaterialsCosting from "../../components/pages/jobsite/id/views/JobsiteMaterials";
import RevenueInvoices from "../../components/pages/jobsite/id/views/RevenueInvoices";
import { JobsiteFullSnippetFragment } from "../../generated/graphql";

/**
 * ----- Types -----
 */

interface IPanelProvider {
  children: React.ReactNode;
}

enum PanelType {
  JobsiteMaterials = "jobsiteMaterials",
  JobsiteExpenseInvoices = "jobsiteExpenseInvoices",
  JobsiteRevenueInvoices = "jobsiteRevenueInvoices",
}

type Panel =
  | {
      type: PanelType.JobsiteMaterials;
      id: string;
      data: {
        jobsite: JobsiteFullSnippetFragment;
      };
    }
  | {
      type: PanelType.JobsiteExpenseInvoices;
      id: string;
      data: {
        jobsite: JobsiteFullSnippetFragment;
      };
    }
  | {
      type: PanelType.JobsiteRevenueInvoices;
      id: string;
      data: {
        jobsite: JobsiteFullSnippetFragment;
      };
    };

interface PanelItem {
  panel: Panel;
  hidden: boolean;
}

interface IPanelState {
  panels: PanelItem[];
}

interface IPanelContext {
  state: IPanelState;
  addPanel: {
    jobsiteMaterial: (jobsite: JobsiteFullSnippetFragment) => void;
    jobsiteExpenseInvoices: (jobsite: JobsiteFullSnippetFragment) => void;
    jobsiteRevenueInvoices: (jobsite: JobsiteFullSnippetFragment) => void;
  };
  focusPanel: (id: string) => void;
  minimizePanel: (id: string) => void;
  removePanel: (id: string) => void;
}

type IPanelAction =
  | {
      type: "add-panel";
      payload: {
        panel: Panel;
      };
    }
  | {
      type: "focus-panel";
      payload: {
        id: string;
      };
    }
  | {
      type: "minimize-panel";
      payload: {
        id: string;
      };
    }
  | {
      type: "remove-panel";
      payload: {
        id: string;
      };
    }
  | {
      type: "clear-panels";
    };

/**
 * ----- Initialize Variables -----
 */

const initialState: IPanelState = {
  panels: [],
};

const PanelContext = React.createContext<IPanelContext | undefined>(undefined);

/**
 * ----- Helper Functions -----
 */

const getPanelName = (panel: Panel) => {
  switch (panel.type) {
    case PanelType.JobsiteMaterials: {
      return `${panel.data.jobsite.jobcode} - Jobsite Materials`;
    }
    case PanelType.JobsiteExpenseInvoices: {
      return `${panel.data.jobsite.jobcode} - Sub Invoices`;
    }
    case PanelType.JobsiteRevenueInvoices: {
      return `${panel.data.jobsite.jobcode} - Revenue`;
    }
  }
};

/**
 * ----- Reducer -----
 */

const PanelReducer = (
  draft: IPanelState,
  action: IPanelAction
): IPanelState => {
  switch (action.type) {
    case "add-panel": {
      const existingPanel = draft.panels.find(
        (panelItem) => panelItem.panel.id === action.payload.panel.id
      );
      if (existingPanel) {
        // Focus panel
        const panelsCopy: PanelItem[] = JSON.parse(
          JSON.stringify(draft.panels)
        );

        const panelIndex = panelsCopy.findIndex(
          (panelItem) => panelItem.panel.id === action.payload.panel.id
        );
        if (panelIndex !== -1) {
          const panel = panelsCopy[panelIndex];
          panel.hidden = false;
          panelsCopy.splice(panelIndex, 1);
          panelsCopy.unshift(panel);
        }

        return {
          ...draft,
          panels: panelsCopy,
        };
      }

      return {
        ...draft,
        panels: [
          ...draft.panels,
          {
            panel: action.payload.panel,
            hidden: false,
          },
        ],
      };
    }
    case "focus-panel": {
      const panelsCopy: PanelItem[] = JSON.parse(JSON.stringify(draft.panels));

      const panelIndex = panelsCopy.findIndex(
        (panelItem) => panelItem.panel.id === action.payload.id
      );
      if (panelIndex !== -1) {
        const panel = panelsCopy[panelIndex];
        panel.hidden = false;
        panelsCopy.splice(panelIndex, 1);
        panelsCopy.unshift(panel);
      }

      return {
        ...draft,
        panels: panelsCopy,
      };
    }
    case "minimize-panel": {
      const panelsCopy: PanelItem[] = JSON.parse(JSON.stringify(draft.panels));

      const panelIndex = panelsCopy.findIndex(
        (panelItem) => panelItem.panel.id === action.payload.id
      );
      if (panelIndex !== -1) panelsCopy[panelIndex].hidden = true;

      return {
        panels: panelsCopy,
      };
    }
    case "remove-panel": {
      let panelsCopy = [...draft.panels];

      const removalIndex = panelsCopy.findIndex(
        (panelItem) => panelItem.panel.id === action.payload.id
      );
      if (removalIndex !== -1) panelsCopy.splice(removalIndex, 1);

      return {
        ...draft,
        panels: panelsCopy,
      };
    }
    case "clear-panels": {
      return {
        panels: [],
      };
    }
  }
};

/**
 * ----- Provider -----
 */

const PanelProvider = ({ children }: IPanelProvider) => {
  const [state, dispatch] = useImmerReducer(PanelReducer, initialState);

  /**
   * ----- Hook Initialization -----
   */

  /**
   * ----- Functions -----
   */

  const addPanel = {
    jobsiteMaterial: (jobsite: JobsiteFullSnippetFragment) => {
      dispatch({
        type: "add-panel",
        payload: {
          panel: {
            type: PanelType.JobsiteMaterials,
            id: `${PanelType.JobsiteMaterials}-${jobsite._id}`,
            data: {
              jobsite,
            },
          },
        },
      });
    },
    jobsiteExpenseInvoices: (jobsite: JobsiteFullSnippetFragment) => {
      dispatch({
        type: "add-panel",
        payload: {
          panel: {
            type: PanelType.JobsiteExpenseInvoices,
            id: `${PanelType.JobsiteExpenseInvoices}-${jobsite._id}`,
            data: {
              jobsite,
            },
          },
        },
      });
    },
    jobsiteRevenueInvoices: (jobsite: JobsiteFullSnippetFragment) => {
      dispatch({
        type: "add-panel",
        payload: {
          panel: {
            type: PanelType.JobsiteRevenueInvoices,
            id: `${PanelType.JobsiteRevenueInvoices}-${jobsite._id}`,
            data: {
              jobsite,
            },
          },
        },
      });
    },
  };

  const focusPanel = React.useCallback(
    (id: string) => {
      dispatch({
        type: "focus-panel",
        payload: {
          id,
        },
      });
    },
    [dispatch]
  );

  const minimizePanel = (id: string) => {
    dispatch({
      type: "minimize-panel",
      payload: {
        id,
      },
    });
  };

  const removePanel = React.useCallback(
    (id: string) => {
      dispatch({
        type: "remove-panel",
        payload: { id },
      });
    },
    [dispatch]
  );

  /**
   * ----- Render -----
   */

  const hiddenPanels = React.useMemo(() => {
    let minimizedPanels: Panel[] = [];
    for (let i = 0; i < state.panels.length; i++) {
      if (state.panels[i].hidden) minimizedPanels.push(state.panels[i].panel);
    }

    if (minimizedPanels.length > 0) {
      return (
        <Menu>
          <MenuButton
            position="fixed"
            bottom="0.5rem"
            left="0.5rem"
            backgroundColor="gray.500"
            fontWeight="bold"
            borderRadius="50%"
            width="50px"
            height="50px"
            color="white"
            _hover={{ backgroundColor: "gray.800" }}
          >
            {minimizedPanels.length}
          </MenuButton>
          <MenuList>
            {minimizedPanels.map((panel) => (
              <MenuItem onClick={() => focusPanel(panel.id)} key={panel.id}>
                <Flex flexDir="row" justifyContent="space-between" w="100%">
                  <Text fontWeight="bold" my="auto" mr="1">
                    {getPanelName(panel)}
                  </Text>
                  <IconButton
                    size="sm"
                    aria-label="remove"
                    background="transparent"
                    icon={<FiX />}
                    onClick={() => removePanel(panel.id)}
                  />
                </Flex>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      );
    } else return null;
  }, [focusPanel, removePanel, state.panels]);

  const panels = React.useMemo(() => {
    const panels: React.ReactNode[] = [];

    for (let i = 0; i < state.panels.length; i++) {
      const panelItem = state.panels[i];

      let item: { name: string; content: React.ReactNode } | null = null;
      switch (panelItem.panel.type) {
        case PanelType.JobsiteMaterials: {
          const jobsite = panelItem.panel.data.jobsite;
          item = {
            name: getPanelName(panelItem.panel),
            content: (
              <JobsiteMaterialsCosting
                jobsite={jobsite}
                hideExpand
                displayFullList
              />
            ),
          };
          break;
        }
        case PanelType.JobsiteExpenseInvoices: {
          const jobsite = panelItem.panel.data.jobsite;
          item = {
            name: getPanelName(panelItem.panel),
            content: (
              <ExpenseInvoices jobsite={jobsite} hideExpand displayFullList />
            ),
          };
          break;
        }
        case PanelType.JobsiteRevenueInvoices: {
          const jobsite = panelItem.panel.data.jobsite;
          item = {
            name: getPanelName(panelItem.panel),
            content: (
              <RevenueInvoices jobsite={jobsite} hideExpand displayFullList />
            ),
          };
        }
      }

      if (item) {
        panels.push(
          <Panel
            name={item.name}
            id={panelItem.panel.id}
            zIndex={50 - i}
            key={panelItem.panel.id}
            hidden={panelItem.hidden}
          >
            {item.content}
          </Panel>
        );
      }
    }

    return panels;
  }, [state.panels]);

  return (
    <PanelContext.Provider
      value={{ state, addPanel, removePanel, focusPanel, minimizePanel }}
    >
      {panels}
      {hiddenPanels}
      {children}
    </PanelContext.Provider>
  );
};

const usePanel = () => {
  const context = React.useContext(PanelContext);

  if (context === undefined)
    throw new Error(
      "usePanel can only be used in a component wrapped by PanelProvider"
    );

  return context;
};

export { PanelProvider, usePanel };
