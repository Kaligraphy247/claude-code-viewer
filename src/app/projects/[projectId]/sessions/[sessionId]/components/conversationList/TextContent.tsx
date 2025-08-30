import { Terminal } from "lucide-react";
import type { FC } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parseCommandXml } from "../../../../../../../server/service/parseCommandXml";
import { MarkdownContent } from "../../../../../../components/MarkdownContent";

export const TextContent: FC<{ text: string }> = ({ text }) => {
  const parsed = parseCommandXml(text);

  if (parsed.kind === "command") {
    return (
      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20 gap-2 py-3 mb-3">
        <CardHeader className="py-0 px-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-green-600 dark:text-green-400" />
            <CardTitle className="text-sm font-medium">
              Claude Code Command
            </CardTitle>
            <Badge
              variant="outline"
              className="border-green-300 text-green-700 dark:border-green-700 dark:text-green-300"
            >
              {parsed.commandName}
            </Badge>
          </div>
        </CardHeader>
        {parsed.commandArgs.trim() === "" ? null : (
          <CardContent className="py-0 px-4">
            <div className="space-y-2">
              <div>
                <span className="text-xs font-medium text-muted-foreground">
                  Arguments:
                </span>
                <div className="bg-background rounded border p-2 mt-1">
                  <code className="text-xs">{parsed.commandArgs}</code>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    );
  }

  if (parsed.kind === "local-command-1") {
    return (
      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20 gap-2 py-3 mb-3">
        <CardHeader className="py-0 px-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-green-600 dark:text-green-400" />
            <CardTitle className="text-sm font-medium">Local Command</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="py-0 px-4">
          <pre className="text-xs overflow-x-auto">{parsed.commandMessage}</pre>
        </CardContent>
      </Card>
    );
  }

  if (parsed.kind === "local-command-2") {
    return (
      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20 gap-2 py-3 mb-3">
        <CardHeader className="py-0 px-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-green-600 dark:text-green-400" />
            <CardTitle className="text-sm font-medium">Local Command</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="py-0 px-4">
          <pre className="text-xs overflow-x-auto">{parsed.stdout}</pre>
        </CardContent>
      </Card>
    );
  }

  return (
    <MarkdownContent className="w-full mx-2 my-6" content={parsed.content} />
  );
};
