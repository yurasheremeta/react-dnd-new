import * as React from 'react';
import styled from 'styled-components';


interface ChangeProps {
    id: string,
  
}
const ChangeItems : any = (id: string) => {
  
    
    // switch(id) {
    //     case "a":
        
    //     return (
    //         <input type="text" id="text" />
            
    //     )
    //     case "b": 
    //     return(
    //         <textarea value="dedjed"/>
    //     )
    //     case "c":
    //     return(
    //         <div>
    //              <input type="radio" />
    //         <input type="radio" />
    //         <input type="radio" />
    //         </div>
           
    //     )
    // }
}
const Change: React.SFC<ChangeProps> = ({
    id
}) => (
    <div>
       {
              
           ChangeItems(id)
           
       }
    </div>
)

export default Change;