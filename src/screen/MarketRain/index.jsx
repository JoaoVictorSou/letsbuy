import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import ruffles_image from '../../../static/products/ruffles1.png'

const screen_width = Dimensions.get('window').width
const screen_height = Dimensions.get('window').height
const image_square = 150
const products = [
    ruffles_image
]

const fall_pixels = screen_height/9
const left_move_max =  Math.round(screen_width/8)
const left_move_min = left_move_max*-1

function product_move (coordinates, screen_width, changeCoordinates) {
    let increment = Math.floor(Math.random() * (fall_pixels + 1))
    let new_top = coordinates.top + increment
    let new_left = coordinates.left
    const move = Math.floor(Math.random() * (3 + 1))
    
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
    
    changeCoordinates({
        left: new_left, 
        top: new_top
    })
}

function random_product() {
    const index = Math.floor(Math.random() * (products.length))
    
    return products[index]
}

function random_left_coordinates() {
    let left_coordinate = Math.floor(Math.random() * (screen_width-image_square + 1))
    
    return left_coordinate
}

function new_round(changeProductImage, changeCoordinates) {
    changeCoordinates({left: random_left_coordinates(), top: 0})
    changeProductImage(ruffles_image)
}

const MarketRain = (_) => {
    const [coordinates, changeCoordinates] = useState({left: random_left_coordinates(), top: 0})
    const [product_image, changeProductImage] = useState(random_product())

    useEffect(() => {
        const ChangeCoordinatesIntervalID = setInterval(() => { 
            product_move(coordinates, screen_width, changeCoordinates)

            if (coordinates.top > screen_height+image_square-50) {
                new_round(changeProductImage, changeCoordinates)
            }
        }, 100)

        return () => clearInterval(ChangeCoordinatesIntervalID)
    }, [coordinates])

    styles.product_coordinates = coordinates
    
    return <Image style = {[styles.product, styles.product_coordinates]} source={product_image} />
}

const styles = StyleSheet.create({
    product: {
        position: "relative"
    },
    product_coordinates: {
        top: 50
    }
})

export default MarketRain