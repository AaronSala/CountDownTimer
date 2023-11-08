
import { useEffect, useState } from 'react';
import './App.css';



function App() {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1)

  const fetchproducts = async()=>{
    const res = await fetch('https://dummyjson.com/products?limit=100')
    const data = await res.json();
    if(data && data.products){
      setProducts(data.products)
    }
  };
  console.log(products)
  useEffect(()=>{
fetchproducts()
  },[])

   const selectedPageHandler=(selectedPage)=>{
    setPage(selectedPage)
   }

  return (
    <div >
    {products.length>0 && (<div className='products'>
     {
      products.slice(page*10-10, page*10).map((prod)=>{
        return (<span className='products__single' key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title}/>
              <span>{prod.title}</span>
              </span>)
      })}
     </div>
  )}
   {
    products.length>0&&
    <div className='pagination'>
    
    <span onClick={()=>selectedPageHandler(page-1)} > prev </span>
    {
     [...Array (products.length/10)].map((_, i)=>{
      return<span 
      className={page===i+1?"pagination__selected":""}
      onClick={()=>selectedPageHandler(i+1)} 
      key={i}>{i+1}
      </span>
     })
    }
    <span 
    onClick={()=>selectedPageHandler(page+1)} 
    > next </span>
    </div>
   }

    </div>
  );
}

export default App;
