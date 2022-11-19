import React from "react";

import { useImmerReducer } from "use-immer";
import Panel from "../../components/Common/Panel";
import JobsiteMaterialsCosting from "../../components/pages/jobsite/id/views/JobsiteMaterials";
import { JobsiteFullSnippetFragment } from "../../generated/graphql";

/**
 * ----- Types -----
 */

interface IPanelProvider {
  children: React.ReactNode;
}

enum PanelType {
  JobsiteMaterials = "jobsiteMaterials",
}

type Panel = {
  type: PanelType;
  id: string;
  data: {
    jobsite: JobsiteFullSnippetFragment;
  };
};

interface IPanelState {
  panels: Panel[];
}

interface IPanelContext {
  state: IPanelState;
  addPanel: {
    jobsiteMaterial: (jobsite: JobsiteFullSnippetFragment) => void;
  };
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
 * ----- Reducer -----
 */

const PanelReducer = (
  draft: IPanelState,
  action: IPanelAction
): IPanelState => {
  switch (action.type) {
    case "add-panel": {
      const existingPanel = draft.panels.find(
        (panel) => panel.id === action.payload.panel.id
      );
      if (existingPanel)
        return {
          panels: draft.panels,
        };

      return {
        panels: [...draft.panels, action.payload.panel],
      };
    }
    case "remove-panel": {
      let panelsCopy = [...draft.panels];

      const removalIndex = panelsCopy.findIndex(
        (panel) => panel.id === action.payload.id
      );
      if (removalIndex !== -1) panelsCopy.splice(removalIndex, 1);

      return {
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
  };

  const removePanel = (id: string) => {
    dispatch({
      type: "remove-panel",
      payload: { id },
    });
  };

  /**
   * ----- Render -----
   */

  const panels = React.useMemo(() => {
    const panels: React.ReactNode[] = [];

    for (let i = 0; i < state.panels.length; i++) {
      const panel = state.panels[i];

      let item: { name: string; content: React.ReactNode } | null = null;
      switch (panel.type) {
        case PanelType.JobsiteMaterials: {
          const jobsite = panel.data.jobsite;
          item = {
            name: `${jobsite.jobcode} - Jobsite Materials`,
            content: <JobsiteMaterialsCosting jobsite={jobsite} hideExpand />,
          };
          break;
        }
      }

      if (item) {
        panels.push(
          <Panel name={item.name} id={panel.id}>
            {item.content}
          </Panel>
        );
      }
    }

    return panels;
  }, [state.panels]);

  return (
    <PanelContext.Provider value={{ state, addPanel, removePanel }}>
      <>{panels}</>
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
