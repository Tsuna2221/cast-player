import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export default style = {
    rowAlign: {
        flexDirection: "row",
        alignItems: "center"
    },
    textTitle: {
        fontSize: 14.5, 
        lineHeight: 19,
        flexWrap: "wrap",
        fontWeight: "bold"
    },
    container: {
        backgroundColor: "#1D2939", 
        marginHorizontal: 20, 
        marginVertical: 10, 
        padding: 15, 
        borderRadius: 10
    }
}