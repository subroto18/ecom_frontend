import React, {Component,Fragment} from 'react';
import Api from "../../../ClientApi/Api";
import ReactHtmlParser from "react-html-parser";
import ReactPlaceholder from "react-placeholder";
class ReplacePolicyPart extends Component {
    constructor() {
        super();
        this.state = {
            content:"",
            loading:false
        }
    }
    componentDidMount() {
        Api().get('getReplacePolicy').then(res=>{
            this.setState({
                loading:true,
                content:res.data
            })
        }).catch(error=>{
        })
    }
    render() {
        return (
            <Fragment>
                <ReactPlaceholder  type='text' ready={this.state.loading} row={2} color='#E0E0E0' >
                    <div className="policy-content">{ ReactHtmlParser(this.state.content) }</div>
                </ReactPlaceholder>
            </Fragment>
        );
    }
}
export default ReplacePolicyPart;