import { company_type } from "@/type/interface";
interface Props {
  company: company_type;
}

const RightHeader = ({ company }: Props) => {
  return <div>
    {company.name}
  </div>;
};

export default RightHeader;
