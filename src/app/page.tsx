import TypewriterTitle from "@/components/typewriter-title"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-gradient-to-r min-h-screen grainy from-rose-100 to-blue-100">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
         <h1 className="font-semibold text-6xl text-center">
           Fortuna <span className="text-blue-600 font-bold">AI writing</span>{" "}
          assistant.
        </h1>
        <div className="mt-4"/>
        <h2 className="font-semibold text-2xl text-center text-slate-700">
           <TypewriterTitle/>
        </h2>
        <div className="mt-8"/>
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button>
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3} />
            </Button>
          </Link>
        </div>
       </div>
    </div>
  )
}

export default Home