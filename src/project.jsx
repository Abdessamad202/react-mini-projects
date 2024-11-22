import  {useState,useEffect} from "react";
// import {createRoot} from "react-dom/client";

export default function Projects() {
    const [categories, setCategories] = useState([]); // Category state
    const [products, setProducts] = useState([]); // Products state
    const [isActive, setIsActive] = useState("")
    const [search, setSearch] = useState("")
    const [dataByCat, setDataByCat] = useState(products)
    // Fetch products from API
    async function productsFetch() {
        return await fetch('https://fakestoreapi.com/products').then(result => result.json());
    }

    // Fetch products once when the component mounts
    useEffect(() => {
        productsFetch().then(data => {
            // Only update state if `products` is empty
            if (products.length === 0) {
                setProducts(data);
                // Directly set fetched data
                setDataByCat(data)
                const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
                setCategories(uniqueCategories);
            }
        });

    }, []); // Empty dependency array ensures this runs once on mount
    const handleClick = (e) => {
        e.target.parentElement.parentElement.querySelectorAll(".col-3 button").forEach((el) => {el.style.fontWeight = ""})
        // Make all sibling elements' font weight normal, and bold only the clicked element
        e.target.style.fontWeight = "bold";
        // Filter products based on the clicked element's value
        setDataByCat(products.filter(product => product.category === e.target.value));
    };

    const handleChange = (e) => {
        setDataByCat(products.filter(product => product.title.toLowerCase().includes(e.target.value.toLowerCase())));
        document.querySelectorAll('.col-3 button').forEach((el) => {el.style.fontWeight = ""})
    }
    const handleSearch = () => {
    }

    // Log products whenever they change
     // Runs whenever `products` changes
    return (
        <>
            <div className={"container"}>
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" onChange={handleChange} type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-success" type="button" onClick={handleSearch}>Search</button>
                        </form>
                    </div>
                </nav>
                <hr/>
                <section className="main-section">
                    <h2 className="main-section-title">Categories</h2>
                </section>
                <div className="row rounded-1">
                    {categories.map((category, index) => (
                        <div className="col-3 text-center  bg-dark  p-2" key={index}  >
                            <button className={"bg-transparent border-0 text-white"} onClick={handleClick} value={category}>{category}</button>
                        </div>
                    ))}
                </div>

                <section className="main-section">
                    <h2 className="main-section-title">Products :</h2>
                </section>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">Category</th>
                        <th scope="col">Image</th>
                        <th scope="col">Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataByCat.map((product, index) => (
                        <>
                            <tr>
                                <td key={index}>{product.id}</td>
                                <td key={index}>{product.title}</td>
                                <td key={index}>{product.price}</td>
                                <td key={index}>{product.description}</td>
                                <td key={index}>{product.category}</td>
                                <td key={index}><img className={"w-100"} src={product.image}/></td>
                                <td key={index}>{product.rating.rate}/5</td>
                            </tr>
                        </>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}