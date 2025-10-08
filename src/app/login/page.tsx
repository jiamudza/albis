import LoginForm from '@/components/loginForm';
import { getUserFromCookie } from "@/lib/getUser";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const user = await getUserFromCookie();
  if (user) redirect("/spmb"); // kalau sudah login, langsung redirect

  return (
    <div
      className="w-screen h-screen"
      style={{
        backgroundImage: `url('/background/login-bg.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <LoginForm />
    </div>
  );
};

export default LoginPage;
