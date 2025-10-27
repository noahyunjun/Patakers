"use client";

import { useState } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ky from "ky";

type HistoryItem = {
  year: number;
  title: string;
  description: string;
};

async function fetchHistory() {
  // 향후 API로 교체 가능. 현재는 정적 데이터 반환
  return [
    {
      year: 2018,
      title: "팀 결성",
      description: "찬양과 예배를 위한 첫 모임.",
    },
    { year: 2019, title: "첫 사역", description: "지역 교회 연합 예배 섬김." },
    { year: 2021, title: "정규 예배", description: "월간 찬양집회 정례화." },
    {
      year: 2023,
      title: "앨범 발매",
      description: "첫 싱글 발매 및 스트리밍 공개.",
    },
  ] as HistoryItem[];
}

const columnHelper = createColumnHelper<HistoryItem>();

const columns = [
  columnHelper.accessor("year", {
    header: () => "Year",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("title", {
    header: () => "Event",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: () => "Details",
    cell: (info) => info.getValue(),
  }),
];

function Content() {
  const { data: history = [] } = useQuery({
    queryKey: ["history"],
    queryFn: fetchHistory,
  });

  const table = useReactTable({
    data: history,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setResultMessage(null);
    try {
      const res = await ky.post("/api/send", {
        json: { name, email },
        throwHttpErrors: false,
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (res.ok && data.ok) {
        setResultMessage("감사합니다! 메일이 전송되었습니다.");
        setName("");
        setEmail("");
      } else {
        setResultMessage(data.message ?? "전송에 실패했습니다.");
      }
    } catch {
      setResultMessage("전송 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <section className="w-full max-w-4xl px-6 py-16">
        <h1 className="text-3xl sm:text-5xl font-bold mb-6">찬양팀 히스토리</h1>
        <p className="text-base text-gray-600 mb-8">
          위에서 아래로 스크롤하며 팀의 발자취를 살펴보세요.
        </p>

        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-left">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-sm font-semibold text-gray-700"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="w-full max-w-xl px-6 pb-24">
        <h2 className="text-2xl font-semibold mb-4">연락처 남기기</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              이름
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2"
              placeholder="홍길동"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border px-3 py-2"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-md bg-black text-white px-4 py-2 disabled:opacity-50"
          >
            {isSubmitting ? "전송 중..." : "전송"}
          </button>
        </form>
        {resultMessage ? (
          <p className="mt-3 text-sm text-gray-700">{resultMessage}</p>
        ) : null}
      </section>
    </div>
  );
}

// QueryClient는 컴포넌트 외부에서 생성 (재생성 방지)
const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
}
