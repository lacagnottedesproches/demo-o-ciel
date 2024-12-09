import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import heroImg from "../../public/dan-meyers-f1WMJR8pLqo-unsplash.jpg";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await signIn("credentials", {
      username: email,
      password,
      redirect: false,
    });

    if (response?.ok) {
      router.push("/app");
    } else {
      setErrorMessage("Credentials invalid.");
    }
  }

  return (
    <main className={`text-gray-800 flex min-h-screen flex-col`}>
      <Header />

      <section className="p-5 grow relative flex flex-col items-center justify-center h-40 lg:h-80">
        <Image
          className="object-cover"
          src={heroImg}
          alt="hero"
          fill={true}
          priority
        />

        <form
          className="w-full lg:w-3/12 flex flex-col gap-5 drop-shadow rounded bg-white p-10"
          onSubmit={handleSubmit}
        >
          <fieldset className="flex flex-col gap-3">
            <input
              className="border px-2 py-3 rounded"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              className="border px-2 py-3 rounded"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </fieldset>

          <button
            className="py-3 rounded bg-yellow-500 text-white font-semibold"
            type="submit"
          >
            Login
          </button>

          {errorMessage ? (
            <p className="text-center text-sm text-red-700">{errorMessage}</p>
          ) : null}
        </form>
      </section>

      <Footer />
    </main>
  );
}
