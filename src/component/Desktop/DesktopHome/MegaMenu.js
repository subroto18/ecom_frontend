import React, {PureComponent,Fragment} from 'react';
import Col from "react-bootstrap/Col";
import Api from "../../../ClientApi/Api";
import ContentLoader from "react-content-loader";
import {megaMenu} from "../../../services/actions/commonAction";
import {connect} from "react-redux";
import {productSearch} from "../../../services/actions/filterAction";
import Link from "next/link";
import Photo from "../../CommonScreen/Image/Photo";
class MegaMenu extends PureComponent {
    constructor() {
        super();
        this.state = {
            dimensions: null,
            data:[],
            loading:true,
            menu:[],
            loadingMenu:[]
        };
    }
  async componentDidMount() {
        this.setState({
            dimensions:  this.container.offsetWidth
        });
        
        try{
            await Api().get('getCategories').then(res=>{
                this.props.megaMenu(res.data);
            }) 
        }catch (e) {

        }

      

    }

    onClickMenu(slug){
        const data = {
            category:slug
        }
        this.props.productSearch(data)
    }
    render() {

          const menu = this.props.megaMenuData.map((pc,i)=>{
          return <Fragment>
                   <li key={i}>
                      <Link  href={`product/category/${pc.slug}`} className="catLink" >

                          <Photo
                              src={pc.icon!==null?`${this.props.backendApi+pc.icon}`:"/blank.jpg"}
                              blurDataURL={pc.icon!==null?`${this.props.backendApi+pc.icon}`:"/blank.jpg"}
                              class="cat-img"
                              menu={true}
                          />
                          <span> {pc.cat.length > 20 ? pc.cat.substring(0, 20) + "..." :  pc.cat}</span>
                          {pc.subCat.length>0  &&
                              <i className="far fa-angle-double-right arrowRight"/>
                          }

                     </Link>
                       {pc.subCat.length>0  &&
                          <div className="subCat" >
                           <div className="row">
                               {pc.subCat.map(ps=>{
                                 return  <Col xl={4} lg={4} md={4}>
                                       <div className="subCatList">
                                           <h2 className="subCatTitle">
                                               <Link
                                                   onClick={()=>this.onClickMenu(ps.slug)}
                                                   href={{
                                                       pathname: '/product/category/'+ps.slug,
                                                   }}
                                               >{ps.subCat}</Link>
                                           </h2>
                                           <hr className="subCatTitleLink" />
                                           <ul>
                                               {pc.subSubCat.map(pss=>{
                                                   if(pss.subCat===ps.subCat){
                                                       return  <li> <Link
                                                           onClick={()=>this.onClickMenu(pss.slug)}
                                                           href={{
                                                               pathname: '/product/category/'+pss.slug,
                                                           }}
                                                           className="subCatLink">{pss.subSubCat}</Link></li>
                                                   }
                                               })
                                               }
                                           </ul>
                                       </div>
                                   </Col>
                               })}
                           </div>
                       </div>
                       }
              </li>
                 </Fragment>
       })
        const MyLoader = () => (
            <ContentLoader>
                <rect x="0" y="0" rx="5" ry="5" width="100" height="100" />
            </ContentLoader>
        );
        const placeholder = (
              <Fragment>
                  { Array.apply(null, { length: 10 }).map((e, i) => (
                          <li key={i} className="megaMenu-li"><MyLoader/></li>
                      ))
                  }
            </Fragment>
        );
        return (
                <Fragment>
                        <div className="megaMenu"  ref={(el) => (this.container = el)}>
                            <div className="category">
                                <h1 className="category-title"> <i className="far fa-bars categoryIcon"/>
                                    <span className="category-title">Categories</span>  <span className="seeAllCat">
                                    <Link  href="/product/all-categories"> SEE ALL <i className="far fa-angle-double-right seeAllIcon"/> </Link>
                                </span> </h1>
                            </div>
                            <div className="MegaMenuList">
                                <ul>
                                    {this.props.megaMenuLoading ?
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
    megaMenu,
    productSearch
};

function mapStateToProps(state) {
    const megaMenuData = state.commonReducer.megaMenuData
    const megaMenuLoading = state.commonReducer.megaMenuLoading;
    const backendApi = state.starterReducer.backendApi
    return {
        megaMenuData,
        backendApi,
        megaMenuLoading
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MegaMenu);
