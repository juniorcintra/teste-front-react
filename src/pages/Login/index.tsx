import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>{showRegister ? "Cadastro" : "Login"}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input />
          <Input />
        </CardContent>
        <CardFooter className="flex flex-row items-center justify-between gap-2">
          {!showRegister && (
            <p className="cursor-pointer" onClick={() => setShowRegister(true)}>
              Criar Conta
            </p>
          )}
          <Button
            className="flex-1"
            onClick={() => setShowRegister(!showRegister)}
          >
            {showRegister ? "Cadastrar" : "Entrar"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
