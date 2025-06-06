import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'; // Using recharts

// Example data structure
const defaultData = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

interface AnimatedFinancialChartProps {
  data?: Array<{ name: string; [key: string]: number | string }>;
  title?: string;
  lines?: Array<{ dataKey: string; stroke: string; name?: string }>;
}

const AnimatedFinancialChart: React.FC<AnimatedFinancialChartProps> = ({
  data = defaultData,
  title = "Financial Overview",
  lines = [{ dataKey: "pv", stroke: "#8884d8", name: "Performance" }, {dataKey: "uv", stroke: "#82ca9d", name: "Projection"}]
}) => {
  console.log("Rendering AnimatedFinancialChart with title:", title);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {lines.map(line => (
                <Line key={line.dataKey} type="monotone" dataKey={line.dataKey} stroke={line.stroke} name={line.name} animationDuration={500} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimatedFinancialChart;