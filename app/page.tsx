"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Thermometer } from "lucide-react";

async function getData() {
  const res = await fetch("/api"); // Ensure you're using the correct URL
  if (!res.ok) {
    throw new Error(
      "Failed to fetch data: " + res.status + " " + res.statusText
    );
  }
  return res.json();
}

export default function Page() {
  const [currentData, setCurrentData] = useState({
    temperature: 0,
    humidity: 0,
    timestamp: "", // Initialize timestamp state
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        console.log("Fetched data:", result); // Log fetched data

        if (
          result.data &&
          result.data.temperature !== undefined &&
          result.data.humidity !== undefined &&
          result.data.timestamp // Check if timestamp exists
        ) {
          setCurrentData({
            temperature: result.data.temperature,
            humidity: result.data.humidity,
            timestamp: result.data.timestamp, // Update timestamp
          });
        } else {
          console.error("Invalid data structure:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data immediately on mount
    const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Format the timestamp
  const formatTimestamp = (timestamp: any) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust format as needed
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teplota</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentData.temperature.toFixed(1)}°C
            </div>
            <p className="text-xs text-muted-foreground">
              Aktuální teplota v Mirovi
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vlhkost</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentData.humidity.toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Aktuální vlhkost vzduchu
            </p>
          </CardContent>
        </Card>

        {/* New Card for Timestamp */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Čas měření</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatTimestamp(currentData.timestamp)}
            </div>
            <p className="text-xs text-muted-foreground">Čas měření</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
