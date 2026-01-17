"use client";

import { Button } from "@/components/ui/button"
import { useState } from "react";
import * as Sentry from "@sentry/nextjs";
import { useAuth } from "@clerk/nextjs";

export default function DemoPage() {

  const { userId } = useAuth()

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);



  // 1. Define the logic/handlers first
  const handleBlocking = async () => {
    setLoading(true);

    await fetch("/api/demo/blocking", {
      method: "POST",
    });

    setLoading(false);
  };

  const handleBackground = async () => {
    setLoading1(true);

    await fetch("/api/demo/background", {
      method: "POST",
    });

    setLoading1(false);
  };

  const handleClientError = () => {
    Sentry.logger.info("Client error triggered", { userId });
    throw new Error("Client error:Something went wrong in the browser!");
  };


  const handleApiError = async () => {
    Sentry.logger.info("Api error triggered", { userId });
    await fetch("/api/demo/error", { method: "POST" });
  };

  const handleIngestError = async () => {
    Sentry.logger.info("Ingest error triggered", { userId });
    await fetch("/api/demo/ingest-error", { method: "POST" });
  };


  // 2. Return the UI at the component level
  return (
    <div className="p-8 space-x-4">
      {/* Note: I used your imported Button component for better styling */}
      <Button onClick={handleBlocking} disabled={loading}>
        {loading ? "Loading" : "Blocking"}
      </Button>
      <Button onClick={handleBackground} disabled={loading1}>
        {loading1 ? "Loading" : "Background"}
      </Button>
      <Button variant="destructive" onClick={handleClientError}>Client Error</Button>
      <Button variant="destructive" onClick={handleApiError}>Api Error</Button>
      <Button variant="destructive" onClick={handleIngestError}>inggest Error</Button>
    </div>
  );
}