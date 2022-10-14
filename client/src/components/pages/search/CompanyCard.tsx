import { Flex, Icon } from "@chakra-ui/react";
import { FiBriefcase } from "react-icons/fi";
import { CompanyCardSnippetFragment } from "../../../generated/graphql";
import createLink from "../../../utils/createLink";
import Card from "../../Common/Card";
import TextLink from "../../Common/TextLink";

interface ICompanySearchCard {
  company: CompanyCardSnippetFragment;
}

const CompanySearchCard = ({ company }: ICompanySearchCard) => {
  return (
    <Card>
      <Flex flexDir="row" justifyContent="space-between">
        <TextLink
          fontSize="lg"
          fontWeight="bold"
          link={createLink.company(company._id)}
        >
          {company.name}
        </TextLink>
        <Icon as={FiBriefcase} />
      </Flex>
    </Card>
  );
};

export default CompanySearchCard;
