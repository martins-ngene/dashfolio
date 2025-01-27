import Link from "next/link";
import { Button } from "./ui/button";

export default async function AuthButton() {

   return (
     <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
       <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
         <div className="flex gap-5 items-center text-[1rem] font-bold">
           <Link href={"/"}>Dashfolio</Link>
         </div>
         <div className="flex gap-2">
           <Button asChild size="sm" variant={"outline"}>
             <Link href="/sign-in">Sign in</Link>
           </Button>
           <Button asChild size="sm" variant={"default"}>
             <Link href="/sign-up">Sign up</Link>
           </Button>
         </div>
       </div>
     </nav>
   );
  
}
