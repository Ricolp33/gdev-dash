"use client";
import BreadCrumb from "@/components/breadcrumb";
import queryAsync from "@/components/db/queryasync";
import { UserClient } from "@/components/tables/user-products/client";
import { Prod, prod } from "@/constants/data";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ title: "My Account", link: "/dashboard/account" },
  { title: "Your Products", link: "/dashboard/account/products" }];
export default function page() {
  const { data: session} = useSession();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      console.log(session);
      const data = await queryAsync("SELECT * FROM users WHERE dc_userid = ?", [session?.user?.id]);
      
      const data2 = await queryAsync("SELECT * FROM user_prod WHERE user_id = ?", [data[0].id]);
      setData(data2);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={data as Prod[]} />
      </div>
    </>
  );
}
