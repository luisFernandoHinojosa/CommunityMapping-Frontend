import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

// Datos actualizados
const DATA_GRAFICA = [
  { mes: 'Enero', cantidad: 300, municipio: "Municipio 1" },
  { mes: 'Febrero', cantidad: 280, municipio: "Municipio 2" },
  { mes: 'Marzo', cantidad: 350, municipio: "Municipio 3" },
  { mes: 'Abril', cantidad: 270, municipio: "Municipio 4" },
  { mes: 'Mayo', cantidad: 320, municipio: "Municipio 5" },
  { mes: 'Junio', cantidad: 400, municipio: "Municipio 6" },
  { mes: 'Julio', cantidad: 450, municipio: "Municipio 7" },
  { mes: 'Agosto', cantidad: 500, municipio: "Municipio 8" },
  { mes: 'Septiembre', cantidad: 460, municipio: "Municipio 9" },
  { mes: 'Octubre', cantidad: 400, municipio: "Municipio 10" },
  { mes: 'Noviembre', cantidad: 320, municipio: "Municipio 11" },
  { mes: 'Diciembre', cantidad: 280, municipio: "Municipio 12" },
];
// 4330
export const GraficaTorta = () => {
    const [activeIndex, setActiveIndex] = useState(0);

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
            dataKey="cantidad"  // Indicamos que el valor es 'cantidad'
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
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Cantidad: ${value}`}</text> {/* Mostramos la cantidad */}
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Municipio: ${payload.municipio})`} {/* Mostramos el municipio */}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={36} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
