import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News=(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  

  const capitalizeFirstLetter =(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // constructor(props){ //constructor runs first then render then componentdidmount
  //   super(props);
  //   console.log("hello");
  //   this.state={
  //     articles: [],
  //     loading: true,
  //     page: 1,
  //     totalResults:0
  //   }
    

  const updateNews=async()=>{
    props.setProgress(10);
    const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    setPage(parsedData.articles)
   
    props.setProgress(100);
  }
  
  useEffect(() => {
    document.title= `${capitalizeFirstLetter(props.category)}-NewsBoy`;
    updateNews();
    //eslint-disable-next-line
  }, [])
  
  // async componentDidMount(){ //this will run after render function
  //  this.updateNews();
  // }

  // const handlePrevClick = async()=>{
  //   console.log("previous");
    // let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=03bd26106a854d69815a0623d7f5ddd1&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1
    //   // loading: false
    // })
  //   setPage(page-1)
  //   updateNews();
  // }

  // const handleNextClick = async()=>{
  //   console.log("next");
    
    // if (this.state.page + 1>Math.ceil(this.state.totalResults/props.pageSize)){
    // }
    // else{let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=03bd26106a854d69815a0623d7f5ddd1&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page + 1
    //   // loading: false
    // })
  //   setPage(page+1)
  //   updateNews();
  // }

  const fetchMoreData = async() => {
      
   
    const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    };
  


    return (
      <>
        <h2 className='text-center' style={{margin:'35px 0', marginTop:'95px'}}>NewsBoy - Top {capitalizeFirstLetter(props.category)} News HeadLines</h2>
        {loading && <Spinner/>} {/* shows that if this.state.loading true then show spinner else not show */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
        <div className="container">

        <div className="row">
        {articles.map((element)=>{
          return <div className="col md-4" key={element.url}>
        <Newsitem title={element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0, 50):" "} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
        </div>
        })}
        </div>
        </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-end m-4">
        <button disabled={this.state.page<=1}type="button" className="btn btn-secondary btn-dark mx-2" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1>Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-info mx-2" onClick={this.handleNextClick}>Next &rarr;</button>

      </div> */}
      </>
    )
}
News.defaultProps ={
  country: 'in',
  pageSize: 6
}

News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number
}

export default News;