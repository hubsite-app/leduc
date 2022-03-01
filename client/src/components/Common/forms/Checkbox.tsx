import { Checkbox as Check, CheckboxProps } from "@chakra-ui/react";

const Checkbox = ({ children, ...props }: CheckboxProps) => {
  return <Check {...props}>{children}</Check>;
};

export default Checkbox;
