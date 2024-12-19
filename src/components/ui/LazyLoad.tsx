import { Suspense } from "react";
import { Loading } from "./Loading";

interface LazyLoadProps {
  children: React.ReactNode;
}

export function LazyLoad({ children }: LazyLoadProps) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
