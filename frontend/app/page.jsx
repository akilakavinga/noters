import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="  h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Noters</h1>
      <p>The secure and efficient note-taking application</p>
      <div className="flex gap-3 mt-5">
        <Button asChild>
          <Link href='auth/login'>Login</Link>
        </Button>
        <Button variant='outline' asChild>
          <Link href='auth/sign-up'>Sign Up</Link>
        </Button>
      </div>
    </div>
  )
}