import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/store/slices";
import AvatarIMG from "@/assets/user.png";

export default function Home() {
  const { user } = useUserStore();
  return (
    <main className="flex h-screen w-full flex-col">
      <div className="flex w-full flex-row items-center justify-between px-4 py-2">
        <span>Lista de Contatos</span>
        <div className="flex flex-row items-center gap-2 rounded-2xl border border-zinc-600 p-1">
          <Avatar>
            <AvatarImage src={AvatarIMG} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{user?.name} </span>
        </div>
      </div>
    </main>
  );
}
