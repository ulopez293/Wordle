import useSWR from "swr"
import { Server } from "../../enums/Server"
import { User } from "../../interfaces/User"
import { Word } from "../../interfaces/Word"

const fetcher = (url: string) => fetch(url).then((res) => res.json())


const TableUsers = () => {
    const { data, error, isLoading } = useSWR<{ users: User[] }>(Server.Host + `users`, fetcher)
    if (error) return <h1>An error has occurred.</h1>
    if (isLoading) return <h1>Loading...</h1>
    console.log(data)

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#rank</th>
                    <th scope="col">Name</th>
                    <th scope="col">Wins</th>
                    <th scope="col">Games</th>
                </tr>
            </thead>
            <tbody>
                {(data && data.users.length > 0) ?
                    data.users
                        .sort((a, b) => b.wins - a.wins)
                        .slice(0, 10)
                        .map((user, key) => (
                            <tr key={key}>
                                <th scope="row">{key + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.wins}</td>
                                <td>{user.games}</td>
                            </tr>
                        ))
                    : null}
            </tbody>
        </table>
    )
}

const TableWords = () => {
    const { data, error, isLoading } = useSWR<{ words: Word[] }>(Server.Host + `words`, fetcher)
    if (error) return <h1>An error has occurred.</h1>
    if (isLoading) return <h1>Loading...</h1>
    console.log(data)

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Most 10 accurate words</th>
                </tr>
            </thead>
            <tbody>
                {(data && data?.words.length > 0) ? data.words
                    .sort((a, b) => b.readywitted - a.readywitted)
                    .slice(0, 10)
                    .map((word, key) => {
                        return (
                            <tr key={key}>
                                <th scope="row">{key + 1} - {word.word} </th>
                            </tr>
                        )
                    }) : null}
            </tbody>
        </table>
    )
}

const Score = () => <><TableUsers /><TableWords /></>

export default Score
