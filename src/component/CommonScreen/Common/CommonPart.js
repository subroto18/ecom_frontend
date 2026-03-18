
import React from "react";
import starterAction from "../../../services/actions/starterAction";
import userAction from "../../../services/actions/userAction";
import {useDispatch } from "react-redux";


const CommonPart = () => {
    useDispatch(starterAction())
    useDispatch(userAction())
};

export default CommonPart;