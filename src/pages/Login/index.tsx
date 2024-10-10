import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGlobalStoreContext } from "@/store";
import { useUserStore } from "@/store/slices";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  const { users, setUsers, setUserSelected } = useUserStore();
  const { authenticateUser } = useGlobalStoreContext();

  const handleSubmit = () => {
    if (showRegister) {
      if (users?.some((user) => user.email === userEmail)) {
        alert("Já existe um usuário cadastrado com esse email");
        return;
      }
      const userData = {
        id: users.length + 1,
        name: userName,
        email: userEmail,
        password: userPassword,
      };
      setUsers([...users, userData]);
      setShowRegister(false);
      setUserName("");
      setUserEmail("");
      setUserPassword("");
    } else {
      if (!users?.some((user) => user.email === userEmail)) {
        alert("Usuário não encontrado");
        return;
      }

      const userFound = users.find((user) => user.email === userEmail);

      if (userFound?.password !== userPassword) {
        alert("Senha incorreta, tente novamente.");
        return;
      }

      setUserSelected(userFound);
      authenticateUser();
      navigate("/home");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>{showRegister ? "Cadastro" : "Login"}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {showRegister && (
            <Input
              placeholder="Nome Completo"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          )}
          <Input
            placeholder="E-mail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <Input
            placeholder="Senha"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex flex-row items-center justify-between gap-2">
          {!showRegister && (
            <p className="cursor-pointer" onClick={() => setShowRegister(true)}>
              Criar Conta
            </p>
          )}
          <Button className="flex-1" onClick={handleSubmit}>
            {showRegister ? "Cadastrar" : "Entrar"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
