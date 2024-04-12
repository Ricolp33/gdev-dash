"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { DialogTrigger, Dialog, DialogContent, DialogFooter,  } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Prod } from "@/constants/data";
import { isIPv4 } from "is-ip";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: Prod;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {};

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
    <Dialog>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DialogTrigger asChild>
          <DropdownMenuItem
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          </DialogTrigger>
          {/* <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
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
    </>
  );
};
