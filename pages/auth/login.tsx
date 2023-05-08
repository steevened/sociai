import Card from '@/components/atoms/Card';
import { GoogleLogo } from '@/components/icons/Svg';
import { Disclosure } from '@headlessui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { TwitterLogo, DiscordLogo } from '../../components/icons/Svg';

const Login = () => {
  const supabaseClient = useSupabaseClient();

  async function handleLoginWithGoogle() {
    await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000',
      },
    });
  }

  return (
    <div className=" h-screen  flex gap-4 items-center flex-col mx-5 justify-center">
      <Card className="w-full p-8">
        <h1 className="text-4xl text-center font-bold mb-8">Log in</h1>

        <form className="">
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium ">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-teal-500 duration-100 focus:ring block w-full p-2.5  placeholder-gray-400 focus:outline-none"
              placeholder="example@mail.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium "
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-teal-500 duration-100 focus:ring block w-full p-2.5  placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-teal-500 hover:bg-emerald-500 focus:ring focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center duration-100"
          >
            Log in
          </button>
        </form>
        <div className="relative shadow-app-top w-full mt-8">
          <p className="-translate-x-1/2 left-1/2 absolute -top-2.5 px-2  bg-black">
            OR
          </p>
          <div className="flex w-full justify-center gap-20 px-4 pt-8">
            <button
              onClick={handleLoginWithGoogle}
              className="w-12 hover:text-teal-300 duration-200"
            >
              <GoogleLogo />
            </button>
            <button className="w-12 hover:text-teal-300 duration-200">
              <TwitterLogo />
            </button>
            <button className="w-12 hover:text-teal-300 duration-200">
              <DiscordLogo />
            </button>
          </div>
        </div>
      </Card>
      <Card className="w-full text-center py-10 text-sm font-semibold">
        <p>
          {"Don't have an account? "}{' '}
          <span className="text-teal-300">
            <Link href="/auth/register">Sign up</Link>
          </span>
        </p>
      </Card>
    </div>
  );
};

export default Login;
