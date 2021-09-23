import React, { useEffect, useRef } from "react";
import "./styles.css";
import gql from "graphql-tag";
import request from "./utils/request";
import Card from "./components/Card";
import { useState } from "react";
import "./components/Card.css";
import {
  Formik,
  Form,
  Field,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
export default function App() {
  const [shipData, setShipData] = useState("");
  const [shipName, setShipName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [checkAll , setCheckAll] = useState(true);
  
  const inputRef = useRef();

  const fetchShips = async () => {
    const response = await request(gql`
      {
        ships {
          name
          home_port
          image
        }
      }
    `);
    console.log(response.data.ships);
    setShipData(response.data.ships);
  };

  useEffect(() => {
    fetchShips();
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    setShipName(inputRef.current.value);
    setIsSubmitted(true);
  };

  let shipNameArray = [];
  for (let i in shipData) {
    
    shipNameArray.push(shipData[i].name)
  }


// if(shipNameArray.includes(shipName)){
//   console.log('success');
//   setMatched(true);
// } else {
//   console.log('failure');
 
// }

const checkAllHandler = () => {
  setCheckAll(true);
  setIsSubmitted(false);
}


  const SearchRenderedList = Object.values(shipData)
    .filter((state) => {
      return state.name == shipName;
    })
    .map((ship) => (
      <Card
        shipImage={ship.image}
        shipName={ship.name}
        shipPort={ship.home_port}
      />
    ));

  const renderedList = Object.values(shipData).map((ship) => (
    <Card
      shipImage={ship.image}
      shipName={ship.name}
      shipPort={ship.home_port}
    />
  ));


  const finalRender = isSubmitted ? (shipNameArray.includes(shipName) ? SearchRenderedList : <p>Sorry, No Match Found</p>) : (checkAll && renderedList);
  return (
    <div className="App">
      <div className="header">
        <h1>SpaceX</h1>

        <form onSubmit={submitHandler}>
          <FormControl>
            <Input
              type="text"
              name="shipname"
              placeholder="Enter a Ship name"
              fontSize="25px"
              className="nameInput"
              ref={inputRef}

            ></Input>
          </FormControl>
          <Button
            width="full"
            className="form__submit__btn1"
            variant="solid"
            type="submit"
          >
            Search
          </Button>

          <Button
            width="full"
            className="form__submit__btn1"
            variant="solid"
            onClick={checkAllHandler}
            >
            Check All Ships
          </Button>
        </form>
      </div>
      {/* {isSubmitted ? SearchRenderedList : renderedList} */}
      {finalRender}
    </div>
  );
}
