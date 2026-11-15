/** Trò "Bạn tìm được lỗi sai không?": mỗi câu một lỗi phổ biến trong IELTS Writing. `wrong` là chỉ số token sai. */
export const mistakes: { tokens: string[]; wrong: number; fix: string; why: string }[] = [
  {
    tokens: ["The", "number", "of", "students", "have", "increased", "dramatically."],
    wrong: 4,
    fix: "has",
    why: "Chủ ngữ là “the number”, nên động từ chia số ít: has increased.",
  },
  {
    tokens: ["Many", "people", "believes", "that", "technology", "improves", "our", "lives."],
    wrong: 2,
    fix: "believe",
    why: "“People” là danh từ số nhiều, nên động từ không thêm -s: believe.",
  },
  {
    tokens: ["I", "agree", "with", "this", "view", "because of", "it", "saves", "time."],
    wrong: 5,
    fix: "because",
    why: "“Because of” đi với danh từ; trước một mệnh đề (it saves time) phải dùng “because”.",
  },
];
