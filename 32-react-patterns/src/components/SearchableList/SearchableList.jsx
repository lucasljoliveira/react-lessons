import { useRef, useState } from "react"

export default function SearchableList({items, itemKeyFunction, children}) {
    const lastChange = useRef();
    const [searchTerm, setSearchTerm] = useState("");

    const searchResults = items.filter(item => JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()))

    function handleChange(event){
        if (lastChange.current) {
            clearTimeout(lastChange.current);
        }
        lastChange.current = setInterval(() => {
            lastChange.current = null; // if timer does expire we set the lastChange to null and change the searchTerm.
            setSearchTerm(event.target.value);
        }, 1000);
    }

    return (
        <div className="searchable-list">
            <input type="search" placeholder="Search" onChange={handleChange}/>
            <ul>
                {searchResults.map((item) => (
                    <li key={itemKeyFunction(item)}>{children(item)}</li>
                ))}
            </ul>
        </div>
    )
}
