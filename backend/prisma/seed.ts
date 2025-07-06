import { PrismaClient, LevelName, PhaseType } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

// Função utilitária para ler imagem da pasta assets
function loadImage(filename: string) {
  try {
    return readFileSync(join(__dirname, '../src/assets', filename));
  } catch {
    return null;
  }
}

const prisma = new PrismaClient();

async function main() {
  // Cria o Level Básico
  const basicLevel = await prisma.level.upsert({
    where: { name: LevelName.Basic }, // Corrigido: busca pelo campo único 'name'
    update: {},
    create: {
      id: 'basic',
      name: LevelName.Basic,
      description: 'Familiarização com conceitos de computação quântica',
    },
  });

  const intermediateLevel = await prisma.level.upsert({
    where: { name: LevelName.Intermediate }, // Corrigido: busca pelo campo único 'name'
    update: {},
    create: {
      id: 'intermediate',
      name: LevelName.Intermediate,
      description: 'Aprofundamento em alguns conceitos de computação quântica',
    },
  });

  // Fases do nível Básico
  await prisma.phase.createMany({
    data: [
      {
        title: 'Bits quânticos',
        description: 'Introdução aos bits quânticos',
        type: PhaseType.explanation,
        text: 'Na computação clássica, os bits são 0 e 1. \n\n Na computação quântica, os bits são estados de energia |0⟩ e |1⟩, nos quais |0⟩ representa o menor estado de energia e |1⟩ representa o maior estado de energia Tipicamente, os bits quânticos são representados por matrizes, tais quais\n\n\n',
        image: loadImage('qubits.png'),
        levelId: basicLevel.id,
      },
      {
        title: 'Portas quânticas',
        description: 'Introdução às portas quânticas',
        type: PhaseType.explanation,
        text: 'Assim como os qubits, portas lógicas quânticas também são representadas por matrizes. Existem portas que se aplicam a um qubit e existem portas que se aplicam a multiplos qubits.\n\n A aplicação de uma porta lógica quântica se dá pela multiplicação de matrizes, tal qual',
        image: loadImage('qugate_application .png'),
        secondText: 'Vamos conhecer algumas portas de um qubit...',
        levelId: basicLevel.id,
      },
      {
        title: 'Porta Pauli X',
        description: 'Conhecendo a porta Pauli X',
        type: PhaseType.explanation,
        text: 'É uma das portas Pauli, muito utilizadas na computação quãntica. Sua função é bem semelhante à porta NOT na compução clássica, pois ela transforma |0⟩ em |1⟩ e vice versa. \nA porta pauli X é representada pela matriz ',
        image: loadImage('pauli-x.png'),
        secondText: 'Veja como a porta Pauli X é aplicada ao qubit |0⟩',
        secondImage: loadImage('pauli-x-to-0.png'),
        levelId: basicLevel.id,
      },
      {
        title: 'Utilização da porta Pauli X',
        description: 'Quiz sobre Pauli X',
        type: PhaseType.quiz,
        text: 'Qual o resultado de aplicar Pauli X sobre |0⟩?',
        image: loadImage('pauli-x-use.png'), // Remova .toString('base64'), mantenha como Buffer ou null
        possibleResponses: ['|0⟩', '|1⟩', '-|1⟩', 'Cria uma superposição'],
        correctResponse: '|1⟩',
        responseJustificationText:
          'Paulli X inverte o estado de |0⟩, conforme a multiplicação de matrizes abaixo',
        responseJustificationImage: loadImage('pauli-x-to-0.png'), // Remova .toString('base64'), mantenha como Buffer ou null
        levelId: basicLevel.id,
      },
      {
        title: 'Porta Pauli Z',
        description: 'Conhecendo a porta Pauli Z',
        type: PhaseType.explanation,
        text: 'Também é uma das portas Pauli. Sua função se difere das portas Pauli X e Pauli Y, pois ela deixa |0⟩ inauterado, mas transforma |1⟩ em -|1⟩, ou seja, inverte a fase de |1⟩. \nA porta pauli Z é representada pela matriz ',
        image: loadImage('pauli-z.png'),
        secondText: 'Veja como a porta Pauli Z é aplicada ao qubit |1⟩',
        secondImage: loadImage('pauli-z-to-1.png'),
        levelId: basicLevel.id,
      },
      {
        title: 'Utilização da porta Pauli Z',
        description: 'Quiz sobre Pauli Z',
        type: PhaseType.quiz,
        text: 'Como a porta Z modifica o estado |1⟩?',
        image: loadImage('use-pauli-z.png'), // Corrigido: mantenha como Buffer ou null
        possibleResponses: [
          'Mantem o mesmo estado',
          'Transforma em |0⟩',
          'Transforma em -|1⟩',
          'Cria uma superposição',
        ],
        correctResponse: 'Transforma em -|1⟩',
        levelId: basicLevel.id,
      },
      {
        title: 'Utilização das portas Pauli X e Pauli Z',
        description: 'Quiz sobre Pauli X e Z',
        type: PhaseType.quiz,
        text: 'Qual o resultado de aplicar Pauli X e Pauli Z sobre |1⟩?',
        image: loadImage('x-over-z-over-1.png'), // Corrigido: mantenha como Buffer ou null
        possibleResponses: ['-|0⟩', '|1⟩', '-|1⟩', '|0⟩'],
        correctResponse: '-|0⟩',
        levelId: basicLevel.id,
      },
      {
        title: 'Normalização de estado quântico',
        description: 'Quiz sobre estados quânticos normalizados',
        type: PhaseType.quiz,
        text: 'Qual é o valor de |a|² + |b|² para qualquer estado quântico normalizado?',
        possibleResponses: ['0', '2', '√2', '1'],
        correctResponse: '1',
        responseJustificationText:
          'Um estado quântico normalizado satisfaz a condição |a|² + |b|² = 1, garantindo que a soma das probabilidades seja igual a 1.',
        levelId: intermediateLevel.id,
      },
      {
        title: 'Probabilidade de medição',
        description: 'Quiz sobre medida em qubit',
        type: PhaseType.quiz,
        text: 'Se |ψ⟩ = (1/√2)|0⟩ + (1/√2)|1⟩, qual a probabilidade de medir o qubit como |0⟩?',
        possibleResponses: ['1', '0', '√2/2', '0.5'],
        correctResponse: '0.5',
        responseJustificationText:
          'A probabilidade de medir |0⟩ é dada por |1/√2|² = 1/2 = 0.5.',
        levelId: intermediateLevel.id,
      },
      {
        title: 'Fase da porta Z',
        description: 'Quiz sobre porta Z',
        type: PhaseType.quiz,
        text: 'A porta Z aplica uma fase de quantos graus?',
        possibleResponses: ['90', '45', '270', '180'],
        correctResponse: '180',
        responseJustificationText:
          'A porta Z inverte a fase do estado |1⟩, aplicando uma fase de 180 graus (ou π radianos).',
        levelId: intermediateLevel.id,
      },
      {
        title: 'Fase da porta T',
        description: 'Quiz sobre porta T',
        type: PhaseType.quiz,
        text: 'A porta T aplica uma fase de quantos graus?',
        possibleResponses: ['30', '90', '60', '45'],
        correctResponse: '45',
        responseJustificationText:
          'A porta T aplica uma fase de π/4 radianos, equivalente a 45 graus.',
        levelId: intermediateLevel.id,
      },
      {
        title: 'Hadamard em |0⟩',
        description: 'Quiz sobre aplicação de Hadamard',
        type: PhaseType.quiz,
        text: 'Após Hadamard em |0⟩, qual o coeficiente de |1⟩ no estado resultante?',
        possibleResponses: ['0', '1', '-1/√2', '1/√2'],
        correctResponse: '1/√2',
        responseJustificationText:
          'H|0⟩ = (|0⟩ + |1⟩)/√2. Portanto, o coeficiente de |1⟩ é 1/√2.',
        levelId: intermediateLevel.id,
      },
      {
        title: 'Soma de estados Hadamard',
        description: 'Quiz sobre superposição',
        type: PhaseType.quiz,
        text: 'Se |ψ⟩ = H|0⟩ e |φ⟩ = H|1⟩, então |ψ⟩ + |φ⟩ resulta em qual estado?',
        possibleResponses: ['|1⟩', '(|0⟩ + |1⟩)/√2', '0', '|0⟩'],
        correctResponse: '|0⟩',
        responseJustificationText:
          'H|0⟩ = (|0⟩ + |1⟩)/√2 e H|1⟩ = (|0⟩ - |1⟩)/√2. Somando: (|0⟩ + |1⟩ + |0⟩ - |1⟩)/√2 = 2|0⟩/√2 = √2|0⟩ (normalizável).',
        levelId: intermediateLevel.id,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
