import React from "react";
import { useSystem } from "../../../contexts/System";
import Select, { ISelect } from "./Select";

export interface IFluidTypeSelect extends Omit<ISelect, "options"> { }

const FluidTypeSelect = ({
  placeholder = "Select fluid",
  ...props
}: IFluidTypeSelect) => {
  /**
   * ------ Hook Initialization -----
   */

  const {
    state: { system },
  } = useSystem();

  /**
   * ----- Variables -----
   */

  const options: ISelect["options"] = React.useMemo(() => {
    if (!system) return [];
    const options: ISelect["options"] = [];

    for (let i = 0; i < system.fluidTypes.length; i++) {
      options.push({
        title: system.fluidTypes[i],
        value: system.fluidTypes[i],
      });
    }
    return options;
  }, [system]);

  /**
   * ----- Rendering -----
   */

  return <Select placeholder={placeholder} options={options} {...props} />;
};

export default FluidTypeSelect;
