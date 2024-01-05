import CreateDocument from "@/components/CreateDocument";
import DocumentList from "@/components/documents/DocumentList";
import ProtectedContent from "@/components/ProtectedContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import {
  TypographyH1,
  TypographyP,
  TypographyLead,
} from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: people } = await supabase.from("profiles").select("*").order('full_name', { ascending: true });

  return (
    <>
      <ProtectedContent>
        <div className="container">
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <TypographyH1>Team Members</TypographyH1>
              {/* <form>
                <Input placeholder="Search"></Input>
              </form> */}
            </div>
            <TypographyLead>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad iste
              sed non.
            </TypographyLead>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {people?.map((person, i) => (
              <li key={person.id} className="flex flex-col items-center">
                <Avatar>
                  <AvatarImage src={person.avatar_url} alt={person.full_name} />
                  <AvatarFallback>{getInitials(person.full_name)}</AvatarFallback>
                </Avatar>
                <p className="text-center text-sm mt-2">{person.full_name}</p>
              </li>
            ))}
          </ul>
        </div>
      </ProtectedContent>
    </>
  );
}
