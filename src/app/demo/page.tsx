"use client";

import { Button } from "@/components/ui/button"
import { useState } from "react";

export default function DemoPage() {

  const [loading,setLoading] = useState(false);
  const [loading1,setLoading1] = useState(false);



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
    </div>
  );
}