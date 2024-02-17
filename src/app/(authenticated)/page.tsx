import Greeting from "@/components/Greeting";
import ProtectedContent from "@/components/ProtectedContent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import {
  TypographyH1,
  TypographyH3,
  TypographyH4,
  TypographyLead,
  TypographyMuted,
} from "@/components/ui/typography";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from "next/headers";
import BreadCrumbs from "@/components/BreadCrumbs";
import {
  ActivityIcon,
  LibraryIcon,
  PlusCircleIcon,
  PlusIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import QuickAdd from "@/components/QuickAdd";
import Header from "@/components/Header";
export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: collections, count } = await supabase
    .from("_collections")
    .select("*", { count: "exact" })
    .eq("user_id", user.id);
  const { data: shared } = await supabase
    .from("_collaborators")
    .select("*, _collections(id,name)", { count: "exact" })
    .eq("user_id", user.id);
  return (
    <>
      <div className="bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {/* Title */}
            <div className="pt-12 col-span-1 md:col-span-3 lg:col-span-6">
              <CardTitle>Dashboard</CardTitle>
            </div>
            {/* Quick Add */}
            {!!collections && collections.length > 0 ? (
              <Card className="border border-muted   lg:col-span-2">
                <CardHeader>
                  <div className="flex space-x-4">
                    <div className="rounded-md bg-muted flex items-center p-2">
                      <PlusIcon />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <TypographyMuted>Quick Add</TypographyMuted>
                      <CardTitle>New Item</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <QuickAdd collections={collections ? collections : []} />
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            ) : (
              <Card className=" bg-muted ">
                <CardHeader></CardHeader>
                <CardContent>Create a board to start adding items</CardContent>
              </Card>
            )}
            {/* Overview Card */}
            <Card className="border border-muted  lg:col-span-2">
              <CardHeader>
                <div className="flex space-x-4">
                  <div className="rounded-md flex items-center bg-muted p-2">
                    <ActivityIcon />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <TypographyMuted>Daily Activity</TypographyMuted>
                    <CardTitle>Overview</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <TypographyMuted>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. solut
                  nam?
                </TypographyMuted>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>

            {/* Recent Activity */}
            {/* <Card className="border border-muted lg:col-span-2">
          <CardHeader>
            <div className="flex space-x-4">
              <div className="rounded-md bg-muted  flex items-center p-2">
                <ActivityIcon />
              </div>
              <div className="flex flex-col space-y-1">
                <TypographyMuted>Logs</TypographyMuted>
                <CardTitle>Recent Activity</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table className="border border-muted">
              <TableBody>
                {collections?.slice(0, 2).map((c, i) => (
                  <TableRow
                    key={i}
                    className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4"
                  >
                    <TableCell>
                      <Link href={`/collections/${c.id}`}>{c.name}</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter></CardFooter>
        </Card> */}

            {/* Boards */}
            <Card className="border border-muted   col-span-1 md:col-span-3 lg:col-span-6 xl:col-span-4">
              <CardHeader>
                <div className="flex space-x-4">
                  <div className="rounded-md bg-muted  p-2">
                    <LibraryIcon />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <TypographyMuted>Your Stuff</TypographyMuted>
                    <CardTitle>
                      {count && count != 1 ? `${count + " "}` : `${count} `}
                      Board
                      {count && count != 1 ? "s" : null}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table className="border border-muted">
                  <TableBody>
                    {collections?.map((c, i) => (
                      <TableRow
                        key={i}
                        className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4"
                      >
                        <TableCell>
                          <Link href={`/collections/${c.id}`}>{c.name}</Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {!!shared && (
                  <>
                    <TypographyH4 className="mt-4">Shared </TypographyH4>
                    <Table className="border border-muted">
                      <TableBody>
                        {shared?.map((c, i) => (
                          <TableRow
                            key={i}
                            className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4"
                          >
                            <TableCell>
                              <Link href={`/collections/${c._collections.id}`}>
                                {c._collections.name}
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button variant={"outline"}>Add New</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
