"use client";

import React from "react";
import { Bell, Ban, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/universal/Button";

interface NotificationBannerProps {
  permission: NotificationPermission;
  swRegistered: boolean;
  onRequestPermission: () => void;
}

export const NotificationBanner = ({ permission, swRegistered, onRequestPermission }: NotificationBannerProps) => {
  if (permission === "granted" && swRegistered) {
    return null;
  }

  // State B: Permission Denied
  if (permission === "denied") {
    return (
      <div className="mx-auto mb-8 flex max-w-[800px] gap-4 rounded-xl border border-error/30 bg-error/10 p-5 align-top">
        <Ban className="mt-0.5 h-6 w-6 min-w-[24px] text-error" />
        <div className="flex-1">
          <p className="text-sm leading-relaxed text-white">
            Notifications are blocked. You need to allow them in your browser settings to receive reminders.
          </p>
          <Button 
            variant="ghost" 
            className="mt-3 h-9 gap-2 border-error/50 px-4 text-sm font-semibold text-error hover:bg-error/10"
            onClick={() => window.open('https://support.google.com/chrome/answer/3220216', '_blank')}
          >
            How to Enable <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // State C: Service Worker Failed
  if (permission === "granted" && !swRegistered) {
    return (
      <div className="mx-auto mb-8 flex max-w-[800px] gap-4 rounded-xl border border-warning/30 bg-warning/10 p-5 align-top">
        <AlertTriangle className="mt-0.5 h-6 w-6 min-w-[24px] text-warning" />
        <div className="flex-1">
          <p className="text-sm leading-relaxed text-white">
            Background reminders aren't working. Reminders will only fire while this app is open.
          </p>
          <Button 
            className="mt-3 h-9 bg-warning text-sm font-semibold text-black hover:bg-warning/80"
            onClick={() => window.location.reload()}
          >
            Retry Setup
          </Button>
        </div>
      </div>
    );
  }

  // State A: Permission Not Yet Asked
  return (
    <div className="mx-auto mb-8 flex max-w-[800px] gap-4 rounded-xl border border-app-5/30 bg-app-5/10 p-5 align-top">
      <Bell className="mt-0.5 h-6 w-6 min-w-[24px] text-app-5" />
      <div className="flex-1">
        <p className="text-sm leading-relaxed text-white">
          Notifications are off. Enable them so nothing slips.
        </p>
        <Button 
          className="mt-3 h-9 bg-app-5 text-sm font-semibold text-black hover:bg-app-5/80"
          onClick={onRequestPermission}
        >
          Allow Notifications
        </Button>
      </div>
    </div>
  );
};
