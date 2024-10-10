import { useContactStore, useUserStore } from "@/store/slices";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalStoreContext } from "@/store";

interface ConfirmDeleteAccountProps {
  showModalConfirm: boolean;
  setShowDeleteConfirm: (value: boolean) => void;
}

export function ConfirmDeleteAccount({
  showModalConfirm,
  setShowDeleteConfirm,
}: ConfirmDeleteAccountProps) {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { logoutUser } = useGlobalStoreContext();

  const { setUsers, setUserSelected } = useUserStore();
  const { setContacts } = useContactStore();

  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = () => {
    if (user?.password !== userPassword) {
      toast.error("Senha incorreta, tente novamente.");
      return;
    }
    toast.success("Conta deletada com sucesso!");

    setTimeout(() => {
      navigate("/login");
      logoutUser();
      setUsers([]);
      setContacts([]);
      setUserSelected(undefined);
    }, 1000);
  };

  const handleClose = () => {
    setUserPassword("");
    setShowDeleteConfirm(!showModalConfirm);
  };

  return (
    <Dialog open={showModalConfirm} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deletar conta</DialogTitle>
          <DialogDescription>
            Confirme a sua senha para deletar sua conta.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Senha"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          type="password"
        />
        <DialogFooter>
          <Button onClick={handleSubmit}>Deletar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
