import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, Alert, ImageBackground } from "react-native";

import products from "../../util/product_image";

import basket_image from '../../../static/structure/basket.png'
import cda_sombol from '../../../static/structure/cda-simbol.png'
import background from '../../../static/structure/market-rain-background.png'

import { get_image_dimensions } from "../../util/data_treatment";

const screen_width = Dimensions.get('window').width
const screen_height = Dimensions.get('window').height
const basket_width = 251
const basket_height = 200
const fall_pixels = screen_height/15
const left_move_max =  Math.round(screen_width/9)
const left_move_min = left_move_max*-1

function product_move (coordinates, image_dimensions, win, screen_width, changeCoordinates, changeWinStatus) {
    let top_increment = Math.random() * (fall_pixels + 1)
    let new_top = coordinates.top + top_increment
    
    let new_left = coordinates.left
    let left_increment = 0
    const move = Math.floor(Math.random() * (3 + 1))
    
    if (move == 1) {
        if (coordinates.left <= 0) {
            left_increment = Math.random() * (left_move_max + 1)
        } else if (coordinates.left >= screen_width-image_dimensions.width) {
            left_increment = Math.random() * (left_move_max + 1) * -1
        } else {
            left_increment = Math.random() * (left_move_max - left_move_min + 1) + left_move_min
        }
    }

    if(coordinates.left >= screen_width*1.9 && left_increment > 0) {
        left_increment = 0
    } else if (coordinates.left <= image_dimensions && left_increment < 0) {
        left_increment = 0
    } 
    
    new_left += left_increment

    changeCoordinates({
        left: new_left, 
        top: new_top
    })
}

function random_product() {
    const index = Math.floor(Math.random() * (products.length))
    
    return products[index]
}

function random_left_coordinates(image_dimensions) {
    let left_coordinate = Math.floor(Math.random() * (screen_width-image_dimensions.width + 1))
    
    return left_coordinate
}

function win_verify(win, coordinates, image_dimensions, basket_width, screen_width, screen_height, changeWinStatus) {
    const basket_position_y = screen_height-basket_width
    const basket_position_x = (screen_width/2)-(basket_width/2)

    let top_aligned = coordinates.top >= basket_position_y && coordinates.top <= (basket_position_y+basket_height)-image_dimensions.height
    let left_aligned = coordinates.left >= basket_position_x && coordinates.left <= (basket_position_x+basket_width-image_dimensions.width)
    
    if (top_aligned && left_aligned) {
        changeWinStatus(true)
    } else {
        changeWinStatus(false)  
    }
}

function new_round(image_dimensions, changeProductImage, changeCoordinates, changeWinStatus, changeGameState) {
    changeCoordinates({left: random_left_coordinates(image_dimensions), top: 0})
    changeProductImage(random_product())
    changeWinStatus(false)
    changeGameState(1)
}

const MarketRain = (_) => {
    const [product_image, changeProductImage] = useState(random_product())
    const [image_dimensions, changeImageDimensions] = useState(get_image_dimensions(product_image))
    const [coordinates, changeCoordinates] = useState({left: random_left_coordinates(image_dimensions), top: 0})
    const [win, changeWinStatus] = useState(false)
    const [gameState, changeGameState] = useState(1)

    useEffect(() => {
        const ChangeCoordinatesIntervalID = setInterval(() => {
            if (gameState != 0) {
                product_move(coordinates, image_dimensions, win, screen_width, changeCoordinates, changeWinStatus)
            }
        }, 50)

        win_verify(win, coordinates, image_dimensions, basket_width, screen_width, screen_height, changeWinStatus)
        
        if ((coordinates.top > screen_height) || win) {
            if (gameState == 1) {
                final_round_alert()
                changeGameState(0)
            } 
        }
        
        return () => clearInterval(ChangeCoordinatesIntervalID)

    }, [coordinates, gameState])

    const final_round_alert = async (_) => {
        changeCoordinates({left: -1, top: screen_height+image_dimensions.width})

        if(win) {
            Alert.alert(
                title = 'Parabêns!', 
                message = "Você conseguiu colocar o produto na cesta.",
                buttons = [
                    {text: "Continuar", onPress: () => {
                        new_round(image_dimensions, changeProductImage, changeCoordinates, changeWinStatus, changeGameState)
                    }}
                ]
            )
        } else {
            Alert.alert(
                title = 'Que pena!', 
                message = "Não foi dessa vez. O produto não chegou a cesta.",
                buttons = [
                    {text: "Continuar", onPress: () => {
                        new_round(image_dimensions, changeProductImage, changeCoordinates, changeWinStatus, changeGameState)
                    }}
                ]
            )
        }
    }

    styles.product_coordinates = coordinates

    return (
        <View style={styles.market_rain_wrapper}>
            <ImageBackground source={background} resizeMode="cover" style = {styles.background_area}>
            <Image style = {styles.corporation_logo} source={cda_sombol} />
            <Image style = {[styles.product, styles.product_coordinates]} source={product_image} />
            <View style = {styles.basket_area}>
                <Image style={styles.market_basket} source={basket_image} />
            </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    market_rain_wrapper: {
        position: "relative",
        width: screen_width,
        height: screen_height
    },
    product: {
        position: "absolute"
    },
    product_coordinates: {
        top: 50
    },
    market_basket: {
        position: "absolute"
    },
    basket_area: {
        top: screen_height-basket_width,
        left: (screen_width/2)-(basket_width/2),
        width: basket_width,
        height: basket_height,
        alignItems: "center"
    },
    corporation_logo: {
        position: "absolute",
        margin: 20
    },
    background_area: {
        flex: 1
    }
})

export default MarketRain