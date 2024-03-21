import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-products/client";
import { prod } from "@/constants/data";

const breadcrumbItems = [{ title: "My Account", link: "/dashboard/account" },
  { title: "Your Products", link: "/dashboard/account/products" }];
export default function page() {


  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={prod} />
      </div>
    </>
  );
}
