import 'bootstrap/dist/css/bootstrap.min.css';
import { NextSeo } from "next-seo";
import Image from "next/image";
import React from 'react';
import { Provider } from 'react-redux';
import ErrorBoundary from "../../src/component/CommonScreen/ErrorHandler/ErrorBoundary";
import "../pages/styles/globals.css";
import { backendApi, baseApi } from "../services/common";
import store from '../services/store';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App({Component,pageProps}){

    let data = pageProps.data!==undefined ? pageProps.data : "" ;
    let meta_title = pageProps.data!==undefined ? data.meta_title :"";
    let meta_description = pageProps.data!==undefined ? data.meta_description :"";
    let meta_keyword = pageProps.data!==undefined ? data.meta_keyword:"";
    let meta_photo = backendApi + pageProps.data!==undefined ? data.meta_photo:"";
    let meta_url = baseApi + pageProps.data!==undefined ? data.meta_url:"";
    let title =  pageProps.data!==undefined ? data.title : "404";


    // let data = pageProps.data;
    // let meta_title = data.meta_title;
    // let meta_description = data.meta_description;
    // let meta_keyword =data.meta_keyword;
    // let meta_photo = backendApi +  data.meta_photo;
    // let meta_url = baseApi + data.meta_url;
    // let title = data.title;

    return (

            <ErrorBoundary>
                <Provider store={store}>
                    <NextSeo
                        title={title}
                        description={meta_description}
                        openGraph={{
                            title: meta_title,
                            description:meta_description,
                            keyword:meta_keyword,
                            images: [
                                {
                                    url: meta_photo,
                                    alt: 'Meta Photo',
                                },
                            ],
                            url: meta_url,
                            type: 'website',
                        }}
                    />
                    <div id="overlay-loading" >
                        <div className="loader-outer">
                            <div className="loader-inner">
                                <Image
                                    width="40"
                                    height="40"
                                    className="rotate"
                                    src="/loader.png"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                    <Component {...pageProps} />
                    <ToastContainer />
                </Provider>
            </ErrorBoundary>




    )
}

export  default  App;