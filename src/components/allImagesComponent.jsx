import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

import { getAllImages } from "../actions/imageActions.js";

const styles = theme => ({
    tabsIndicator: {
        backgroundColor: "red"
    }
})

class ImageList extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        // get all the saved images
        this.props.getAllImages();
    }

    // create image list of saved images
    createImageList = () => {
        let imageList = "No Images to display. Upload Image to view.";
        
        if(this.props.imageList.length > 0){
            imageList = [];
        }

        for(let i = 0; i < this.props.imageList.length; i++){
            let imageObj = this.props.imageList[i];
            let imageSection = (
                    <div key={imageObj._id}>
                        <div className="image-section">
                            <figure>
                                <img alt="horizontal" src={imageObj.horizontal} />
                                <figcaption>Horizontal</figcaption>
                            </figure>

                            <figure>
                                 <img alt="vertical" src={imageObj.vertical} />
                                <figcaption>Vertical</figcaption>
                            </figure>

                            <figure>
                                <img alt="horizontalsmall" src={imageObj.horizontalsmall} />
                                <figcaption>Horizontal Small</figcaption>
                            </figure>

                            <figure>
                                <img alt="gallery" src={imageObj.gallery} />
                                <figcaption>Gallery</figcaption>
                            </figure>
                        </div>
                        <hr/>
                    </div>);
            
            imageList.push(imageSection);
        }
        return imageList;
    }

    render(){
        let imageList = this.createImageList();
        let classes = "";
        if(typeof imageList === "string"){
            classes = "no-images";
        }
        return(
            <div className={classes}>
                {imageList}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    imageList: state.ImageReducer.imageList
});

const mapDispatchToProps = {
    getAllImages
};

const ImageListContainer = connect(mapStateToProps, mapDispatchToProps)(ImageList);
export default withStyles(styles)(ImageListContainer);