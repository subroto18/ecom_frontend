import React, {Component,Fragment} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Select from "react-select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Api from "../../../ClientApi/Api";
import {connect} from "react-redux";
import {selectedMedia,mediaLimit,showMediaFile} from "../../../services/actions/mediaAction";
import {alert} from "../../../services/common";
import Photo from "../Image/Photo";
import UploadPhoto from "./UploadPhoto";
import UploadZip from "./UploadZip";

class MediaFile extends Component {
    constructor() {
        super();
        this.state = {
            model:false,
            mediaSort: ['Oldest', 'Newest', 'Low to high', 'High to low'],
            showAllMedia: [], 
            loadingStatus: true,  
            searchStatus: true,
            selectedMedia: [], 
            selectedMediaLoading:false,
            showMediaFile:[],
            checked: false,
            totalMedia: Array.from({length: []})
        }
        this.onShow  = this.onShow.bind(this);
        this.onHide  = this.onHide.bind(this);
        this.onSelect  = this.onSelect.bind(this);
        this.onClear  = this.onClear.bind(this);
        this.onSelectedFiles  = this.onSelectedFiles.bind(this);
        this.onChecked = this.onChecked.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getAllMedia = this.getAllMedia.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.onSelectFile = this.onSelectFile.bind(this);
    }
    onShow(){
        this.setState({
            model:true
        })
        this.getAllMedia();
    }
    onHide(){
        let tempSelected =  this.props.dynamicData['selected_for_'+this.props.type]!==undefined ? this.props.dynamicData['selected_for_'+this.props.type] :[] ;
        let selected = this.props.dynamicData['show_media_for_'+this.props.type]!==undefined ? this.props.dynamicData['show_media_for_'+this.props.type] :[]
        let tempSelectedId = tempSelected.map(id=>{
            return id;
        })
        const SelectedId =   selected.map(id=>{
            return ""+id.id+""
        })
        if(tempSelectedId !== SelectedId){
            this.setState({
                selectedMedia:SelectedId
            })
            this.props.selectedMedia({
                photoId:SelectedId,
                type:this.props.type
            })
        }else{
            this.props.selectedMedia({
                photoId:SelectedId,
                type:this.props.type
            })
        }
        if(selected.length>0){
            this.setState({
                model:false,
            })
        }else{
            this.setState({
                model:false,
            })
            this.props.showMediaFile({
                showFile:[],
                type:this.props.type
            });
        }
    }
    onSelect(e){
        this.props.selectedMedia({
            photoId:e.selectedMedia,
            type:this.props.type
        })
    }
    onClear(){
        const selectedMedia =  this.props.dynamicData['selected_for_'+this.props.type];
        if(selectedMedia!==undefined){
            selectedMedia.map(id => {
                const className =  document.getElementById(id.toString());
                className.classList.remove('selected');
            });
        }
        this.props.mediaLimit({
            limit:"",
            type:this.props.type
        })
        this.props.selectedMedia({
            photoId:undefined,
            type:this.props.type
        })
        this.setState({
            showMediaFile:[]
        })
    }
    getAllMedia(){
        this.setState({
            showAllMedia:[]
        })
        let data  =  {
            fileType:this.props.fileType
        }
        Api().post('getAllFiles',data).then(response=>{
            let showAllMedia = this.state.showAllMedia.concat(response.data);
            this.setState({
                showAllMedia:showAllMedia,
                loadingStatus:false
            })
            this.onSelectFileBorder();
        }).catch(error=>{
        });
    }
    handleChange(selectedOption){
        if(selectedOption.value === 'newest'){
            this.getLatestFile();
        }
        else if(selectedOption.value === 'oldest'){
            this.getOldestFile();
        }
    };
    getOldestFile(){
        this.setState({ loadingStatus: true });
        let data = {
            fileType:this.props.fileType
        }
        Api().post('getOldestFiles',data).then(response=>{
            this.setState({ showAllMedia: response.data, loadingStatus:false});
            this.onSelectFileBorder();
        }).catch(error=>{
        });
    }
    getLatestFile(){
        this.setState({ loadingStatus: true });
        let data = {
            fileType:this.props.fileType
        }
        Api().post('getLatestFiles',data).then(response=>{
            this.setState({ showAllMedia: response.data, loadingStatus:false});
            this.onSelectFileBorder();
        }).catch(error=>{
        });
    }


    onSelectFile(e){

        let selectedMedia =  this.props.dynamicData['selected_for_'+this.props.type];
        let selectedMediaLimit = this.props.dynamicData['selected_limit_for_'+this.props.type];


        if(selectedMediaLimit === 'exceed') {
            let selectData = this.props.dynamicData['selected_for_'+this.props.type]
            let index = selectData.indexOf(e);
            if (index > -1) {
                selectData.splice(index, 1);
                this.props.selectedMedia({
                    photoId:selectData,
                    type:this.props.type
                })
            }
            const selectClass = document.getElementById(e);
            selectClass.classList.remove('selected') ;
            if(this.props.dynamicData['selected_for_'+this.props.type].length === this.props.limit){
                alert('warning',"Limit has  exceeded!");
            }
        }else{
            this.props.selectedMedia({
                photoId:[e],
                type:this.props.type
            })
            let selectData = this.props.dynamicData['selected_for_'+this.props.type]
            if(selectData!==undefined){
                if (selectData.indexOf(e) === -1) {
                    selectData.push(e);
                    this.props.selectedMedia({
                        photoId:selectData,
                        type:this.props.type
                    })
                    if (this.props.dynamicData['selected_for_'+this.props.type].length > this.props.limit-1) {
                        this.props.mediaLimit({limit:'exceed',type:this.props.type})
                    }
                } else {
                    let index = selectData.indexOf(e);
                    if (index > -1) {
                        selectData.splice(index, 1);
                        this.props.selectedMedia({
                            photoId:selectData,
                            type:this.props.type
                        })
                    }
                }
            }else{
                this.props.selectedMedia({
                    photoId:[e],
                    type:this.props.type
                })
                if (1 > this.props.limit-1) {
                    this.props.mediaLimit({limit:'exceed',type:this.props.type})
                }
            }
            const selectClass = document.getElementById(e);
            selectClass.classList.toggle('selected');
        }
        if(selectedMedia!==undefined){
            if(this.props.dynamicData['selected_for_'+this.props.type].length  <= this.props.limit-1){
                this.props.mediaLimit({limit:'',type:this.props.type})
            }
        }
    }

    onSearch(e){
        this.setState({loadingStatus: true });
        e.persist();
        const searchName = e.target.value;
        if(searchName!==""){
            let data = {
                searchData:searchName,
                fileType:this.props.fileType
            }
            Api().post('getSearchFile',data).then(response=>{
                if(response.data.length === 0){
                    this.setState({
                        searchStatus:false
                    })
                }
                else{
                    this.setState({
                        searchStatus:true
                    })
                }
                this.setState({
                    showAllMedia:[]
                })
                const showOldFile  = this.state.showAllMedia;
                let showData = showOldFile.concat(response.data);
                this.setState({ showAllMedia: showData, loadingStatus:false});
                this.onSelectFileBorder();
            });
        }else{
            this.setState({
                searchStatus:true
            });
            this.getAllMedia();
        }
    }

    onChecked(){
        if(this.state.checked === false){
            this.setState({
                checked : true
            })
        }
        else{
            this.setState({
                checked : false
            })
        }
        this.setState({
            loadingStatus:true
        });
        if(this.state.checked === false){
            let selectedMedia =  this.props.dynamicData['selected_for_'+this.props.type]!==undefined ? this.props.dynamicData['selected_for_'+this.props.type] : [];
            if(selectedMedia.length >0){
                const data = {
                    photo:selectedMedia
                }
                Api().post('getSelectedPhoto',data)
                    .then((response) => {
                        if(response.status === 200){
                            this.setState({
                                showAllMedia:[]
                            })
                            Array.from(response.data).map(photo=>{
                                const showPhoto  = this.state.showAllMedia;
                                let showAllMedia = showPhoto.concat(photo);
                                this.setState({  showAllMedia:showAllMedia});
                            })
                            this.setState({  loadingStatus:false});
                            this.onSelectFileBorder();
                        }
                    })
                    .catch((error) => {
                    });
            }
            else{
                this.setState({
                    loadingStatus:false,
                    searchStatus:false
                });
            }
        }
        else {
            this.setState({
                searchStatus:true
            });
            this.getAllMedia();
        }
    }

    onSelectFileBorder(){

        const selectedMedia = this.props.dynamicData['selected_for_'+this.props.type]
        if(selectedMedia!=undefined){
            if(selectedMedia.length>0){
                selectedMedia.map(id => {
                    const className =  document.getElementById(id.toString());
                    className.classList.add('selected');
                });
            }
        }
    }


    onSelectedFiles(){

        if(this.props.dynamicData['selected_for_'+this.props.type]===undefined){
           alert('warning',"You did not select any Photo!");
        }
        else{
            if(this.props.dynamicData['selected_for_'+this.props.type].length===0){
                alert('warning',"You did not select any Photo!");
            }else{
                this.onSelectedFilesShow();
                this.setState({
                    model:false
                })
                this.onSelectedFilesShow();
            }
        }
    }


    onSelectedFilesShow(){
        let data   =  {
            photo:   this.props.dynamicData['selected_for_'+this.props.type]
        }

        Api().post('getSelectedPhoto',data)
            .then((response) => {
                if(response.status === 200){
                    this.props.showMediaFile({
                        showFile:[],
                        type:this.props.type
                    })

                    this.props.showMediaFile({
                        showFile:response.data,
                        type:this.props.type
                    })
                }
            })
            .catch((error) => {
            });

    }

    onDeleteSelectedFile(e){
        let selectData = this.props.dynamicData['selected_for_'+this.props.type]
        let index = selectData.indexOf(e); 
        if (index > -1) { 
            selectData.splice(index, 1);
            this.props.selectedMedia({
                photoId:selectData,
                type:this.props.type
            });
            this.onSelectedFilesShow();
        }
    }
    onFileUpload(){
        this.getAllMedia();
    }

    render() {
        const { selectedOption } = this.state;
        const options = [
            { value: 'newest', label: 'Sort by newest' },
            { value: 'oldest', label: 'Sort by oldest' },
        ];
        const media_data = this.state.showAllMedia;

        const media =  media_data.map(media => {
            return   <Col className="mb-4" xl={2} lg={2} md={3} sm={4} xs={3} key={media.id}>
                <div id={media.id} onClick={() => this.onSelectFile(`${media.id}`)} className="card photo-card my-3">
                    <div className="card-body photo-card-body">
                        <div className="photo-card-inner-body">
                            {this.props.fileType==="zip" ?
                                <Photo
                                    src="/file.png"
                                    blurDataURL="/file.png"
                                    class=""
                                    className="empty"
                                />
                                :
                                <Photo
                                    src={this.props.backendApi+media.media_url}
                                    blurDataURL="/file.png"
                                    class=""
                                    className="empty"
                                />
                            }
                        </div>
                    </div>
                    <div className="card-footer photo-card-footer">
                        <p  className="file-name">{media.media_name.length > 15 ? media.media_name.substring(0, 15) + "..." :  media.media_name}</p>
                    </div>
                </div>
            </Col>
        })

        let showFiles = this.props.dynamicData['show_media_for_'+this.props.type]!==undefined ? this.props.dynamicData['show_media_for_'+this.props.type] : [];

        let ticket =   showFiles.map(data => {
            return <div  className="media-photos-div img-show-div ticket-media">
                <div   className="card media-photos-div-card ticket-media">
                    <i  onClick={() => this.onDeleteSelectedFile(`${data.id}`)}  className="fal fa-times media-photos-cancel ticket-media"/>
                    <Photo
                        src={this.props.backendApi+data.media_url}
                        blurDataURL="/file.png"
                        class="img-show"
                    />
                </div>
            </div>
        })

        let show =   showFiles.map(data => {
            return <div  className="media-photos-div img-show-div ">
                <div   className="card media-photos-div-card ">
                    <i  onClick={() => this.onDeleteSelectedFile(`${data.id}`)}  className="fal fa-times media-photos-cancel "/>
                    {this.props.fileType=="zip" ?
                        <Photo
                            src="/file.png"
                            blurDataURL="/file.png"
                            class=""
                            className="empty"
                        />
                        :
                        <Photo
                            src={this.props.backendApi+data.media_url}
                            blurDataURL="/file.png"
                            class="card-img-top photo-card-img"
                            className="empty"
                        />

                    }
                </div>
            </div>
        })
        let selectedMedia   =  this.props.dynamicData['selected_for_'+this.props.type];
        let selectedMediaLength  = 0;
        if(selectedMedia!==undefined){
            if(selectedMedia.length!==0){
                selectedMediaLength = selectedMedia.length
            }
        }



        return (
            <Fragment>
                <Fragment>
                    {this.props.liveChat!==undefined &&
                        <Fragment>
                            {showFiles.length>0 &&
                                <div className="showImage slider-show-div ticket-media">
                                    {ticket}
                                </div>
                            }
                        </Fragment>
                    }

                    <Form.Group>
                        {this.props.title!==undefined &&
                            <Form.Label className="hdLabelBold">{(`${this.props.title}`)}</Form.Label>
                        }
                        <InputGroup onClick={this.onShow}  className="mb-2 photoUpload">
                            {this.props.liveChat ?
                                <Fragment>
                                    <i className="fas fa-paperclip ticket-media"/>
                                </Fragment>:
                                <Fragment>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>{('browse')}</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    {
                                        this.props.productVariation  ?
                                            <div className="form-control">  {selectedMediaLength!==0 ?  <span>{('File')} {('selected')}</span> : <span>{('Upload')} {('file')}</span>  }  </div>
                                            :
                                            <div className="form-control">  {selectedMediaLength!==0 ?  <span> {this.props.dynamicData['selected_for_'+this.props.type].length} {('File')} {('selected')}</span> : <span>{('Upload')} {('file')}</span>  }  </div>
                                    }
                                </Fragment>
                            }
                        </InputGroup>
                        {(this.props.productVariation!==true  && this.props.liveChat==undefined) &&
                            <Fragment>
                                {showFiles.length>0 &&
                                    <div className="showImage slider-show-div">
                                        {show}
                                    </div>
                                }
                            </Fragment>
                        }
                        {this.props.note!==undefined &&
                            <Form.Text className="text-muted hd-info-text">
                                {(`${this.props.note}`)}
                            </Form.Text>
                        }
                    </Form.Group>
                    <Modal className="mediaUploadModal" centered size="xl | lg | sm" show={this.state.model} onHide={this.onHide} >
                        <div className="modal-body mediaUploadBody">
                             <button onClick={this.onHide} type="button" className="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                             </button>
                            <Tabs defaultActiveKey="Media">
                                <Tab  eventKey="Media" title="Media">
                                    <Fragment>
                                        <Row className="media-file-div-header">
                                            <Col xl={3} lg={3} md={3}>
                                                <Select
                                                    value={selectedOption}
                                                    onChange={this.handleChange}
                                                    options={options}
                                                />
                                            </Col>
                                            <Col xl={3} lg={3} md={3}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            onChange={this.onChecked}
                                                            name="checkedB"
                                                            color="primary"
                                                            value={this.state.checked}
                                                        />
                                                    }
                                                    label="Select Only"
                                                />
                                            </Col>
                                            <Col xl={3} lg={3} md={3}/>

                                            <Col xl={3} lg={3} md={3}>
                                                <div className="input-group">
                                                    <div className="form-outline w-100">
                                                        <input  onChange={this.onSearch} type="search" id="form1" placeholder={('Search media')} className="form-control "/>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        {this.state.searchStatus ?
                                            <Row className="media-file-div-body row">
                                                {this.state.loadingStatus === true ?
                                                    <div className="mediaPreloader">
                                                        <div className="spinner-border text-muted"/>
                                                    </div> :
                                                    <Fragment> {media} </Fragment>
                                                }
                                            </Row>
                                            :
                                            <Row className="media-file-div-body row d-flex">
                                                <h1 className="photo-not-found-class">{('No file found')}</h1>
                                            </Row>
                                        }
                                    </Fragment>
                                </Tab>
                                <Tab eventKey="Upload" title="Upload">
                                    {this.props.fileType=="zip" ?
                                        <UploadZip multipleFile={this.props.multipleFile} fileType={this.props.for}  triggerParentUpdate={this.onFileUpload}/>
                                           :
                                        <UploadPhoto multipleFile={this.props.multipleFile} fileType={this.props.for} widthSize={this.props.widthSize} heightSize={this.props.heightSize} triggerParentUpdate={this.onFileUpload}/>
                                    }
                                </Tab>
                            </Tabs>
                        </div>
                        <div className="modal-footer hd-model-footer">
                            <div className="w-100 d-lg-flex justify-content-between">
                                <div className="modal-footer-upload-left-div">
                                    <p className="modal-file-selected">{this.props.dynamicData['selected_for_'+this.props.type]!==undefined ? this.props.dynamicData['selected_for_'+this.props.type].length:0} {('File')} {('selected')}</p>
                                    <Button onClick={this.onClear}>{('Clear')}</Button>
                                </div>
                                <div className="modal-footer-upload-right-div">
                                    <Button onClick={this.onSelectedFiles}>{('Add file')}</Button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </Fragment>
            </Fragment>
        );
    }
}

const mapDispatchToProps = {
    selectedMedia,
    mediaLimit,
    showMediaFile
};

function mapStateToProps(state) {
    const dynamicData = state.mediaReducer;
    return {
        dynamicData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaFile);
