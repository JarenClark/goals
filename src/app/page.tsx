
import ProtectedContent from "@/components/ProtectedContent";
import { TypographyH1 } from "@/components/ui/typography";
export default async function Home() {


  return (
    <>
      <ProtectedContent>
      <div className="container py-16">
        <div className="mb-8 flex items-center justify-between">
          <TypographyH1>Home</TypographyH1>

        </div>


      </div>
      </ProtectedContent>
    </>
  );
}
