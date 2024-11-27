"use client";

import React, { useEffect, useState } from "react";
import { Droplets, Thermometer, Clock, Gauge } from "lucide-react";
import { Graf } from "@/components/graf";
import { Karta } from "@/components/Card";

async function getData() {
  const res = await fetch("/api"); 
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
        <Karta title="Teplota" desc="Aktuální teplota v Mirovi" value={currentData.temperature.toFixed(1)+" °C"} icon={<Thermometer className="h-4 w-4 text-muted-foreground" />}/>
        <Karta title="Vlhkost" desc="Aktuální vlhkost v Mirovi" value={currentData.humidity.toFixed(0) + "%"} icon={ <Droplets className="h-4 w-4 text-muted-foreground" />}/>
        <Karta title="Tlak" desc="Tlak" value={formatTimestamp(currentData.timestamp)} icon={ <Gauge className="h-4 w-4 " />}/>
        <Karta title="Čas měření" desc="Čas měření" value={formatTimestamp(currentData.timestamp)} icon={ <Clock className="h-4 w-4 " />}/>
        <Graf/>
      </div>
    </div>
  );
}
