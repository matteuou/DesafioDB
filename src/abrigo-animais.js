const animais = {
  Rex: { tipo: "cão", favoritos: ["RATO", "BOLA"] },
  Mimi: { tipo: "gato", favoritos: ["BOLA", "LASER"] },
  Fofo: { tipo: "gato", favoritos: ["BOLA", "RATO", "LASER"] },
  Zero: { tipo: "gato", favoritos: ["RATO", "BOLA"] },
  Bola: { tipo: "cão", favoritos: ["CAIXA", "NOVELO"] },
  Bebe: { tipo: "cão", favoritos: ["LASER", "RATO", "BOLA"] },
  Loco: { tipo: "jabuti", favoritos: ["SKATE", "RATO"] },
};

const PESSOA1 = "pessoa 1";
const PESSOA2 = "pessoa 2";
const ABRIGO = "abrigo";

const normalize = (str) => str.trim().toUpperCase();

function validarEntradas(brinquedos1, brinquedos2, ordemAnimais) {
  const nomesValidos = Object.keys(animais);
  const duplicados = new Set();

  const listaAnimais = ordemAnimais.split(",").map((a) => a.trim());
  for (let nome of listaAnimais) {
    if (!nomesValidos.includes(nome)) return { erro: "Animal inválido" };
    if (duplicados.has(nome))
      return { erro: "Animal selecionado mais de uma vez" };
    duplicados.add(nome);
  }

  const todosBrinquedos = new Set(
    Object.values(animais).flatMap((a) => a.favoritos.map(normalize))
  );

  const validar = (lista) => {
    const vistos = new Set();
    for (let b of lista.split(",").map(normalize).filter(Boolean)) {
      if (!todosBrinquedos.has(b)) return { erro: "Brinquedo inválido" };
      if (vistos.has(b))
        return { erro: "Brinquedo selecionado mais de uma vez" };
      vistos.add(b);
    }
    return null;
  };

  return validar(brinquedos1) || validar(brinquedos2) || null;
}

function podeAdotar(brinquedos, animal, adotados) {
  const favs = animais[animal].favoritos.map(normalize);
  const lista = brinquedos.split(",").map(normalize).filter(Boolean);

  if (animal === "Loco")
    return adotados.length > 0 && favs.some((f) => lista.includes(f));

  let indice = 0;
  lista.forEach((b) => {
    if (b === favs[indice]) indice++;
  });
  return indice === favs.length;
}

class AbrigoAnimais {
  encontraPessoas(brinquedos1, brinquedos2, ordem) {
    const erro = validarEntradas(brinquedos1, brinquedos2, ordem);
    if (erro) return erro;

    const adotadosP1 = [];
    const adotadosP2 = [];

    const resultado = ordem.split(",").map((animal) => {
      const tipo = animais[animal].tipo;
      const p1Pode =
        adotadosP1.length < 3 && podeAdotar(brinquedos1, animal, adotadosP1);
      const p2Pode =
        adotadosP2.length < 3 && podeAdotar(brinquedos2, animal, adotadosP2);

      let dono = ABRIGO;

      if (tipo === "gato") {
        if (p1Pode && !p2Pode) dono = PESSOA1;
        else if (!p1Pode && p2Pode) dono = PESSOA2;
      } else if (animal !== "Loco") {
        if (p1Pode) dono = PESSOA1;
        else if (p2Pode) dono = PESSOA2;
      } else {
        // Loco permanece ABRIGO se ninguém pode adotar
        if (p1Pode) dono = PESSOA1;
        else if (p2Pode) dono = PESSOA2;
      }

      if (dono === PESSOA1) adotadosP1.push(animal);
      if (dono === PESSOA2) adotadosP2.push(animal);

      return `${animal} - ${dono}`;
    });

    return { lista: resultado, erro: false };
  }
}

export { AbrigoAnimais };
