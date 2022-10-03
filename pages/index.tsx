/**
 * Test 20tab - frontend dev - Novembre 2021
 *
 * Rifattorizzare la pagina apportando tutte le migliorie che si ritiene opportune.
 * Dove possibile motivare le proprie scelte con dei commenti all’interno del codice.
 * L'eventuale aggiunta di test è valutata positivamente.
 */

import type { NextPage } from 'next'
import {useEffect, useReducer, useState} from 'react'
import { useRouter } from 'next/router'
/* externalized types to clean the page and make it accessible from anywhere without rewriting */
import { Todo } from '../types/types'
import {useGetTodos} from "../hooks/queries";


const Home: NextPage = () => {
  const router = useRouter()
  /* refactoring fetch to make it reusable, externalized fetcher and state management in queries file */
  const todos = useGetTodos();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Todo[]>([])

  useEffect(() => {
    setResults(todos);
  }, [todos])

  /* refactoring search function to include results and manage the different cases */
  const searchItems = (searchValue: string) => {
    setSearch(searchValue)
    if (search !== '') {
      const filteredData = todos.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(search.toLowerCase())
      })
      setResults(filteredData)
    }
    else{
      setResults(todos)
    }
  }

  const handleOnClickTodo = (id: number) => {
    router.push('/todo/' + id)
  }

  const handleOnClickDelete = (id: number) => {
    setResults(results.filter(item => item.id !== id))
    /* I don't actually need setTodos here, in a real environment I would update directly the todos via post */
  }

  return (
      <div style={styles.container}>
        <main style={styles.main}>
          <input
              style={styles.search}
              value={search}
              onChange={(e) => searchItems(e.target.value)}
              placeholder='Search todo...'
          />
          {results.map(({ id, title, completed }) => (
              <div
                  key={id}
                  style={styles.item}
              >
                <p>{title}</p>
                {completed ? <p>✅</p> : null}
                <button onClick={() => handleOnClickDelete(id)}>Delete</button>
                <button onClick={() => handleOnClickTodo(id)}>Details</button>
              </div>
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
    border: '1px solid black'
  }
}

export default Home
