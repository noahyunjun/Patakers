export type HistoryItem = {
  year: number;
  title: string;
  description: string;
};

export function getHistory(): HistoryItem[] {
  return [
    { year: 2018, title: "팀 결성", description: "찬양과 예배를 위한 첫 모임." },
    { year: 2019, title: "첫 사역", description: "지역 교회 연합 예배 섬김." },
    { year: 2021, title: "정규 예배", description: "월간 찬양집회 정례화." },
    { year: 2023, title: "앨범 발매", description: "첫 싱글 발매 및 스트리밍 공개." }
  ];
}
