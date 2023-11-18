import ProtectedContent from "@/components/ProtectedContent";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
export default async function Home() {
  return (
    <>
      <ProtectedContent>
        <div className="container py-16">
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
