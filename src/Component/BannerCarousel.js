import React from "react";
import { Carousel } from "react-bootstrap";
import './Css/BannerCarousel.css';

function BannerCarousel(){
    return(
        <Carousel>
            <Carousel.Item>
                <img
                    src={require("./image/banner1.jpg")}
                    alt="First slide"
                />
                <img
                    src={require("./image/banner2.jpg")}
                    alt="Second slide"
                />
                <img
                    src={require("./image/banner3.jpg")}
                    alt="Third slide"
                />
                <img
                    src={require("./image/banner4.jpg")}
                    alt="Fourth slide"
                />
                <img
                    src={require("./image/banner5.jpg")}
                    alt="Fifth slide"
                />
                <img
                    src={require("./image/banner6.jpg")}
                    alt="Sixth slide"
                />
            </Carousel.Item>
            <Carousel.Item>
            <img
                    src={require("./image/Comedy/cd1.jpg")}
                    alt="First slide"
                />
                <img
                    src={require("./image/Adventure/ad1.jpg")}
                    alt="Second slide"
                />
                <img
                    src={require("./image/Ancient/ac1.jpg")}
                    alt="Third slide"
                />
                <img
                    src={require("./image/Military/ml1.jpg")}
                    alt="Fourth slide"
                />
                <img
                    src={require("./image/Romance/rm4.jpg")}
                    alt="Fifth slide"
                />
                <img
                    src={require("./image/Transdimensional/ts1.jpg")}
                    alt="Sixth slide"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default BannerCarousel;
