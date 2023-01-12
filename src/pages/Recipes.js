import "../styles/Recipes.css"
import "../styles/Home.css";
import { useState, useEffect } from 'react';
import useFetch from "../useFetch"
import { Link } from "react-router-dom";
import SearchBar from '../components/Search';
import { getDatabase, onValue, ref, get, child, limitToFirst, limitToLast, orderbyChild } from 'firebase/database';
import Carousel from 'react-bootstrap/Carousel';

const Recipes = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [index, setIndex] = useState(0);
    const [filterBar, setFilterBar] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    let [filteredResults, setFilteredResults] = useState(null);
    const dbRef = ref(getDatabase());
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(()=> {
        const carouselHeight = document.getElementById('carousel').clientHeight;
        function updatePosition() {
            window.scrollY >= carouselHeight-55 ? setFilterBar(true): setFilterBar(false)
        }
        window.addEventListener('scroll', updatePosition);
        updatePosition();
        return () => window.removeEventListener('scroll', updatePosition)
    })

    useEffect(() => {
        get(child(dbRef, `/data`)).then((snapshot) => {
            if (snapshot.exists()) {
                const temp = [];
                Object.entries(snapshot.val()).map(([key, value]) => {
                    return Object.entries(value).map(([k, v]) => {
                        if (k !== "userdata") {
                            v['id'] = k;
                            temp.push(v);
                        }
                    })
                })
                setData(temp);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    function showCategory(e) {
        var catId = e.target.id;
        var cat
        if (catId==='all') {
            cat = Object.entries(data)
        } else {
            cat = Object.entries(data).filter(([id, data]) => data.category === catId);
        }
        setFilteredResults(cat);
    }

    if (searchQuery) {
        const searchData = (data, query) => {
            if (query) {
                return Object.entries(data).filter(([id, data]) => {
                    const postTitle = data.title.toLowerCase();
                    return postTitle.includes(query.toLowerCase());
                });
            }
        };
        filteredResults = searchData(data, searchQuery);
    }

    return (
    <>
        <div id="carousel" className="container">
            <Carousel activeIndex={index} onSelect={handleSelect}>
                { error && <div>{ error }</div> }
                {data && data.map((teaserItem, key) => {
                    return (
                        <Carousel.Item key={teaserItem.id}>
                              <div className="teaser">
                                <img src={teaserItem.image}></img>
                                <div className="teaserTitle">{teaserItem.title}</div>
                                <div className="teaserDescription">{teaserItem.description}</div>
                                <div className="teaserCategory">{teaserItem.category}</div>
                              </div>
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </div>
        <div className="recipes">
            { filterBar===true ? <div id="filter-bar" className="recipe-category-btn">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <button id="all" onClick={(e) => showCategory(e)}>All</button>
                <button id="burgers" onClick={(e) => showCategory(e)}>Burgers</button>
                <button id="pizza" onClick={(e) => showCategory(e)}>Pizzas</button>
                <button id="sauces" onClick={(e) => showCategory(e)}>Sauces</button>
                <button id="bread" onClick={(e) => showCategory(e)}>Bread</button>
            </div> : <></> }
            { error && <div className="recipe-title">{ error }</div> }
            {/* isPending && <div className="recipe-title">Loading...</div> */}
            {filteredResults ? (

            filteredResults && filteredResults.map(([id, data]) => (
                <div className="recipe-preview" key={ id }>
                    <Link to={`/recipe/${ id }`}>
                        <div className="recipe-title">{ data.title }</div>
                    </Link>
                    <div className="recipe-description">{ data.preview }</div>
                    <div className="recipe-category">{ data.category }</div>
                </div>
            ))

            ):(

                <>
                    {Object.entries(data).map(([key, value]) => (
                        <div className="recipe-preview" key={key}>
                            <Link to={`/recipe/${ value.author}/${ value.id }`}>
                                <div className="recipe-title">{ value.title }</div>
                            </Link>
                                <div className="recipe-description">{ value.directions }</div>
                                <div className="recipe-category">{ value.category }</div>
                        </div>
                    ))}
                </>
            )}

        </div>
        </>
    );
}

export default Recipes;

