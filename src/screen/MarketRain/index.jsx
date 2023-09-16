import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

function product_move (coordinates, changeCoordinates) {
    console.log(coordinates.left)
    
    return changeCoordinates({
        left: coordinates.left-1, 
        top: coordinates.top+1
    })
}

const MarketRain = (_) => {
    const [coordinates, changeCoordinates] = useState({left: 50, top: 50})

    useEffect(() => {
        const ChangeCoordinatesIntervalID = setInterval(() => {
            product_move(coordinates, changeCoordinates)
        }, 25)

        return () => clearInterval(ChangeCoordinatesIntervalID)
    }, [coordinates])

    styles.product_coordinates = coordinates
    
    return <Text style = {[styles.product, styles.product_coordinates]}>Hello, World</Text>
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