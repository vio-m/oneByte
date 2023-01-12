import "../styles/Search.css"

const SearchBar = ({ searchQuery, setSearchQuery}) => {

    const handleSubmit = (e) => {
        console.log('handleSubmit ran');
        e.preventDefault();
        setSearchQuery('')
    };

    return (
        <div  className="searchbar">
            <form onSubmit={handleSubmit} method="GET">

                <label htmlFor="header-search">
                    <span className="visually-hidden">Search</span>
                </label>

                <input
                    value={searchQuery}
                    onInput={e => setSearchQuery(e.target.value)}
                    type="text"
                    id="header-search"
                    placeholder="Search for recipe"
                    name="s"
                />
                <button onClick={handleSubmit}>🔍</button>

            </form>
        </div>
    )
};

export default SearchBar;

