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
import { useState } from "react";
import { isIPv4 } from "is-ip";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

interface ProductsClientProps {
  data: Prod[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();
  const [serverIP, setServerIP] = useState("");
  const [devServerIP, setDevServerIP] = useState("");
  const [errorServerIP, setErrorServerIP] = useState("" as any);
  const [errorDevServerIP, setErrorDevServerIP] = useState(""as any);
  
  const handleServerIPBlur = () => {
    const ip = serverIP.split(':')[0]
    if (!isIPv4(ip)) {
      console.log('Invalid Server IP');
      setErrorServerIP('Invalid Server IP');

    } else {
      console.log('Valid Server IP');
      setErrorServerIP(null);
    }
  }

  const handleDevServerIPBlur = () => {
    const ip = devServerIP.split(':')[0]
    if (!isIPv4(ip)) {
      setErrorDevServerIP('Invalid Dev Server IP');

    } else {
      setErrorDevServerIP(null);
    }
  }

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
            <Input placeholder="00000000-0000-0000-0000-000000000000" type="text"  />

      {/* <InputOTP maxLength={33} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
        <InputOTPSlot index={6} />
        <InputOTPSlot index={7} />
        <InputOTPSlot index={8} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={9} />
        <InputOTPSlot index={10} />
        <InputOTPSlot index={11} />
        <InputOTPSlot index={12} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={13} />
        <InputOTPSlot index={14} />
        <InputOTPSlot index={15} />
        <InputOTPSlot index={16} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={17} />
        <InputOTPSlot index={18} />
        <InputOTPSlot index={19} />
        <InputOTPSlot index={20} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={21} />
        <InputOTPSlot index={22} />
        <InputOTPSlot index={23} />
        <InputOTPSlot index={24} />
        <InputOTPSlot index={25} />
        <InputOTPSlot index={26} />
        <InputOTPSlot index={27} />
        <InputOTPSlot index={28} />
        <InputOTPSlot index={29} />
        <InputOTPSlot index={30} />
        <InputOTPSlot index={31} />
        <InputOTPSlot index={32} />
      </InputOTPGroup>
    </InputOTP> */}
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
            <Input placeholder="Server IP" type="text"  onBlur={handleServerIPBlur} style={errorServerIP? {borderColor: 'red'}: {}} onChange={e => setServerIP(e.target.value)}/>
            {errorServerIP && <p style={{color: 'red'}}>{errorServerIP}</p>}
            <Input placeholder="Devserver IP" type="ipadress" onBlur={handleDevServerIPBlur} style={errorDevServerIP? {borderColor: 'red'}: {}} onChange={e => setDevServerIP(e.target.value)}/>
            {errorDevServerIP && <p style={{color: 'red'}}>{errorDevServerIP}</p>}
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
