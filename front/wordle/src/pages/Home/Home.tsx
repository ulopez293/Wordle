import { useAtom } from 'jotai'
import { tokenDataAtom, userDataAtom } from '../../state/atoms'
import { useNavigate } from 'react-router-dom'
import useSWR from "swr"
import { Server } from '../../enums/Server'
import { User } from '../../interfaces/User'
import { ResponseUser } from '../../interfaces/ResponseUser'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Home = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useAtom(userDataAtom)
    const [, setTokenData] = useAtom(tokenDataAtom)

    const { data, error, isLoading } = useSWR<{ users: User[] }>(Server.Host + `users`, fetcher)
    if (error) return <h1>An error has occurred.</h1>
    if (isLoading) return <h1>Loading...</h1>

    console.log(data)


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, name: event.target.value})
    }

    const startGame = async () => {
        try {
            if (userData.name.trim() === '' && userData.name.length < 4) return
            const response = await fetch(Server.Host + `user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: userData.name })
            })
            const data: ResponseUser = await response.json()
            setTokenData(data.token)
            navigate('/game')
            //mutate(Server.Host + `users`)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <label htmlFor="exampleDataList" className="form-label">User</label>
            <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to access..." onChange={handleInputChange} maxLength={20} />
            <datalist id="datalistOptions">
                {(data && data?.users.length > 0) ? data.users.map((user, key) => <option key={key} value={user.name} />) : null}
            </datalist>
            <button type="button" className="mt-3 btn btn-primary btn-sm" onClick={startGame}>
                Play
            </button>
        </>
    )
}

export default Home
