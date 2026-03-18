import React, {PureComponent,Fragment} from 'react';
import Dropzone from "react-dropzone";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Api from "../../../ClientApi/Api";
import ProgressBar from "@ramonak/react-progress-bar";
import {connect} from "react-redux";
import Photo from "../Image/Photo";
import {alert} from "../../../services/common";
class UploadZip extends PureComponent {
    constructor() {
        super();
        this.state = {
            files:[],
            serverFile:[],
            totalFile:0, 
            isValid:false, 
            showFile:[],
            loading:false,
            fileType:'',
            buttonDisable:false,
            progress:0
        }
        this.handleOnDrop = this.handleOnDrop.bind(this);
        this.verifyFile = this.verifyFile.bind(this);
        this.getPhoto = this.getPhoto.bind(this);
    }
    componentDidMount() {
        this.setState({
            fileType:this.props.type
        })
    }
    verifyFile  (files) {
        if (files && files.length > 0){
            const checkVerify = Array.from(files).map((file,index) =>
                {
                    const currentFileType = file.type
                    const acceptedFileTypes = 'zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed'
                    const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()});
                    if (!acceptedFileTypesArray.includes(currentFileType)){

                        alert('warning',file.name+" file is not allowed. Only zip is allowed!");


                        return false
                    }
                    else {
                        return true
                    }
                }
            )
            return checkVerify;
        }
    }
    getPhoto(id) {
        this.setState({
            loading:true
        })
        const data = {
            fileId:id
        }
        Api().post('getFileById',data).then(res=>{
            let stateFile = this.state.showFile
            stateFile.push(res.data[0]);
            if(res.data!==0){
                this.setState({
                    showFile: res.data,
                    loading:false
                })
            }
        })
        this.props.triggerParentUpdate({});
    }
    postPhoto(data) {
        let serverSelected = data;
        this.setState({
            loading:true
        })
        let formData = new FormData();
        for (let i = 0; i < serverSelected.length; i++) {
            let file = serverSelected[i];
            formData.append('fileKey[]', file);
        }

        const config = {
            chunking: true,
            method: "POST",
            maxFilesize: 400000000,
            chunkSize: 1000000,
            fileType: ['zip'],
            parallelChunkUploads: true,
            onUploadProgress: progressEvent => {
                const percentage = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                )
                this.setState({
                    progress:percentage
                });
            },
            headers: {
                'Content-Type': 'application/json',
                'type': this.props.fileType,
            }
        }

            Api().post('/postMedia', formData, config)
                .then((response) => {
                    if(response.data!==0){
                        this.setState({
                            loading:false
                        })
                        alert('success',"Inserted successfully!");
                       this.getPhoto(response.data);
                    }else{
                        alert('warning',"Something went wrong!");
                    }
                })
                .catch((error) => {
                    alert('warning',"Something went wrong!");
                });
        this.setState({
            serverFile:[]
        });
    }
    handleOnDrop (files, rejectedFiles) {
        if (files && files.length > 0){
            var isValid = true;
            const isVerified = this.verifyFile(files)
            isVerified.map(file=>{
                if(file==false){
                    isValid = false;
                }
            });
            if(isValid){
                let selectedServerFile = this.state.serverFile.concat(files);
                this.setState({ serverFile: selectedServerFile });
                const totalfile = this.state.totalFile;
                this.setState({
                    totalFile:totalfile+selectedServerFile.length
                })
                this.postPhoto(selectedServerFile);
                let selectedFile = this.state.files.concat(files);
                this.setState({ files: selectedFile });
            }
        }
    }
    render() {
        const showFile = this.state.showFile;

        const files = showFile.reverse().map(file => {
            return   <Col className="mb-4" xl={2} lg={2} md={3} sm={4} xs={3} key={file.id}>
                <div  className="card photo-card my-3">
                    <div className="card-body photo-card-body">
                        <Photo
                            src="/file.png"
                            blurDataURL="/blank.jpg"
                            class="img-show"
                        />
                    </div>
                    <div className="card-footer photo-card-footer">
                        <p  className="file-name">{file.media_name.length > 15 ? file.media_name.substring(0, 15) + "..." :  file.media_name}</p>
                    </div>
                </div>
            </Col>
        })


       console.log(showFile,'showFile upload zip')

        return (
            <Fragment>
                {this.state.files.length === 0 ?
                     <Dropzone className="dropzoneDiv"  multiple={this.props.multipleFile} accept=".zip" onDrop={this.handleOnDrop}>
                            {({getRootProps, getInputProps}) => (
                                <section className="drag-image d-flex justify-content-center align-items-center align-middle">
                                    <div {...getRootProps({className: 'dropzone'})}>
                                        <div className="dragDrop ">
                                            <input {...getInputProps()} />
                                            <i className="fad fa-download"/>
                                            <p  className="upload-file-text">Choose a file or drag it here</p>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                       :
                    <div>
                        <Dropzone multiple={this.props.multipleFile} accept=".zip" onDrop={this.handleOnDrop}>
                            {({getRootProps, getInputProps}) => (
                                <section className="drag-image d-flex justify-content-center align-items-center align-middle">
                                    <div {...getRootProps({className: 'dropzone'})}>
                                        <div className="upload-image-drag">
                                            <input {...getInputProps()} />
                                            {this.state.loading ?
                                                <Button id='more' disabled className="btn btn-success button">
                                                    <span className="spinner-grow text-muted"/>
                                                </Button> :
                                                <Button id='more'  className="btn btn-success button">Add More</Button>
                                            }
                                        </div>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        <Row className="media-file-div-body row">
                            {this.state.loading === true &&
                                <Fragment>
                                    <Col className="mb-4" xl={2} lg={2} md={3} sm={4} xs={3}>
                                        <div  className="card photo-card my-3">
                                            <div className="card-body photo-card-body"/>
                                            <div className="card-footer photo-card-footer"/>
                                        </div>
                                    </Col>
                                </Fragment>
                            }
                            {files}
                        </Row>
                        <div className="progress-bar-div">
                            <ProgressBar completed={this.state.progress} />
                        </div>
                    </div>
                }
            </Fragment>
        );
    }
}



function mapStateToProps(state) {
    const backendApi = state.starterReducer.backendApi;
    return {
        backendApi
    };
}

export default connect(mapStateToProps)(UploadZip);




