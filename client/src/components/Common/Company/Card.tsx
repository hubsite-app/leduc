import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { FiArchive } from "react-icons/fi";
import {
  CompaniesDocument,
  CompanyCardSnippetFragment,
  useCompanyArchiveMutation,
} from "../../../generated/graphql";
import Card from "../Card";
import Permission from "../Permission";

interface ICompanyCard {
  company: CompanyCardSnippetFragment;
}

const CompanyCard = ({ company }: ICompanyCard) => {
  /**
   * ----- Hook Initialization
   */

  const [archive, { loading: archiveLoading, data: archiveData }] =
    useCompanyArchiveMutation({
      refetchQueries: [CompaniesDocument],
    });

  /**
   * ----- Rendering -----
   */

  return (
    <Card filter={archiveData?.companyArchive._id ? "blue(3px)" : ""}>
      <Flex flexDir="row" justifyContent="space-between">
        <Heading size="md">{company.name}</Heading>
        <Flex flexDir="row">
          <Permission>
            <IconButton
              aria-label="archive"
              icon={<FiArchive />}
              backgroundColor="transparent"
              isLoading={archiveLoading}
              onClick={() => {
                if (window.confirm("Are you sure?"))
                  archive({
                    variables: {
                      id: company._id,
                    },
                  });
              }}
            />
          </Permission>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CompanyCard;
