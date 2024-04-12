"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Prod, User } from "@/constants/data";
import { Edit, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { isIPv4 } from "is-ip";
import { useToast } from "@/components/ui/use-toast"
import queryAsync from "@/components/db/queryasync";
import setAsync from "@/components/db/setasync";
import { useSession } from "next-auth/react";

interface ProductsClientProps {
  data: Prod[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();
  const [serverIP, setServerIP] = useState("");
  const [devServerIP, setDevServerIP] = useState("");
  const [errorServerIP, setErrorServerIP] = useState("" as any);
  const [errorDevServerIP, setErrorDevServerIP] = useState(""as any);
  const { data: session} = useSession();
  const { toast } = useToast();
  
  const handleServerIPBlur = () => {
    if (!isIPv4(serverIP) ) {
      console.log('Invalid Server IP');
      setErrorServerIP('Invalid Server IP');
    } else {
      console.log('Valid Server IP');
      setErrorServerIP(null);
    }
  }

  const handleDevServerIPBlur = () => {
    if (!isIPv4(devServerIP)) {
      setErrorDevServerIP('Invalid Dev Server IP');

    } else {
      setErrorDevServerIP(null);
    }
  }
  const handleDB = async () => {
    console.log("e");
    toast({
      title: "Updating Products",
      description: 'this can take a few minutes to reflect on the server.',
      variant: 'default'
    });
    const userData = await queryAsync("SELECT * FROM users WHERE dc_userid = ?", [session?.user?.id]) as any[];
    const ServerIP = serverIP
    const DevServerIP = devServerIP
    const daws = await setAsync("UPDATE user_prod SET server_ip1 = ?, server_ip2 = ? where user_id = ?", [ServerIP , DevServerIP, JSON.parse(JSON.stringify(userData[0].id))]);
    if (daws) {
      toast({
        title: "Successful Updated Products",
        description: 'All products updated successfully!',
        variant: 'success'
      });
      setTimeout(() => {
        console.log('refreshing');
        window.location.reload();
      }, 3000);
    }
  }
  const handleEditAllProducts = async (e : any) => {
    if (errorServerIP === 'Invalid Server IP' || errorDevServerIP === 'Invalid Dev Server IP') {
      toast({
        title: "Uh oh! Something went wrong.",
        description: 'Please enter valid IP addresses! [IPV4 ONLY]',
        variant: 'destructive'
      });
    } else {
      handleDB();
      toast({
        title: "Success",
        description: 'All products updated successfully! this can take a few minutes to reflect on the server.',
        variant: 'default'
      });
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
            <Input placeholder="GDEV-00000000-0000-0000-0000-000000000000" type="text"  />

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
          <DialogClose asChild>
            <Button type="submit">Save changes</Button>
          </DialogClose>
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
            <Input placeholder="Server IP" type="text"  onBlur={handleServerIPBlur} style={errorServerIP? {borderColor: 'red'}: {}} onChange={e => {setServerIP(e.target.value); handleServerIPBlur(e)}}/>
            {errorServerIP && <p style={{color: 'red'}}>{errorServerIP}</p>}
            <Input placeholder="Devserver IP" type="text" onBlur={handleDevServerIPBlur} style={errorDevServerIP? {borderColor: 'red'}: {}} onChange={e => {setDevServerIP(e.target.value); handleDevServerIPBlur(e)}}/>
            {errorDevServerIP && <p style={{color: 'red'}}>{errorDevServerIP}</p>}
            <DialogFooter>
          <DialogClose asChild>
          <Button type="submit" onClick={(e) => {handleEditAllProducts(e)}}>Save changes</Button>
          </DialogClose>
          </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
      <Separator />
      <DataTable searchKey="product_name" searchName="Product name" columns={columns} data={data}/>
    </>
  );
};
