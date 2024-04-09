"use client";
import BreadCrumb from "@/components/breadcrumb";
import queryAsync from "@/components/db/queryasync";
import { UserClient } from "@/components/tables/user-products/client";
import { Prod } from "@/constants/data";
import { OkPacketParams, QueryResult } from "mysql2";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ title: "My Account", link: "/dashboard/account" },
  { title: "Your Products", link: "/dashboard/account/products" }];

interface User {
  id: number;
  dc_userid: string;
  email: string;
  name: string;
}

interface Products {
  id: number;

  name: string;
  download: string
  version: string;
  created_at: string;
  updated_at: string;
}
export default function page() {
  const { data: session} = useSession();
  const [data, setData] = useState<Prod[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(session);
      if (!session?.user?.id) return;
      const userData = await queryAsync("SELECT * FROM users WHERE dc_userid = ?", [session?.user?.id])as User[];
      if (!userData) return;
      console.log(userData);

      const data2 = await queryAsync("SELECT * FROM user_prod WHERE user_id = ?", [userData[0].id])  as Prod[];
      const products = await queryAsync("SELECT * FROM prod", []) as Products[];
      if (products) {
        data2.forEach((Element, index) => {
          products.forEach((Element2, index2) => {
            data2[index].product_name = Element2.name;
          });
          const d = data2[index].updated_time as Date;
          const dformat = [
            (d.getMonth() + 1).toString().padStart(2, '0'),
            d.getDate().toString().padStart(2, '0'),
            d.getFullYear()
          ].join('/') +
            ' ' +
            [
              d.getHours().toString().padStart(2, '0'),
              d.getMinutes().toString().padStart(2, '0'),
              d.getSeconds().toString().padStart(2, '0')
            ].join(':');
          data2[index].updated_time = dformat;
          const d2 = data2[index].created_time as Date;
          const dformat2 = [
            (d2.getMonth() + 1).toString().padStart(2, '0'),
            d2.getDate().toString().padStart(2, '0'),
            d2.getFullYear()
          ].join('/') +
            ' ' +
            [
              d2.getHours().toString().padStart(2, '0'),
              d2.getMinutes().toString().padStart(2, '0'),
              d2.getSeconds().toString().padStart(2, '0')
            ].join(':');
          data2[index].created_time = dformat2;
        });
      }
      console.log(data2);
      setData(data2);
    };
    fetchData();
  }, [session]);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={data} />
      </div>
    </>
  );
}