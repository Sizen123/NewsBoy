import React from 'react'

const Newsitem = (props)=> {

    let {title, description, imgUrl, newsUrl, author, date} = props;
    return (
      <div className='my-3'><div className="card" style={{width: '18rem'}}>
      <img src={!imgUrl?"https://i.ytimg.com/vi/3Yg0H5rjvM4/maxresdefault.jpg":imgUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{!title?"title":title}</h5>
        <p className="card-text">{!description?"description":description}</p>
        <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
        <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
      </div>
    </div></div>
    )
  
}

export default Newsitem;