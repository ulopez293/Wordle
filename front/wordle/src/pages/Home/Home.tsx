import { useAtom } from 'jotai'
import { userDataAtom } from '../../state/atoms'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useAtom(userDataAtom)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserData(event.target.value)
    }

    const startGame = () => {
        if (userData.trim() === '' && userData.length < 4) return
        navigate('/game')
    }

    return (
        <>
            <label htmlFor="exampleDataList" className="form-label">User</label>
            <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to access..." onChange={handleInputChange} maxLength={20}/>
            <datalist id="datalistOptions">
                <option value="San Francisco" />
                <option value="New York" />
                <option value="Seattle" />
                <option value="Los Angeles" />
                <option value="Chicago" />
            </datalist>
            <button type="button" className="mt-3 btn btn-primary btn-sm" onClick={startGame}>
                Play
            </button>
        </>
    )
}

export default Home
