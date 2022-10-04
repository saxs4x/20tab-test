/**
 * Test 20tab - frontend dev - Novembre 2021
 *
 * Rifattorizzare la pagina apportando tutte le migliorie che si ritiene opportune.
 * Dove possibile motivare le proprie scelte con dei commenti all’interno del codice.
 * L'eventuale aggiunta di test è valutata positivamente.
 */

import type {NextPage} from 'next'
import React, {useEffect, useReducer, useState} from 'react'
import {useRouter} from 'next/router'
/* externalized types to clean the page and make it accessible from anywhere without rewriting */
import {Todo} from '../types/types'
import {useFetch} from "../hooks/useFetch";
import ListCard from "../components/ListCard";

const url = 'https://jsonplaceholder.typicode.com/todos';

const Home: NextPage = () => {
    const router = useRouter()
    /* made custom hook to fetch data */
    const {data, loading, error} = useFetch(url);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<Todo[]>([])

    useEffect(() => {
        setResults(data);
    }, [data])

    /* refactoring search function to include results and manage the different cases */
    const searchItems = (searchValue: string) => {
        setSearch(searchValue)
        if (search !== '') {
            const filteredData = data.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(search.toLowerCase())
            })
            setResults(filteredData)
        } else {
            setResults(data)
        }
    }

    const handleOnClickTodo = (id: number) => {
        router.push('/todo/' + id)
    }

    const handleOnClickDelete = (id: number) => {
        console.log(id)
        console.log('delete');
        setResults(results.filter(item => item.id !== id))
        console.log(results)
        /* I don't actually need setTodos here, in a real environment I would update directly the todos via post */
    }

    return (
        <div style={styles.container}>
            <main style={styles.main as React.CSSProperties}>
                <input
                    style={styles.search}
                    value={search}
                    onChange={(e) => searchItems(e.target.value)}
                    placeholder='Search todo...'
                />
                {results.map(({id, title, completed}) => (

                    <ListCard
                        id={id}
                        key={id}
                        title={title}
                        completed={completed}
                        onDelete={handleOnClickDelete}
                        onConfirm={handleOnClickTodo}
                    />
                ))}
            </main>
        </div>
    )
}

const styles = {
    container: {
        padding: '0.5rem'
    },
    main: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    item: {
        width: '100%',
        padding: '0.5rem',
        border: '1px solid whitesmoke',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    search: {
        padding: '0.5rem',
        marginBottom: '0.5rem',
        width: '100%',
        color: 'black',
        border: '1px solid black',
    }
}

export default Home
