

export default function CategoryFilter({categories, setCurrentCategory}) {
    const buttons = categories.map((cat)=>{
       return <li className="category" key={cat.name}>
            <button className="btn btn-category" onClick={()=>individualCategory(cat.name)} style={{backgroundColor: cat.color}}>
              {cat.name}
            </button>
          </li>
    })


    function allCategories(){
        setCurrentCategory('all')
    }
                                                 
    function individualCategory(categoryName){
        setCurrentCategory(categoryName)
    }

  return (
    <div>
      <aside>
      <li className="category"><button className="btn btn-all-categories" onClick={allCategories}>All</button></li>
        <ul>
          {buttons}
        </ul>
      </aside>
    </div>
  );
}
