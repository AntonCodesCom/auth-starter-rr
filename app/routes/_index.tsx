import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Auth Starter" },
    { name: "description", content: "Auth Starter" },
  ];
}

export default function Home() {
  return <div>TBD</div>;
}
