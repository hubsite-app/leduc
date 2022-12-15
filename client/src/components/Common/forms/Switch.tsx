import React from "react";
import {
  FormControl,
  FormLabel,
  Switch as Sw,
  SwitchProps,
} from "@chakra-ui/react";

interface ISwitch extends SwitchProps {
  id: string;
  label?: string;
}

const Switch = ({ id, label, ...switchProps }: ISwitch) => {
  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel htmlFor={id} mb="0">
        {label}
      </FormLabel>
      <Sw id="id" {...switchProps} />
    </FormControl>
  );
};

export default Switch;
