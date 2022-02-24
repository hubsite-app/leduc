import { extendTheme } from "@chakra-ui/react";

import sizes from "./foundations/sizes";
import fonts from "./foundations/fonts";
import space from "./foundations/space";
import styles from "./foundations/styles";
import colors from "./foundations/colors";
import shadows from "./foundations/shadows";
import zIndices from "./foundations/zIndices";
import fontSizes from "./foundations/fontSizes";
import fontWeights from "./foundations/fontWeights";
import lineHeights from "./foundations/lineHeights";
import breakpoints from "./foundations/breakpoints";
import borderRadius from "./foundations/borderRadius";
import letterSpacings from "./foundations/letterSpacings";

import Card from "./components/Card";

export default extendTheme({
  colors,
  breakpoints,
  space,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  sizes,
  borderRadius,
  zIndices,
  shadows,
  styles,
  components: {
    Card,
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});
