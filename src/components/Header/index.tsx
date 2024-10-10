import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/slices";

import AvatarIMG from "@/assets/user.png";

interface HeaderProps {
  handleDeleteAccount: () => void;
  handleLogout: () => void;
}

export default function Header({
  handleDeleteAccount,
  handleLogout,
}: HeaderProps) {
  const { user } = useUserStore();

  return (
    <div className="flex w-full flex-row items-center justify-between px-4 py-2">
      <h3>Lista de Contatos</h3>
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex cursor-pointer flex-row items-center gap-2 rounded-2xl border border-zinc-600 p-1">
            <Avatar>
              <AvatarImage src={AvatarIMG} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="capitalize">{user?.name} </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex w-80 flex-col space-y-4">
          <Button
            className="bg-red-500 text-white hover:bg-red-500/80"
            onClick={handleDeleteAccount}
          >
            Deletar conta
          </Button>
          <Button className="bg-black text-white" onClick={handleLogout}>
            Deslogar
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
