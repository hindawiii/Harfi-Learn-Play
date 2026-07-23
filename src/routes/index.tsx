import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "حرفي - تعلم الحروف العربية" },
      { name: "description", content: "حرفي: تطبيق تفاعلي لتعلم الحروف والكلمات والجمل العربية بالنطق الصوتي." },
      { property: "og:title", content: "حرفي - تعلم الحروف العربية" },
      { property: "og:description", content: "تعلم العربية بطريقة تفاعلية وممتعة." },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/index.html");
  }, []);
  return null;
}
