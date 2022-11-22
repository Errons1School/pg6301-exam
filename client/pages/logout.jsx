import {useNavigate} from "react-router-dom";
import React, {useContext, useEffect} from "react";
import {CateringApi} from "../cateringApi";

export function Logout() {
    const navigate = useNavigate();
    const { endSession } = useContext(CateringApi);
    useEffect(async () => {
        await endSession();
        navigate(0)
        navigate("/");
    });
    return <h1>Please wait...</h1>;
}