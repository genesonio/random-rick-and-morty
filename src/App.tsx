import axios from 'axios'
import { useQuery } from 'react-query'
import './App.css'

interface Character {
  created: string
  episode: Array<string>
  gender: string
  id: number
  image: string
  location: object
  name: string
  origin: object
  species: string
  status: string
  type: string
}

function getLastCharacterId() {
  const { data } = useQuery<number>('charId', async () => {
    const response = await axios.get('https://rickandmortyapi.com/api/character')
    console.log(response.data)
    return response.data

  })
}

async function getCharacterOrigin() {
  const { data } = useQuery<number>('charOrigin', async () => {
    const response = await axios.get('https://rickandmortyapi.com/api/character')
    console.log(response.data)
    return response.data
  })
}

getCharacterOrigin()

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomNumber = getRandomIntInclusive(1, 826)


function App() {

  const { data } = useQuery<Character>('char', async () => {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${randomNumber}`)
    console.log(response.data)
    return response.data
  })

  const alt = 'Imagem do personagem: ' + data?.name

  return (
    <>
      <div className="grid grid-cols-3 gap-1">
        <div className="flex flex-col justify-center p-7">
          <img
            src={data?.image}
            alt={alt}
            className="rounded-full"
          />
          <h1 className='text-center font-serif text-4xl'>{data?.name}</h1>
        </div>
      </div>

    </>
  )
}

export default App
