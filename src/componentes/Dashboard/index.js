import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
 
// Componente para o gráfico
const CylinderHistoryChart = ({ title, tagAvancado, tagRecuado, value }) => {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    // Função que buscA o histórico de ambos os sensores
    const fetchHistory = async () => {
      try {
        const [historyAvancado, historyRecuado] = await Promise.all([
          fetch(`http://localhost:5000/api/cylinder/history?tag=${tagAvancado}`).then(res => res.json()),
          fetch(`http://localhost:5000/api/cylinder/history?tag=${tagRecuado}`).then(res => res.json())
        ]);
       
        // Mapeia os dados em um objeto para fácil consulta por timestamp
        const allTimestamps = [...new Set([
          ...historyAvancado.map(d => d.ts),
          ...historyRecuado.map(d => d.ts)
        ])];
 
        // Converte e filtra os novos dados
        const newDataForChart = allTimestamps.map(ts => {
          const avanco = historyAvancado.find(d => d.ts === ts);
          const recuo = historyRecuado.find(d => d.ts === ts);
          let valor = 0.5; // Valor padrão para 'indefinido'
 
          // Lógica para determinar o valor: 1 para avanço, 0 para recuo, 0.5 para indefinido
          if (avanco && avanco.valor === 1) {
            valor = 1;
          } else if (recuo && recuo.valor === 1) {
            valor = 0;
          }
 
          return { ts, valor };
        }).filter(point => {
          // Garante que o timestamp seja uma data válida
          const date = new Date(point.ts);
          return !isNaN(date.getTime());
        });
 
        // Adiciona apenas os novos pontos que ainda não estão na fila
        setData(prevData => {
          const existingTimestamps = new Set(prevData.map(d => d.ts));
          const uniqueNewPoints = newDataForChart.filter(point => !existingTimestamps.has(point.ts));
 
          const updatedData = [...prevData, ...uniqueNewPoints];
         
          // Ordena e mantém os últimos 20 pontos de dados
          const sortedData = updatedData.sort((a, b) => new Date(a.ts) - new Date(b.ts)).slice(-20);
         
          return sortedData;
        });
 
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
      }
    };
 
    // Atualiza o histórico a cada 3 segundos
    const interval = setInterval(fetchHistory, 3000);
   
    // Busca os dados na montagem do componente
    fetchHistory();
 
    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, [tagAvancado, tagRecuado]);
 
  // Função para formatar o texto do Y-axis
  const formatYAxis = (tickItem) => {
    if (tickItem === 1) return 'Avançado';
    if (tickItem === 0) return 'Recuado';
    if (tickItem === 0.5) return 'Indefinido';
    return '';
  };
 
  return (
    <div className="bg-white rounded-lg p-6 shadow-xl w-full">
      <h2 className="text-xl font-bold mb-4">{title} - Histórico</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="ts"
            // Formata o timestamp para ficar mais legível
            tickFormatter={(ts) => {
                const date = new Date(ts);
                return !isNaN(date.getTime()) ? date.toLocaleTimeString() : '';
            }}
          />
          <YAxis
            domain={[0, 1]}
            ticks={[0, 0.5, 1]}
            tickFormatter={formatYAxis}
          />
          <Tooltip />
          <Area
            type="stepAfter"
            dataKey="valor"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorValor)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center text-lg font-semibold">
        Status Atual: <span className={value === 'AVANÇADO' ? 'text-green-500' : value === 'RECUADO' ? 'text-red-500' : 'text-gray-500'}>{value}</span>
      </div>
    </div>
  );
};
 
// Componente principal do Dashboard
const Dashboard = () => {
  const [cylinder1Status, setCylinder1Status] = useState("POSIÇÃO INDEFINIDA");
  const [cylinder2Status, setCylinder2Status] = useState("POSIÇÃO INDEFINIDA");
 
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cylinder/status");
        const data = await response.json();
        setCylinder1Status(data.statusCilindro1);
        setCylinder2Status(data.statusCilindro2);
      } catch (error) {
        console.error("Erro ao buscar o status dos cilindros:", error);
      }
    };
 
    const interval = setInterval(fetchStatus, 3000);
    fetchStatus();
 
    return () => clearInterval(interval);
  }, []);
 
  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
          Monitoramento em Tempo Real
        </h1>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Cilindro 1</h2>
            <p className="text-4xl font-extrabold" style={{ color: cylinder1Status === 'AVANÇADO' ? '#10B981' : cylinder1Status === 'RECUADO' ? '#EF4444' : '#6B7280' }}>
              {cylinder1Status}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Cilindro 2</h2>
            <p className="text-4xl font-extrabold" style={{ color: cylinder2Status === 'AVANÇADO' ? '#10B981' : cylinder2Status === 'RECUADO' ? '#EF4444' : '#6B7280' }}>
              {cylinder2Status}
            </p>
          </div>
        </div>
 
        {/* Componentes de Gráfico para cada Cilindro */}
        <div className="mt-12 space-y-8">
          <CylinderHistoryChart
            title="Cilindro 1"
            tagAvancado="Avancado_1S2"
            tagRecuado="Recuado_1S1"
            value={cylinder1Status}
          />
          <CylinderHistoryChart
            title="Cilindro 2"
            tagAvancado="Avancado_2S2"
            tagRecuado="Recuado_2S1"
            value={cylinder2Status}
          />
        </div>
      </div>
    </div>
  );
};
 
export default Dashboard;
 
 
