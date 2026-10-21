import type { ReactNode } from "react";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "../src/useReveal";

export default function TejereLayout({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  useReveal();
  return (
    <>
      <SiteNav activePath={path} />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
