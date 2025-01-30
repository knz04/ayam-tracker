import LoginForm from "@/components/loginform";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
