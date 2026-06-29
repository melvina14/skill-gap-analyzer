import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts";

export const CHART_COLORS = [
  "#5b3fd6", // indigo
  "#9333ea", // purple
  "#2a9bd1", // cyan-blue
  "#e0a829", // amber
  "#1fae6a", // green
  "#d14d8a", // pink
  "#6d59e0",
  "#7b5cf0",
];

const PRIMARY = "#5b3fd6";
const SECONDARY = "#9333ea";

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #e6e3f0",
  boxShadow: "0 12px 32px -12px rgba(60,40,140,0.25)",
  fontSize: 13,
};

interface Datum {
  name: string;
  [key: string]: string | number;
}

export function SkillBarChart({
  data,
  dataKey,
  color = PRIMARY,
  label,
  unit = "%",
  height = 340,
}: {
  data: Datum[];
  dataKey: string;
  color?: string;
  label?: string;
  unit?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eceaf3" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b6685" }} interval={0} angle={-25} textAnchor="end" height={64} />
        <YAxis tick={{ fontSize: 12, fill: "#6b6685" }} unit={unit} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}${unit}`, label ?? dataKey]} cursor={{ fill: "rgba(91,63,214,0.06)" }} />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} name={label} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SkillPieChart({
  data,
  dataKey,
  height = 340,
}: {
  data: Datum[];
  dataKey: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={110}
          innerRadius={55}
          paddingAngle={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v}%`} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function SkillRadarChart({
  data,
  dataKey,
  color = SECONDARY,
  height = 360,
}: {
  data: Datum[];
  dataKey: string;
  color?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="#e3e0ee" />
        <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b6685" }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "#9b96b0" }} />
        <Radar dataKey={dataKey} stroke={color} fill={color} fillOpacity={0.4} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v}%`} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function DemandSupplyChart({
  data,
  height = 380,
}: {
  data: Datum[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eceaf3" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b6685" }} interval={0} angle={-25} textAnchor="end" height={64} />
        <YAxis tick={{ fontSize: 12, fill: "#6b6685" }} unit="%" />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v}%`} cursor={{ fill: "rgba(91,63,214,0.06)" }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="Demand" fill={PRIMARY} radius={[6, 6, 0, 0]} />
        <Bar dataKey="Supply" fill={SECONDARY} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function GapChart({
  data,
  height = 380,
}: {
  data: (Datum & { gap: number })[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, left: 24, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eceaf3" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12, fill: "#6b6685" }} unit="%" />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#6b6685" }} width={120} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, "Gap (Supply − Demand)"]} cursor={{ fill: "rgba(91,63,214,0.06)" }} />
        <Bar dataKey="gap" radius={[0, 6, 6, 0]}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.gap < 0 ? "#dc4e4e" : "#1fae6a"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ComparisonLineChart({
  data,
  height = 340,
}: {
  data: Datum[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eceaf3" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b6685" }} interval={0} angle={-25} textAnchor="end" height={64} />
        <YAxis tick={{ fontSize: 12, fill: "#6b6685" }} unit="%" />
        <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v}%`} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="Demand" stroke={PRIMARY} strokeWidth={2.5} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="Supply" stroke={SECONDARY} strokeWidth={2.5} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
