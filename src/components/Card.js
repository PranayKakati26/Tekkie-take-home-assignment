import React from 'react';
import { Fragment } from "react";
import "./Card.css";
const Card = (props) => {

    // console.log(props.shipImage.name);
   
return (
    <Fragment>
<div className="wrapper">
    <article className="country">
        
          <img className="country__img" src={props.shipImage}/>
          <div className="country__data">
            <h3 className="country__name"><span className="shipName">Ship name :</span> &nbsp;

            <span className="shipNameValue">"{props.shipName}"</span>
            </h3>
           
            <h4 className="country__port"><span className="portName">Port Name:</span> &nbsp;
            <span className="portNameValue">
                "{props.shipPort}""
            </span></h4>
            
           
          </div>
         
        </article>
        </div>
    </Fragment>
)
}

export default Card;