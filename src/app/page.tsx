import Greeting from "@/components/Greeting";
import ProtectedContent from "@/components/ProtectedContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  // const { data: categories } = await supabase.from("categories").select("*");
  const { data: collections } = await supabase.from("_collections").select("*");

  return (
    <>
      <Greeting />
      <ProtectedContent>
        <div className="container">
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <TypographyH1>Home</TypographyH1>
            </div>
            <TypographyLead>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              soluta laudantium id, vitae eligendi nam?
            </TypographyLead>

          </div>
        </div>
      </ProtectedContent>
    </>
  );
}
