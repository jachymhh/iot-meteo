"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Chart configuration
const chartConfig = {
  temperature: {
    label: "Temperature (°C)",
    color: "hsl(var(--chart-1))", // Customize with your theme color
  },
  humidity: {
    label: "Humidity (%)",
    color: "hsl(var(--chart-2))", // Customize with your theme color
  },
} satisfies ChartConfig

export function Graf() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const [data, setData] = React.useState<any[]>([])

  // Fetch data from API
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/all')  // Adjust API endpoint if needed
      const result = await response.json()
      const apiData = result.data

      // Aggregate data by date
      const aggregatedData = aggregateDataByDate(apiData)
      setData(aggregatedData)  // Set aggregated data to state
    }

    fetchData()
  }, [])

  // Helper function to aggregate temperature and humidity by date
  const aggregateDataByDate = (apiData: any[]) => {
    const aggregated: any = {}

    apiData.forEach((entry) => {
      const date = new Date(entry.timestamp).toLocaleDateString("en-US") // Format date (mm/dd/yyyy)
      if (!aggregated[date]) {
        aggregated[date] = { temperature: 0, humidity: 0, count: 0 }
      }

      // Aggregate temperature and humidity
      aggregated[date].temperature += entry.temperature
      aggregated[date].humidity += entry.humidity
      aggregated[date].count += 1
    })

    // Convert aggregated data to array and calculate averages
    return Object.keys(aggregated).map((date) => ({
      date,
      temperature: aggregated[date].temperature / aggregated[date].count,
      humidity: aggregated[date].humidity / aggregated[date].count,
    }))
  }

  // Filter data based on selected time range
  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      const date = new Date(item.date)
      const referenceDate = new Date()
      let daysToSubtract = 90
      if (timeRange === "30d") {
        daysToSubtract = 30
      } else if (timeRange === "7d") {
        daysToSubtract = 7
      }
      const startDate = new Date(referenceDate)
      startDate.setDate(startDate.getDate() - daysToSubtract)
      return date >= startDate
    })
  }, [data, timeRange])

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Temperature & Humidity Chart</CardTitle>
          <CardDescription>
            Showing temperature and humidity data for the selected period
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-temperature)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-temperature)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillHumidity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-humidity)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-humidity)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="humidity"
              type="natural"
              fill="url(#fillHumidity)"
              stroke="var(--color-humidity)"
              stackId="a"
            />
            <Area
              dataKey="temperature"
              type="natural"
              fill="url(#fillTemperature)"
              stroke="var(--color-temperature)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
