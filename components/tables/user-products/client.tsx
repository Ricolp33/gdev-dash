"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Prod, User } from "@/constants/data";
import { Edit, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductsClientProps {
  data: Prod[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-normal">
        <Heading
          title={`Your Products (${data.length})`}
          description="Manage your Products here."
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-xs md:text-sm ml-auto mr-2">
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Label>Add Product </Label>
            <Input placeholder="Enter Product Key" />
            <DialogFooter>
          <Button type="submit">Save changes</Button>
          </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-xs md:text-sm ">
              <Edit className="mr-2 h-4 w-4" /> Edit All Products
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Label>Edit All Products</Label>
            <Input placeholder="Server IP" />
            <Input placeholder="Devserver IP" />
            <DialogFooter>
          <Button type="submit">Save changes</Button>
          </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
      <Separator />
      <DataTable searchKey="product_name" searchName="Product name" columns={columns} data={data}/>
    </>
  );
};
