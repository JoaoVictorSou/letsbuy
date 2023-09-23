import { Image } from "react-native"

function get_image_dimensions(image_object) {
    const {width, height} = Image.resolveAssetSource(image_object)
    
    return {width, height}
}

export {
    get_image_dimensions
}