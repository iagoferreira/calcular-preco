import { calcularDiametro } from './calcularDiametro'
import { encontrarPesoDoMaterial } from './encontrarPesoDoMaterial'
import { transformarKgMparaKgMM } from './transformarKgMparaKgMM'

export function calcularPesoDaPeca(
  numeroDeDentes,
  passo,
  material,
  comprimentoDaPeca
) {
  // console.log(numeroDeDentes, passo, material, comprimentoDaPeca)
  const diametro = calcularDiametro(numeroDeDentes, passo) // retorna o valor em kg/m
  const pesoEmKgM = encontrarPesoDoMaterial(diametro, material)
  const pesoEmKgMM = transformarKgMparaKgMM(pesoEmKgM)

  console.log(diametro, pesoEmKgM, pesoEmKgMM)

  return comprimentoDaPeca * pesoEmKgMM
}
