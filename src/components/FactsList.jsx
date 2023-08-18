

export default function FactsList({facts}){
    if(facts.length === 0){
        return <p className="message">No facts for this category yet, create the first one 😉</p>
    }
    return(
            <section>
                <ul className="facts-list">
                {facts}
                </ul>
            </section>
    )
}