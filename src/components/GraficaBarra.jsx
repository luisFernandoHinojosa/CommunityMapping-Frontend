import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { PROBLEMATIC_DATA } from '../utils/constantes';
import { useState } from 'react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { locality, quantity } = payload[0].payload;
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 3px 8px rgba(0, 0, 0, 0.3)' }}>
        <p style={{ fontWeight: 'bold', marginBottom: 5 }}>{`Fecha: ${label}`}</p>
        <p style={{ color: '#FF6347' }}>{`Municipio: ${locality}`}</p>
        <p>{`Cantidad: ${quantity}`}</p>
      </div>
    );
  }

  return null;
};

export const GraficaBarra = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = (data, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={PROBLEMATIC_DATA.visual[0].data.problematic}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
        onMouseLeave={handleMouseLeave}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="date" tick={{ fontSize: 14 }} />
        <YAxis label={{ value: 'quantity', angle: -90, position: 'insideLeft', fontSize: 16, fill: '#666' }} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 99, 71, 0.2)' }} />
        <Legend verticalAlign="top" height={36} />
        <Bar
          dataKey="quantity"
          fill="#FF6347"
          barSize={50}
          radius={[10, 10, 0, 0]}
          onMouseEnter={handleMouseEnter}
        >
          <LabelList dataKey="quantity" position="top" fill="#333" fontSize={14} />
        </Bar>
        <defs>
          <linearGradient id="colorCantidad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF6347" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FF6347" stopOpacity={0.5} />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
};
