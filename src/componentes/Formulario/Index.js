import React, { useState } from 'react';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import ListaSuspensa from '../ListaSuspensa';
import './Formulario.css';
import Result from '../Result';

const Formulario = () => {
    const [tipoValvula, setTipoValvula] = useState('MFH-3');
    const [funcaoValvula, setFuncaoValvula] = useState('');
    const [atuacao, setAtuacao] = useState('');
    const [conexao, setConexao] = useState('');
    const [pressao, setPressao] = useState('');
    const [pressaoPiloto, setPressaoPiloto] = useState('');
    const [temperatura, setTemperatura] = useState('');
    const [tempoAcionamento, setTempoAcionamento] = useState('');
    const [frequencia, setFrequencia] = useState('');
    const [vazao, setVazao] = useState('');
    const [resultado, setResultado] = useState(null); // <- novo estado

    const aoSalvar = async (evento) => {
        evento.preventDefault();

        const dadosParaEnviar = {
            pressao: pressao,
            pressao_piloto: pressaoPiloto,
            temperatura: temperatura,
            tempo_acionamento: tempoAcionamento,
            frequencia: frequencia,
            vazao: vazao,
            tipo_valvula: tipoValvula,
            funcao_valvula: funcaoValvula,
            atuacao: atuacao,
            conexao: conexao
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
            setResultado(dados.resultado); // <- salvar resultado no estado
        } catch (error) {
            alert('Erro ao conectar com o servidor: ' + error.message);
        }
    };

    return (
        <section className="formulario">
            <form onSubmit={aoSalvar}>
                <h2>Preencha os dados para prever o comportamento da válvula</h2>

                <div className="linha-campos">
                    <ListaSuspensa
                        obrigatorio={true}
                        label="Tipo de Válvula"
                        itens={['MFH-3', 'MFH-5', 'VL/O-3', 'MOFH-3']}
                        valor={tipoValvula}
                        aoAlterado={valor => setTipoValvula(valor)}
                    />
                    <ListaSuspensa
                        obrigatorio={true}
                        label="Função da Válvula"
                        itens={['3/2-way', '5/2-way']}
                        valor={funcaoValvula}
                        aoAlterado={valor => setFuncaoValvula(valor)}
                    />
                </div>

                <div className="linha-campos">
                    <ListaSuspensa
                        obrigatorio={true}
                        label="Atuação Categórica"
                        itens={['Elétrica', 'Pneumática']}
                        valor={atuacao}
                        aoAlterado={valor => setAtuacao(valor)}
                    />
                    <ListaSuspensa
                        obrigatorio={true}
                        label="Tamanho da Conexão"
                        itens={['G1/8', 'G1/4', 'G1/2', 'G3/4']}
                        valor={conexao}
                        aoAlterado={valor => setConexao(valor)}
                    />
                </div>

                <CampoTexto
                    obrigatorio={true}
                    label="Pressão da operação (bar)"
                    placeholder="Digite a pressão detectada"
                    valor={pressao}
                    aoAlterado={valor => setPressao(valor)}
                />
                <CampoTexto
                    obrigatorio={true}
                    label="Pressão piloto (bar)"
                    placeholder="Digite a pressão piloto"
                    valor={pressaoPiloto}
                    aoAlterado={valor => setPressaoPiloto(valor)}
                />
                <CampoTexto
                    obrigatorio={true}
                    label="Temperatura ambiente (°C)"
                    placeholder="Digite a temperatura detectada"
                    valor={temperatura}
                    aoAlterado={valor => setTemperatura(valor)}
                />
                <CampoTexto
                    obrigatorio={true}
                    label="Tempo de acionamento (ms)"
                    placeholder="Digite o tempo de acionamento"
                    valor={tempoAcionamento}
                    aoAlterado={valor => setTempoAcionamento(valor)}
                />
                <CampoTexto
                    obrigatorio={true}
                    label="Frequência de comutação (Hz)"
                    placeholder="Digite a frequência de comutação"
                    valor={frequencia}
                    aoAlterado={valor => setFrequencia(valor)}
                />
                <CampoTexto
                    obrigatorio={true}
                    label="Vazão por minuto"
                    placeholder="Digite a vazão"
                    valor={vazao}
                    aoAlterado={valor => setVazao(valor)}
                />

                <Botao>Prever</Botao>
                <Result resultado={resultado} />
            </form>
        </section>
    );
};

export default Formulario;
