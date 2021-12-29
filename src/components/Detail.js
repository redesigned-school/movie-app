import React, {useEffect, useState} from 'react'
import Spinner from './Spinner';
import {useNavigate, useParams} from 'react-router-dom'
export default function Detail() {
    const navigate = useNavigate()
    const {id} = useParams()
  const [loading, setLoading] = useState(true)
    const [data, setData] = useState({});
    useEffect(async () => {
        const api = await fetch(`https://kitsu.io/api/edge/anime/${id}`)
        const json = await api.json()
        console.log(json.data)
        setData(json.data)
        setLoading(false)
    }, [id])

    console.log("parse start")
    const {attributes} = data
    const { description, titles} = attributes || {}
    const {ja_jp = null} = titles || {}
    console.log("parse done")
    return (
        loading ? (<div style={{display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}><Spinner/></div>) : 
        (<div>
            <div style={{display:"flex"}}>
                <span style={{fontWeight: "bold"}}>{ja_jp}</span>
                <button style={{ marginLeft: 'auto' }} onClick={() => navigate(-1)}>close</button>
            </div>
            <div>
                <div>{description}</div>
            </div>
        </div>)
    )
}
