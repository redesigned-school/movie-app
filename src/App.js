import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Detail from './components/Detail';
import { useNavigate } from 'react-router-dom'
function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false)
  useEffect(async () => {
    const api = await fetch("https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=20")
    const json = await api.json()
    console.log("아니왜안댐")
    setData(json.data)
    console.log(json.data)
  }, [])

  const onChange = e => setTodo(e.target.value)
  const onSubmit = e => {
    e.preventDefault();
    if (todo == "") return;
    setTodo("");
    setTodos((prev) => [todo, ...prev])
  }

  const onDelete = e => {
    setTodos(todos.filter((t, i) => i !== e))
  }
  const navigate = useNavigate()
  return (
    <div>
      <hr />
      {data.map(anime => {
        const { id, attributes } = anime
        const { titles, description, posterImage, popularityRank } = attributes
        return (
          <div key={id} className="contents movie_card">
            <img src={posterImage.medium} alt="" className="movie_thumbnail" />
            <div className="movie_explain">
              <h3>제목: {titles.ja_jp}</h3>
              <p>랭킹: {popularityRank}</p>
              <div onClick={() => navigate(`/detail/${id}`)} className="btn" style={{ position: "absolute", right: "20px", bottom: "20px" }}>
              detail >
              </div>
              {/* <p>설명: {description}</p> */}
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
