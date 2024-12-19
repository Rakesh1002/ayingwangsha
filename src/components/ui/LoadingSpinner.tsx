"use client";

import React from "react";

export function LoadingSpinner(): React.ReactElement {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}
