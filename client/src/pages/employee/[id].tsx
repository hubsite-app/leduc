import { Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import ClientOnly from "../../components/Common/ClientOnly";
import Container from "../../components/Common/Container";
import EmployeeClientContent from "../../components/pages/employee/ClientContent";
import { PageEmployeeSsrComp, ssrEmployeeSsr } from "../../generated/page";

const Employee: PageEmployeeSsrComp = ({ data }) => {
  const employee = data?.employee!;

  return (
    <Container>
      <Heading>{employee.name}</Heading>
      <ClientOnly>
        <EmployeeClientContent id={employee._id} />
      </ClientOnly>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  ...ctx
}) => {
  const res = await ssrEmployeeSsr.getServerPage(
    { variables: { id: params?.id as string } },
    ctx
  );

  let notFound = false;
  if (!res.props.data.employee) notFound = true;

  return { ...res, notFound };
};

export default Employee;
