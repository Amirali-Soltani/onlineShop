import React, { Component } from 'react';

class Not__found extends Component {
    state = {  }
    render() { 
        return ( 
            <img
            src={require("./../../assets/banners/not.jpg")}
            style={{width: "1453px",height:"700px"}} 
            alt="logo"
          />
         );
    }
}
 
export default Not__found;