import React from "react";
import { useSystem } from "../../../contexts/System";
import Select, { ISelect } from "./Select";

export interface IEmployeeWorkSelect extends Omit<ISelect, "options"> {}

const EmployeeWorkSelect = ({ ...props }: IEmployeeWorkSelect) => {
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
    const workTypes = process.env.NEXT_PUBLIC_WORK_TYPE;
    let work: string[] = [];
    if (workTypes) work = process.env.NEXT_PUBLIC_WORK_TYPE!.split(",");

    const options: ISelect["options"] = [];
    for (let i = 0; i < work.length; i++) {
      options.push({
        title: work[i],
        value: work[i],
      });
    }
    return options;
  }, []);

  /**
   * ----- Rendering -----
   */

  return <Select options={options} {...props} />;
};

export default EmployeeWorkSelect;
