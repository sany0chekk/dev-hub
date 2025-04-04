import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CodeXml, Github } from "lucide-react";
import Link from "next/link";

export default function PageHeader() {
  return (
    <Card className="shadow-lg border-none">
      <CardContent className="flex flex-col md:flex-row items-center gap-4">
        <CodeXml className="text-green-300 size-12 shrink-0" />
        <div>
          <h1 className="uppercase font-bold mb-2">
            Welcome to <span className="text-green-300">DevHub</span>
          </h1>
          <p className="text-sm opacity-60 mb-6">
            DevHub is a community platform for developers to showcase projects,
            exchange ideas, and receive feedback. To access all features,
            including creating and sharing articles, please log in. Join us and
            be part of a thriving developer community!
          </p>
          <ul>
            <li>
              <Button variant={"outline"} className="font-bold" asChild>
                <Link
                  href={"https://github.com/sany0chekk/dev-hub"}
                  target="_blank"
                >
                  <Github className="size-5" />
                  GitHub
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
