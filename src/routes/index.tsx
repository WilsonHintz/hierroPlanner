import { createFileRoute } from "@tanstack/react-router";
import { HierroApp } from "@/components/hierro-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <HierroApp />;
}
