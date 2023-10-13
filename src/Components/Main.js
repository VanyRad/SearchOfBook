import react, { useState } from "react"
import Card from "./Card";
import axios from "axios";

const Main=()=>{
    const[search,setSearch]=useState("");
    const[bookData,setData]=useState([]);
    const [sortCriteria, setSortCriteria] = useState("");

    const searchBook=(evt)=>{
        if(evt.key==="Enter")
        {
            axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'&key=AIzaSyA3RpjQIuHs_mk_Z0UpvkbGBAJ4lxLd5IM'+'&maxResults=40')
            .then(res=>setData(res.data.items))
            .catch(err=>console.log(err))
        }
    }
        const sortBooks = (criteria) => {
        if (criteria === "title") {
        setData([...bookData].sort((a, b) => a.volumeInfo.title.localeCompare(b.volumeInfo.title)));
        }
        
      };
       




    return(
        <>
        <div className="header">
            <div className="row1">
                <h1>Найдите вашу любимую книгу</h1>
            </div>

            <div className="row2">
                <h2>Поиск книг</h2>
                <div className="search">
                    <input type="text" placeholder="Введите название книги"
                    value={search} onChange={e=>setSearch(e.target.value)}
                    onKeyPress={searchBook}/>
                    <button><i className="fas fa-search"></i></button>
                </div>
                <img src="./images/bg2.png" alt=""/>
                <div className="sort-and-filter">
            {/* Выбор критерия сортировки */}
            <select
              value={sortCriteria}
              onChange={(e) => {
                setSortCriteria(e.target.value);
                sortBooks(e.target.value);
              }}
            >
              <option value="">Сортировать по...</option>
              <option value="title">Заголовку</option>
            </select>
            </div>
            </div>
        </div>

            <div className="container">
              {
                <Card book={bookData}/>
              }
               
        </div>
        </>
    )
}
export default Main;