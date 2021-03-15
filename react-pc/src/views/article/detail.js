import React from "react";
export default class ArticleDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            
          };
    }
    render() {
        return(
            <></>
        )
        
    }

    componentDidMount(){
      console.log(this.props.match.params.id);
    }
}
