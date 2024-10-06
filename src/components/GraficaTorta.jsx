import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { PROBLEMATIC_DATA } from '../utils/constantes';

const DATA_GRAFICA = PROBLEMATIC_DATA.visual[0].data.problematic;
// 4330
export const GraficaTorta = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    console.log(DATA_GRAFICA)
    const onPieEnter = (_, index) => {
      setActiveIndex(index);  
    };

    return (
      <ResponsiveContainer width="100%" height={700}>
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={DATA_GRAFICA}  // Usamos los nuevos datos
            cx="50%"
            cy="55%"
            innerRadius={180}
            outerRadius={250}
            fill="#8884d8"
            dataKey="quantity"  // Indicamos que el valor es 'cantidad'
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    );
};

// Sector activo actualizado para mostrar 'mes', 'municipio', y 'cantidad'
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.mes} {/* Mostramos el mes */}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`quantity: ${value}`}</text> {/* Mostramos la cantidad */}
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(locality: ${payload.locality})`} {/* Mostramos el municipio */}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={36} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
