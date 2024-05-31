import { useState, useEffect, useMemo } from 'react'
import { calcularPesoDaPeca } from '../utils/calcularPesoDaPeca'
import { pegarPassos } from '../utils/pegarPassos'
import {
  InputWithLabel,
  PrecoInputWithLabel,
} from '../components/InputWithLabel'
import { Button } from '@/components/ui/button'
import { SelectWithLabel } from './SelectWithLabel'
import { Combobox } from './Combobox'
import { Label } from '@/components/ui/label'

function getPassosArray(passos) {
  return passos.map((p) => p.passo)
}

export function Form() {
  const passos = pegarPassos()
  const [numeroDeDentes, setNumeroDeDentes] = useState('')
  const [passoName, setPassoName] = useState(passos[0].passo)
  const [passoValue, setPassoValue] = useState('')
  const [material, setMaterial] = useState('Aço')
  const [comprimentoDaPeca, setComprimentoDaPeca] = useState('')
  const [pesoDaPeca, setPesoDaPeca] = useState('')
  const [preco, setPreco] = useState('')

  const memoizedPassos = useMemo(() => getPassosArray(passos), [passos])

  useEffect(() => {
    const findPasso = passos.find((p) => p.passo === passoName)

    if (findPasso) setPassoValue(findPasso.valor)
  }, [passoName])

  function callCalcularPesoDaPeca() {
    const receivedPesoDaPeca = calcularPesoDaPeca(
      numeroDeDentes,
      passoValue,
      material,
      comprimentoDaPeca
    )

    setPesoDaPeca(receivedPesoDaPeca * preco)
  }

  return (
    <div>
      <form
        className="relative"
        onSubmit={(e) => {
          e.preventDefault()
          callCalcularPesoDaPeca()
        }}
      >
        <div className="flex flex-row gap-3">
          <div className="flex flex-col gap-2">
            <InputWithLabel
              label={'Numero de dentes'}
              onChange={(event) => setNumeroDeDentes(event.currentTarget.value)}
            />

            <InputWithLabel
              label={'Comprimento da peça'}
              onChange={(event) =>
                setComprimentoDaPeca(event.currentTarget.value)
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <SelectWithLabel
              label={'Material'}
              onValueChange={setMaterial}
              options={['Aço', 'Aluminio']}
              value={material}
            />

            <Combobox
              value={passoName}
              setValue={setPassoName}
              options={memoizedPassos}
            />
          </div>
        </div>

        <PrecoInputWithLabel
          label={'Preço atual'}
          onChange={(event) => setPreco(event.currentTarget.value)}
        />

        <Button variant="outline" className="mt-4">
          Calcular
        </Button>

        <Label className="absolute bottom-1.5 left-1/3 text-xl">
          Valor final: {pesoDaPeca}
        </Label>
      </form>
    </div>
  )
}
