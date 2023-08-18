


export default function Header({displayForm, showForm}){
    return (
        <div>
        <header className="header">
            <div className="logo">
                <img src="logo.png"/>
                <h1>Today I Learnt</h1>
            </div>
        <button onClick={displayForm} className="btn btn-large btn-open">{showForm ? 'Close' : 'Share a Fact'}</button>
    </header></div>
    )
}