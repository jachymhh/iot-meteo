"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const tempData = [
  { time: "00:00", temp: 18 },
  { time: "03:00", temp: 17 },
  { time: "06:00", temp: 16 },
  { time: "09:00", temp: 19 },
  { time: "12:00", temp: 22 },
  { time: "15:00", temp: 24 },
  { time: "18:00", temp: 23 },
  { time: "21:00", temp: 21 },
  { time: "Now", temp: 20 },
];

const pressureData = [
  { time: "00:00", pressure: 1012 },
  { time: "03:00", pressure: 1011 },
  { time: "06:00", pressure: 1010 },
  { time: "09:00", pressure: 1010 },
  { time: "12:00", pressure: 1011 },
  { time: "15:00", pressure: 1012 },
  { time: "18:00", pressure: 1013 },
  { time: "21:00", pressure: 1014 },
  { time: "Now", pressure: 1015 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-2 sm:p-4">
      <main className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-min">
        <Card className="col-span-full bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  New York City, USA
                </h1>
                <p className="text-lg sm:text-xl">Monday, 10:30 AM</p>
              </div>
              <div className="text-right">
                <div className="text-4xl sm:text-5xl font-bold">23°C</div>
                <div className="flex items-center justify-end mt-1">
                  <Cloud className="mr-2" />
                  Partly Cloudy
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full sm:col-span-1 bg-white/80 backdrop-blur-sm">
          <CardHeader className="p-4 pb-0">
            <CardTitle>Temperature History</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={tempData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#8884d8"
                  name="Temperature (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-full sm:col-span-1 bg-white/80 backdrop-blur-sm">
          <CardHeader className="p-4 pb-0">
            <CardTitle>Pressure History</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={pressureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="pressure"
                  stroke="#82ca9d"
                  name="Pressure (hPa)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="p-4 pb-0">
            <CardTitle>Precipitation</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[150px] flex items-end justify-between">
              {[30, 45, 25, 60, 75, 45, 65, 50, 40, 30, 55, 45].map(
                (height, index) => (
                  <div
                    key={index}
                    className="w-[6%] bg-blue-500 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                )
              )}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>J</span>
              <span>F</span>
              <span>M</span>
              <span>A</span>
              <span>M</span>
              <span>J</span>
              <span>J</span>
              <span>A</span>
              <span>S</span>
              <span>O</span>
              <span>N</span>
              <span>D</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="p-4 pb-0">
            <CardTitle>Air Quality</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <Tabs defaultValue="aqi" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="aqi">AQI</TabsTrigger>
                <TabsTrigger value="pm25">PM2.5</TabsTrigger>
                <TabsTrigger value="o3">O3</TabsTrigger>
              </TabsList>
              <TabsContent value="aqi" className="text-center py-2">
                <div className="text-4xl font-bold text-green-500">42</div>
                <div className="mt-1 text-sm">Good</div>
              </TabsContent>
              <TabsContent value="pm25" className="text-center py-2">
                <div className="text-4xl font-bold text-yellow-500">12.5</div>
                <div className="mt-1 text-sm">Moderate</div>
              </TabsContent>
              <TabsContent value="o3" className="text-center py-2">
                <div className="text-4xl font-bold text-green-500">31</div>
                <div className="mt-1 text-sm">Good</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
