import axios from 'axios'
import { useQuery } from 'react-query'
import './App.css'
import { randomInteger } from './services/randomInteger'

interface Character {
  created: string
  episode: Array<string>
  gender: string
  id: number
  image: string
  location: Location
  name: string
  origin: Origin
  species: string
  status: string
  type: string
}

interface Origin {
  name: string
  url: string
}

interface Location {
  name: string
  url: string
}

function getLastCharacterId() {
  const { data } = useQuery<number>('charId', async () => {
    const response = await axios.get('https://rickandmortyapi.com/api/character')
    console.log(response.data)
    return response.data

  })
}

// async function getCharacterOrigin() {
//   const { data } = useQuery<number>('charOrigin', async () => {
//     const response = await axios.get('https://rickandmortyapi.com/api/character')
//     console.log(response.data)
//     return response.data
//   })
// }

// getCharacterOrigin()

const randomNumber = randomInteger(1, 826)


function App() {
  
  const { data: char } = useQuery<Character>('char', async () => {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${randomNumber}`)
    console.log(response.data)
    return response.data
  })


  // if (char != undefined ) {
  //   useQuery<Array<string>>('test', async () => {
  //     const response = await axios.get(`${char?.episode[0]}`)
  //     return response.data
  //   })
  // }

  // const originUrl = char?.origin.url

  // const { data: origin} = useQuery<Origin>('origin',async () => {
  //   const response = await axios.get(`${originUrl}`)
  //   console.log(response.data)
  //   return response.data
  // })

  const alt = 'Imagem do personagem: ' + char?.name

  return (
      <div className="flex justify-center bg-green-300 bg-contain w-screen h-screen">
        { /* PERSONAGEM */ }
        <div className="flex flex-col justify-center p-2">
          {char?.image && 
          <img
            src={char?.image}
            alt={alt}
            className="rounded-full w-96 h-96 self-center"
          />}

          <h1 className='text-center font-serif text-4xl mt-7 mb-4'>{char?.name}</h1>

          <div className="grid grid-cols-2 text-center">
            <p>
              Id: {char?.id} <br />
              Status: {char?.status} <br />
              Species: {char?.species} <br />
              Gender: {char?.gender}
            </p>
            <p>
              Origin: {char?.origin.name} <br />
              Location: {char?.location.name} <br />
              First episode: {}
            </p>
          </div>
        </div>
      </div>
  )
}

export default App
