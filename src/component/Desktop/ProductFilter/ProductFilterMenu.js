import React, {PureComponent,Fragment} from 'react';
import Api from "../../../ClientApi/Api";
import ContentLoader from "react-content-loader";
import {connect} from "react-redux";
import {searchProductFetch} from "../../../services/actions/filterAction";
import Link from "next/link";
import Photo from "../../CommonScreen/Image/Photo";
class ProductFilterMenu extends PureComponent {
    constructor() {
        super();
        this.state=  {
            data:[],
            loading:true,
        }
        this.onClickMenu = this.onClickMenu.bind(this)
    }
    componentDidMount() {
        Api().get('getCategories').then(res=>{
            this.setState({
                data:res.data,
                loading:false
            })
        }).catch(error=>{
        })
    }
    onClickMenu(slug){
        const data = {
            category:slug
        }
        this.props.searchProductFetch(data)
    }

    render() {
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100" />
            </ContentLoader>
        );
        const placeholder = (
            <Fragment>
                <li className="megaMenu-li"><MyLoader/></li>
                <li className="megaMenu-li"><MyLoader/></li>
                <li className="megaMenu-li"><MyLoader/></li>
                <li className="megaMenu-li"><MyLoader/></li>
                <li className="megaMenu-li"><MyLoader/></li>
                <li className="megaMenu-li"><MyLoader/></li>
                <li className="megaMenu-li"><MyLoader/></li>
                <li className="megaMenu-li"><MyLoader/></li>
                <li className="megaMenu-li"><MyLoader/></li>
                <li className="megaMenu-li"><MyLoader/></li>
            </Fragment>
        );
        const menu = this.state.data.map((pc,i)=>{
            return <Fragment>
                <li key={i}><Link
                    onClick={()=>this.onClickMenu(pc.slug)}
                    href={{
                        pathname: '/product/category/'+pc.slug,
                    }}
                    className="catLink" >
                    <Photo
                        src={pc.icon!==null?`${this.props.backendApi+pc.icon}`:"/blank.jpg"}
                        blurDataURL={pc.icon!==null?`${this.props.backendApi+pc.icon}`:"/blank.jpg"}
                        class="cat-img"
                        menu={true}
                    />
                    <span> {pc.cat.length > 20 ? pc.cat.substring(0, 20) + "..." :  pc.cat}</span>
                </Link></li>
            </Fragment>
        })
        return (
            <Fragment>
                <div className="ProductSearchMenu mb-5">
                    <div className="category"><h6><i className="far fa-bars categoryIcon"></i> <span
                        className="category-title">Categories</span> <span className="seeAllCat"><Link href="/product/all-categories"> SEE ALL <i
                        className="far fa-angle-double-right seeAllIcon"></i> </Link></span></h6>
                    </div>
                    <div className="MegaMenuList">
                        <ul>
                            {this.state.loading ?
                                <Fragment>
                                    {placeholder}
                                </Fragment> :
                                <Fragment>
                                    {menu}
                                </Fragment>
                            }
                        </ul>
                    </div>
                </div>
            </Fragment>
        );
    }
}


const mapDispatchToProps = {
    searchProductFetch
};

function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi
    return {
        backendApi
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductFilterMenu);

