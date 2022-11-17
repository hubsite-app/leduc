import {
  CompanyCardSnippetFragment,
  useCompanyFullQuery,
} from "../../../generated/graphql";
import CompanyMaterialReports from "../../Common/Company/MaterialReport";
import Loading from "../../Common/Loading";

interface ICompanyClientContent {
  company: CompanyCardSnippetFragment;
}

const CompanyClientContent = ({ company }: ICompanyClientContent) => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading } = useCompanyFullQuery({
    variables: {
      id: company._id,
    },
  });

  /**
   * ----- Render -----
   */

  if (data?.company && !loading) {
    return (
      <CompanyMaterialReports materialReports={data.company.materialReports} />
    );
  } else {
    return <Loading />;
  }
};

export default CompanyClientContent;
