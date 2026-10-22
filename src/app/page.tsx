import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-5xl font-semibold tracking-tight">Readinex</h1>
      <p className="text-lg text-muted-foreground">
        TOEFL iBT 2026 practice — coming soon
      </p>
      <Button>Get started</Button>
    </main>
  );
}
