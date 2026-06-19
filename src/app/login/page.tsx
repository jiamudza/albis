import LoginForm from '@/components/loginForm';
import { getUserFromCookie } from '@/lib/getUser';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}

const LoginPage = async ({ searchParams }: Props) => {
  const user = await getUserFromCookie();
  const { callbackUrl } = await searchParams;

  if (user && callbackUrl && callbackUrl !== '/login') {
  redirect(callbackUrl);
}

if (user) {
  const destination =
    callbackUrl &&
    callbackUrl !== '/login' &&
    !callbackUrl.startsWith('/login?')
      ? callbackUrl
      : '/administration';

  redirect(destination);
}

  return (
    <div
      className="w-screen h-screen"
      style={{
        backgroundImage: `url('/background/login-bg.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <LoginForm />
    </div>
  );
};

export default LoginPage;