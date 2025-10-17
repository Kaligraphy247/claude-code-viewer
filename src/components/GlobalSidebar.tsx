"use client";

import type { LucideIcon } from "lucide-react";
import { SettingsIcon } from "lucide-react";
import { type FC, type ReactNode, Suspense, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { NotificationSettings } from "./NotificationSettings";
import { SettingsControls } from "./SettingsControls";

export interface SidebarTab {
  id: string;
  icon: LucideIcon;
  title: string;
  content: ReactNode;
}

interface GlobalSidebarProps {
  projectId?: string;
  className?: string;
  additionalTabs?: SidebarTab[];
  defaultActiveTab?: string;
  headerButton?: ReactNode;
}

export const GlobalSidebar: FC<GlobalSidebarProps> = ({
  projectId,
  className,
  additionalTabs = [],
  defaultActiveTab,
  headerButton,
}) => {
  const settingsTab: SidebarTab = {
    id: "settings",
    icon: SettingsIcon,
    title: "表示と通知の設定",
    content: (
      <div className="h-full flex flex-col">
        <div className="border-b border-sidebar-border p-4">
          <h2 className="font-semibold text-lg">Settings</h2>
          <p className="text-xs text-sidebar-foreground/70">
            Display and behavior preferences
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-sm text-sidebar-foreground/70">
                Loading settings...
              </div>
            </div>
          }
        >
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-sidebar-foreground">
                Session Display
              </h3>
              <SettingsControls openingProjectId={projectId ?? ""} />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-sm text-sidebar-foreground">
                Notifications
              </h3>
              <NotificationSettings />
            </div>
          </div>
        </Suspense>
      </div>
    ),
  };

  const allTabs = [...additionalTabs, settingsTab];
  const [activeTab, setActiveTab] = useState<string>(
    defaultActiveTab ?? allTabs[allTabs.length - 1]?.id ?? "settings",
  );
  const [isExpanded, setIsExpanded] = useState(!!defaultActiveTab);

  const handleTabClick = (tabId: string) => {
    if (activeTab === tabId && isExpanded) {
      setIsExpanded(false);
    } else {
      setActiveTab(tabId);
      setIsExpanded(true);
    }
  };

  const activeTabContent = allTabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div
      className={cn(
        "h-full border-r border-sidebar-border transition-all duration-300 ease-in-out flex bg-sidebar text-sidebar-foreground",
        isExpanded ? "w-72 lg:w-80" : "w-12",
        className,
      )}
    >
      {/* Vertical Icon Menu - Always Visible */}
      <div className="w-12 flex flex-col border-r border-sidebar-border bg-sidebar/50">
        <TooltipProvider>
          {headerButton && (
            <div className="border-b border-sidebar-border">{headerButton}</div>
          )}
          <div className="flex flex-col p-2 space-y-1">
            {allTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Tooltip key={tab.id}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => handleTabClick(tab.id)}
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-md transition-colors",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        activeTab === tab.id && isExpanded
                          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                          : "text-sidebar-foreground/70",
                      )}
                      data-testid={`${tab.id}-tab-button`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{tab.title}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </div>

      {/* Content Area - Only shown when expanded */}
      {isExpanded && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeTabContent}
        </div>
      )}
    </div>
  );
};
