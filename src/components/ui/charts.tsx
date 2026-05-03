import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts";
import { cn } from "@/lib/utils";

// Cores do tema dark
const COLORS = {
  blue: "#3b82f6",
  green: "#22c55e",
  red: "#ef4444",
  purple: "#a855f7",
  amber: "#f59e0b",
  zinc: "#71717a",
};

interface ChartProps {
  data: any[];
  className?: string;
  dataKey?: string;
}

export function AreaChartComponent({ data, className }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300} className={className}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.3} />
            <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#252529" />
        <XAxis dataKey="name" stroke="#71717a" fontSize={12} />
        <YAxis stroke="#71717a" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#121215",
            border: "1px solid #252529",
            borderRadius: "8px",
            color: "#f8fafc",
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={COLORS.blue}
          fillOpacity={1}
          fill="url(#colorBlue)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function LineChartComponent({ data, className, dataKey = "ibov" }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300} className={className}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#252529" />
        <XAxis dataKey="name" stroke="#71717a" fontSize={12} />
        <YAxis stroke="#71717a" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#121215",
            border: "1px solid #252529",
            borderRadius: "8px",
            color: "#f8fafc",
          }}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={COLORS.blue}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function BarChartComponent({ data, className }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300} className={className}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#252529" />
        <XAxis dataKey="name" stroke="#71717a" fontSize={12} />
        <YAxis stroke="#71717a" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#121215",
            border: "1px solid #252529",
            borderRadius: "8px",
            color: "#f8fafc",
          }}
        />
        <Bar dataKey="value" fill={COLORS.blue} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PieChartComponent({ data, className }: ChartProps) {
  const COLORS_ARRAY = [COLORS.blue, COLORS.purple, COLORS.green, COLORS.amber, COLORS.zinc];

  return (
    <ResponsiveContainer width="100%" height={300} className={className}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }: any) => 
            `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
          }
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS_ARRAY[index % COLORS_ARRAY.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#121215",
            border: "1px solid #252529",
            borderRadius: "8px",
            color: "#f8fafc",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ScatterPlotComponent({ data, className }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300} className={className}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" stroke="#252529" />
        <XAxis
          type="number"
          dataKey="pe"
          name="P/L"
          stroke="#71717a"
          fontSize={12}
        />
        <YAxis
          type="number"
          dataKey="dy"
          name="Dividend Yield"
          stroke="#71717a"
          fontSize={12}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          contentStyle={{
            backgroundColor: "#121215",
            border: "1px solid #252529",
            borderRadius: "8px",
            color: "#f8fafc",
          }}
        />
        <Scatter name="Ativos" data={data} fill={COLORS.blue} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export function SparklineChart({ data, color, positive }: { data: number[]; color?: string; positive?: boolean }) {
  const chartData = data.map((val, idx) => ({ value: val, idx }));
  const lineColor = color || (positive ? "#22c55e" : "#ef4444");
  
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={lineColor}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
