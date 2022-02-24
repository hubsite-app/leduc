const baseStyle = {
  backgroundColor: "white",
  padding: "2",
  my: "2",
  borderRadius: "0.25em",
  width: "100%",
  boxShadow: "bottomShadow",
};

const Card = {
  baseStyle,
  variants: {
    full: {
      border: "1px solid gray",
      padding: "2",
      margin: "2",
      marginLeft: "0px",
      marginRight: "0px",
      borderRadius: "0.25em",
      width: "100%",
    },
  },
};

export default Card;
