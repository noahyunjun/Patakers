/// <reference types="vite/client" />
import * as React from "react";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { initClientMonitoring } from "~/lib/monitoring.client";
import appCss from "~/styles/globals.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Partakers Ministry | 함께 예배하고 함께 자라다" },
      {
        name: "description",
        content:
          "말씀 중심, 공동체 중심의 청년 예배팀 Partakers Ministry 랜딩 페이지",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: RootNotFound,
});

function RootComponent() {
  React.useEffect(() => {
    initClientMonitoring();
  }, []);

  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}

function RootNotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>페이지를 찾을 수 없습니다</h1>
        <p style={{ opacity: 0.8 }}>
          요청한 경로가 존재하지 않습니다. 홈으로 돌아가 다시 확인해 주세요.
        </p>
        <a href="/" style={{ display: "inline-block", marginTop: "1rem" }}>
          홈으로 이동
        </a>
      </div>
    </main>
  );
}
