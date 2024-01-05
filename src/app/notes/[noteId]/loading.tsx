import Loading from "@/components/Loading";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function LoadingView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-[250px]" />
        </CardTitle>
      </CardHeader>
      <CardContent>
      <Skeleton className="h-4 w-[300px]" />
        <Skeleton className="h-20 w-[400px]" />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
