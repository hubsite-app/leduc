import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

interface ICrumb {
  title: string;
  link?: string;
  isCurrentPage?: boolean;
}

interface IBreadcrumbs {
  crumbs: ICrumb[];
}

const Breadcrumbs = ({ crumbs }: IBreadcrumbs) => {
  return (
    <Breadcrumb>
      {crumbs.map((crumb, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink href={crumb.link} isCurrentPage={crumb.isCurrentPage}>
            {crumb.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
