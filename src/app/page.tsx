import ProtectedContent from "@/components/ProtectedContent";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const { data: categories } = await supabase.from("categories").select("*");

  return (
    <>
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
            <ul className="flex flex-wrap space-x-2 my-4">
              <li>
                <Button className="bg-purple dark:bg-lime" size={"sm"}>
                  All
                </Button>
              </li>
              {categories?.map((cat, i) => (
                <li key={i}>
                  <Button className="bg-purple dark:bg-lime" size={"sm"}>
                    {cat.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ProtectedContent>
    </>
  );
}
