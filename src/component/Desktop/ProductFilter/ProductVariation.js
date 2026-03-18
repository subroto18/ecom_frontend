import React, {PureComponent, Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {connect} from "react-redux";
import {searchProductSort} from "../../../services/actions/filterAction";
class ProductVariation extends PureComponent {
    constructor() {
        super();
        this.state =  {
            data:[],
            variation:[],
            variationNameArray:[],
            variationName : ""
        }
    }
    onSelect(variation,attribute,e){
        let variationNameArray = this.state.variationNameArray;
        if(variationNameArray.length>0){
            if(variationNameArray.indexOf(variation)<=-1){
                variationNameArray.push(variation);
                this.setState({
                    variationNameArray:variationNameArray
                })
            }
        }else{
            variationNameArray.push(variation);
            this.setState({
                variationNameArray:variationNameArray
            })
        }
        this.setState({
            variationName:variation
        })
        let pushData = false
        let exitsDataPush = false
        let v = this.props.variationSorting;
        if(v.length>0){
            v.map((pd,i)=>{
                if(pd.variation===variation){
                        const index =  pd.attribute.indexOf(attribute);
                        if (index > -1) {
                                v[i].attribute.splice(index, 1);
                                if (pd.attribute.length === 0) {
                                    v.splice(i, 1);
                                }
                        }else{
                            if(exitsDataPush===false){
                                v[i]['attribute'].push(attribute);
                            }
                            exitsDataPush = true
                        }
                }else{
                    let variationExist =  false;
                       v.map(check=>{
                           if(check.variation===variation){
                               variationExist = true
                           }
                       })
                    if(variationExist===false){
                        if(pushData===false){
                            v.push({
                                variation:variation,
                                attribute:[attribute]
                            })
                        }
                        pushData = true
                    }
                }
            })
        }else{
            v.push({
                variation:variation,
                attribute:[attribute]
            })
        }
        this.setState({
            variation:v
        })
        let btnId = e.target.id;
        let targetedId = document.getElementById(btnId);
        targetedId.classList.toggle('newClassOnClick');
        const data = {
            variation:v
        }
        this.props.searchProductSort(data);
    }

    render() {
        if(this.props.clearSortingData){
         let    elements = document.getElementsByClassName('newClassOnClick')
            for(elements of elements){
                elements.classList.remove('newClassOnClick')
            }
        }
        return (
            <Fragment>
                <div className="productSearch mb-5">
                    <Row>
                        <Col>
                            {this.props.searchVariation!==undefined &&
                                <Fragment>
                                    {this.props.searchVariation.map(pd=>{
                                        return <Fragment>
                                                <div className='colorRange'>
                                                <div className="productSearchTitle"><h6>{pd.variation}</h6></div>
                                                <div className="variationBox" id="variationBox">
                                                <Fragment>
                                                    {pd.attributes.map(attr=>{
                                                        return     <Fragment>
                                                                     <span  id={pd.variation+"_"+attr} onClick={e=>this.onSelect(pd.variation,attr,e)} className="box  variationBtnBox" >{attr}</span>
                                                                   </Fragment>
                                                    })
                                                    }
                                                </Fragment>
                                                </div>
                                                </div>
                                        </Fragment>
                                    })}
                                </Fragment>
                            }
                        </Col>
                    </Row>
                </div>
            </Fragment>
        );
    }
}

const mapDispatchToProps = {
    searchProductSort
};

function mapStateToProps(state) {
    const variationSorting = state.filterReducer.variationSorting;
    const searchVariation = state.filterReducer.searchVariation;
    const clearSortingData = state.filterReducer.clearSortingData
    return {
        variationSorting,
        searchVariation,
        clearSortingData
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductVariation);





