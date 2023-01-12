import "../styles/Home.css";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getDatabase, onValue, ref, get, child, limitToFirst, limitToLast, orderbyChild } from 'firebase/database';
import SearchBar from '../components/Search';
import Carousel from 'react-bootstrap/Carousel';
import Social from '../components/Social';


const Home = () => {
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
            window.scrollY >= carouselHeight-55 ? setFilterBar(true) : setFilterBar(false)
        }
        window.addEventListener('scroll', updatePosition);
        updatePosition();
        return () => window.removeEventListener('scroll', updatePosition)
    })

    useEffect(()=> {
        const divs = document.getElementsByClassName('recipe-card');
        for (var p = 0; p < divs.length; p++) {
            divs[p].scrollTop = 0;
            }
    })

    useEffect(() => {
        get(child(dbRef, `/data/post`)).then((snapshot) => {
            if (snapshot.exists()) {
                const temp = [];
                Object.entries(snapshot.val()).map(([key, value]) => {
                    temp.push(value)
                    return
                })
                setData(temp);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    function scrollToTop() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

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
                {data && data.filter(data => data.starcount===5).map((teaserItem, key) => {
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
        <div className="recipes-page">
            { filterBar===true ? <div className="recipe-category-container">
                                <div id="filter-bar" className="recipe-category-bar">
                                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                                <div className="recipe-category-buttons">
                                    <button id="all" onClick={(e) => showCategory(e)}>All</button>
                                    <button id="burgers" onClick={(e) => showCategory(e)}>Burgers</button>
                                    <button id="pasta" onClick={(e) => showCategory(e)}>Pasta</button>
                                    <button id="pastry" onClick={(e) => showCategory(e)}>Pastry</button>
                                    <button id="pizza" onClick={(e) => showCategory(e)}>Pizzas</button>
                                    <button id="sauces" onClick={(e) => showCategory(e)}>Sauces</button>
                                    <button id="salads" onClick={(e) => showCategory(e)}>Salads</button>
                                </div>
                                </div>
                                </div> : <></> }
            { error && <div className="recipe-title">{ error }</div> }
            <div className='recipe-card-container'>
            {filteredResults ? (

            filteredResults && filteredResults.map(([id, data]) => (
                <div className='recipe-wrapper' key={ id }>
                    <div className="recipe-card" >
                        <Link to={`/recipe/${ id }`}>
                            <img className="recipe-img" src={ data.image } alt="..."></img>
                            <div className="recipe-title">{ data.title }</div>
                        </Link>
                        <div className="recipe-description">{ data.preview }</div>
                        <div className="recipe-category">{ data.category }</div>
                    </div>
                </div>
            ))
            ):(
                <>
                    {Object.entries(data).map(([key, value]) => (
                        <div className='recipe-wrapper'key={key}>
                            <div className="recipe-card" >
                                <Link to={`/recipe/${ value.author}/${ value.id }`}>
                                    <img className="recipe-img" src={ value.image } alt="..."></img>
                                    <div className="recipe-title">{ value.title }</div>
                                </Link>
                                    <div className="recipe-description">{ value.preview }</div>
                                    <div className="recipe-category">{ value.category }</div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
        </div>
        <div className='social-bar'>
            <Social />
            <button id="top" onClick={() => scrollToTop()}>Top</button>
        </div>
    </>
    );
}

export default Home;

