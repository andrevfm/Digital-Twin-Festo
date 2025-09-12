import React, { useState } from 'react';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import ListaSuspensa from '../ListaSuspensa';
import './Formulario.css';
import Result from '../Result';
 
const Formulario = () => {
    // Campos de entrada
    const [diametroPistao, setDiametroPistao] = useState('');
    const [clampingUnit, setClampingUnit] = useState('Sim'); // agora boolean
    const [horasOperacao, setHorasOperacao] = useState('');
    const [manutencaoRealizada, setManutencaoRealizada] = useState('');
    const [temperaturaAmbiente, setTemperaturaAmbiente] = useState('');
    const [pressaoOperacaoBar, setPressaoOperacaoBar] = useState('');
    const [velocidadePistao, setVelocidadePistao] = useState('');
    const [pressaoEntrada, setPressaoEntrada] = useState('');
    const [pressaoSaida, setPressaoSaida] = useState('');
    const [sensorUmidade, setSensorUmidade] = useState('');
    const [vibracao, setVibracao] = useState('');
    const [deltaPressaoBar, setDeltaPressaoBar] = useState('');
    const [umidadeInterna, setUmidadeInterna] = useState('');
    const [cursoMm, setCursoMm] = useState('');
    const [tipoAmortecimento, setTipoAmortecimento] = useState('PPS');
    const [protecaoEspecial, setProtecaoEspecial] = useState('Nenhuma');
    const [posicaoInstalacao, setPosicaoInstalacao] = useState('Inclinada');
    const [resultado, setResultado] = useState(null);
 
    const aoSalvar = async (evento) => {
        evento.preventDefault();
 
        const dadosParaEnviar = {
            diametro_pistao: diametroPistao,
            clamping_unit: clampingUnit === 'Sim', // converte para boolean
            horas_operacao: horasOperacao,
            manutencao_realizada: manutencaoRealizada,
            curso_mm: cursoMm,
            temperatura_ambiente: temperaturaAmbiente,
            pressao_operacao_bar: pressaoOperacaoBar,
            velocidade_pistao: velocidadePistao,
            pressao_entrada: pressaoEntrada,
            pressao_saida: pressaoSaida,
            sensor_umidade: sensorUmidade,
            vibracao: vibracao,
            delta_pressao_bar: deltaPressaoBar,
            umidade_interna: umidadeInterna,
            tipo_amortecimento: tipoAmortecimento,
            protecao_especial: protecaoEspecial,
            posicao_instalacao: posicaoInstalacao,
        };
 
        try {
            const resposta = await fetch('http://localhost:5000/api/prever', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosParaEnviar)
            });
 
            if (!resposta.ok) {
                const erro = await resposta.json();
                alert('Erro: ' + erro.erro);
                return;
            }
 
            const dados = await resposta.json();
            setResultado(dados.resultado);
        } catch (error) {
            alert('Erro ao conectar com o servidor: ' + error.message);
        }
    };
 
    return (
        <section className="formulario">
            <form onSubmit={aoSalvar}>
 
                <div className='containers'>
                    <div className="caixaFormulario">
                        <h2 className='texto'>Preencha para prever o comportamento do cilindro:</h2>
                        <div className='colunaFormulario'>
 
 
                           
 
 
 
                         
                           
                            <CampoTexto
                                obrigatorio
                       
                                placeholder="Temperatura ambiente (°C)"
                                valor={temperaturaAmbiente}
                                aoAlterado={setTemperaturaAmbiente}
                            />
 
                           
                           
                            <CampoTexto
                                obrigatorio
                             
                                placeholder="Pressão de entrada (bar)"
                                valor={pressaoEntrada}
                                aoAlterado={setPressaoEntrada}
                            />
                            <CampoTexto
                                obrigatorio
                             
                                placeholder="Pressão de saída (bar)"
                                valor={pressaoSaida}
                                aoAlterado={setPressaoSaida}
                            />
                           
                            <CampoTexto
                                obrigatorio
                           
                                placeholder="Vibração (mm/s)"
                                valor={vibracao}
                                aoAlterado={setVibracao}
                            />
                           
                            <CampoTexto
                                obrigatorio
                           
                                placeholder="Umidade interna detectada (%)"
                                valor={umidadeInterna}
                                aoAlterado={setUmidadeInterna}
                            />
                            <CampoTexto
                                obrigatorio
                           
                                placeholder="Posição do Pistão"
                                valor={umidadeInterna}
                                aoAlterado={setUmidadeInterna}
                            />
                            <CampoTexto
                                obrigatorio
                               
                                placeholder="Tempo do Ciclo"
                                valor={umidadeInterna}
                                aoAlterado={setUmidadeInterna}
                            />
 
                        </div>
                    </div>
                    <div className='caixaGrafico'>
                        <h2 className='texto'>Gráfico da Simulação</h2>
                        <ListaSuspensa
                            itens={['Pressão', 'Temperatura']}
                            valor={clampingUnit}
                            aoAlterado={setClampingUnit}
                        />
 
                    </div>
                </div>
 
 
                <Botao>Simular</Botao>
                <Result resultado={resultado} />
            </form>
        </section>
    );
};
 
export default Formulario;