import * as React from 'react';

interface ChangeProps {
    id: string,
}
const ChangeItems : any = (id: string) => {
    switch(id) {
        case "#1":
        return (
            <input type="text"/>
        )
        case "#2": 
        return(
            <button>Hello</button>
        )
        case "#3":
        return(
            <div>
                 <input type="radio" />
            <input type="radio" />
            <input type="radio" />
            </div>
           
        )
    }
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