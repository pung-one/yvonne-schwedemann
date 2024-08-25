import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import { GlobalStyles } from "@/globalStyles/global_styles";
import { Layout } from "@/components/Layout";

export const metadata: Metadata = {
  title: "Yvonne Schwedemann",
  description: "Photography by Yvonne Schwedemann",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <GlobalStyles />

        <Layout>{children}</Layout>
      </StyledComponentsRegistry>
    </html>
  );
}
