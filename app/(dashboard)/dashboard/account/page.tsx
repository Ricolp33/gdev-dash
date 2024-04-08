"use client";
import BreadCrumb from "@/components/breadcrumb";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { get } from "http";
import queryAsync from "@/components/db/queryasync";
import { use, useEffect, useState } from "react";
import { da } from "date-fns/locale";


const breadcrumbItems = [{ title: "My Account", link: "/dashboard/account" }];

export default function page() {
  const { data: session} = useSession();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await queryAsync("SELECT * FROM users WHERE dc_userid = ?", [session?.user?.id]);
      setData(data);
      console.log(data);
    };
    fetchData();
  }, []);

  
  if (!session && !data) {
    return <div>loading...</div>;
  } else {
    return (
      <>
        <ScrollArea className="h-full">
          <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
            <BreadCrumb items={breadcrumbItems} />
            <Card className="w-full" style={{}}>
              {/* <Image className="rounded-lg"src="/GDev_Wallpaper.png" alt="GDev Wallpaper" width="2000" height="2000"  /> */}
              <img alt="Product" className="aspect-[6]" height="100" src="/GDev_Wallpaper.png" width="2000" />
              <CardHeader className="">
                <div className="flex items-center">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={session.user?.image ?? ""}
                      alt={session.user?.name ?? ""}
                    />
                    <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
                  </Avatar>

                  <div className="pl-2 flex flex-col space-y-1 ">
                    <p className="text-2xl font-medium leading-none">
                      {session.user?.name}
                    </p>
                    <p className="text-sm leading-none text-muted-foreground">
                      Rank: Todo
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

          </div>
        </ScrollArea>
      </>
    );
  }
}
