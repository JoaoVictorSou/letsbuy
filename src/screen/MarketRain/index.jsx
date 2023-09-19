import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, Alert } from "react-native";
import ruffles_image from '../../../static/products/ruffles.png'
import pedigree_image from '../../../static/products/pedigree.png'
import basket_image from '../../../static/structure/basket.png'

const screen_width = Dimensions.get('window').width
const screen_height = Dimensions.get('window').height
const {width} = Image.resolveAssetSource(ruffles_image)
const image_square = width
const basket_square = 130
const products = [
    ruffles_image,
    //pedigree_image
]

const fall_pixels = screen_height/8
const left_move_max =  Math.round(screen_width/8)
const left_move_min = left_move_max*-1

function product_move (coordinates, win, screen_width, changeCoordinates, changeWinStatus) {
    let increment = Math.floor(Math.random() * (fall_pixels + 1))
    let new_top = coordinates.top + increment
    let new_left = coordinates.left
    const move = Math.floor(Math.random() * (2 + 1))
    
    if (move == 1) {
        if (coordinates.left <= 0) {
            let increment = Math.floor(Math.random() * (left_move_max + 1))
            new_left = new_left+increment
        } else if (coordinates.left >= screen_width-image_square) {
            let increment = Math.floor(Math.random() * (left_move_max + 1))
            new_left = new_left-increment
        } else {
            let increment = Math.floor(Math.random() * (left_move_max - left_move_min + 1)) + left_move_min
            new_left = new_left+increment
        }
    }
    
    
    const basket_position_y = screen_height-basket_square
    const basket_position_x = (screen_width/2)-(basket_square/2)

    let top_aligned = new_top >= basket_position_y && new_top <= screen_height
    let left_aligned = new_left >= basket_position_x && new_left <= (basket_position_x+basket_square-image_square)
    
    if (top_aligned && left_aligned) {
        changeCoordinates({
            left: new_left, 
            top: new_top
        })
        changeWinStatus(true)
    } else {
        changeCoordinates({
            left: new_left, 
            top: new_top
        })
        changeWinStatus(false)  
    }
}

function random_product() {
    const index = Math.floor(Math.random() * (products.length))
    
    return products[index]
}

function random_left_coordinates() {
    let left_coordinate = Math.floor(Math.random() * (screen_width-image_square + 1))
    
    return left_coordinate
}

function win_verify(win, coordinates, basket_square, screen_width, screen_height, changeWinStatus) {
    console.log(`topo: ${coordinates.top}`)
    console.log(`distancia do topo: ${screen_height-basket_square}`)
    console.log(`status: ${win}`)
    if ((!win) && ((coordinates.left < 1000) && (coordinates.top >= screen_height-basket_square))) {
        changeWinStatus(true)
    } else {
        changeWinStatus(false)
    }
}

function new_round(changeProductImage, changeCoordinates, changeWinStatus) {
    changeCoordinates({left: random_left_coordinates(), top: 0})
    changeProductImage(random_product())
    changeWinStatus(false)
}

const MarketRain = (_) => {
    const [coordinates, changeCoordinates] = useState({left: random_left_coordinates(), top: 0})
    const [product_image, changeProductImage] = useState(random_product())
    const [win, changeWinStatus] = useState(false)
    const [img, setImageSquare] = useState({width: 100, height: 100})

    useEffect(() => {
        const ChangeCoordinatesIntervalID = setInterval(() => {
            product_move(coordinates, win, screen_width, changeCoordinates, changeWinStatus)

            if ((coordinates.top > screen_height+image_square) || win) {
                if (win) {
                    console.log('YOU WIN!')
                } else {
                    console.log('GAME OVER!')
                }
                new_round(changeProductImage, changeCoordinates, changeWinStatus)
            }
        }, 125)

        return () => clearInterval(ChangeCoordinatesIntervalID)
    }, [coordinates])

    styles.product_coordinates = coordinates
    
    const t = (_) => {
        if(win) {
        const teste =  Alert.alert(title = 'Parabêns.', message = "Você ganhou!")
        console.log(teste)
        }
    }

    return (
        <View style={styles.market_rain_wrapper}>
            {t()}
            <Image style = {[styles.product, styles.product_coordinates]} source={product_image} />
            <Image style={styles.market_basket} source={basket_image} />
        </View>
    )
}

const styles = StyleSheet.create({
    market_rain_wrapper: {
        position: "relative"
    },
    product: {
        position: "absolute"
    },
    product_coordinates: {
        top: 50
    },
    market_basket: {
        width: basket_square,
        position: "absolute",
        top: screen_height-basket_square,
        left: (screen_width/2)-(basket_square/2)
    }
})

export default MarketRain