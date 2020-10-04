import React, { Component } from "react";
import { connect } from "react-redux";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import CustomCropComponent from "./cropComponent.jsx";
import ImageList from "./allImagesComponent.jsx";
import ToastMessage from './toastMessageComponent.jsx';

import { uploadImages, showToastMessage } from "../actions/imageActions.js";

const styles = theme => ({
    tabsIndicator: {
        backgroundColor: "red"
    }
})

// these are the allowed file extensions
const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

class SelectImage extends Component {
  constructor() {
    super();
    this.state = {
      src: null,
      tabIndex: 1,
      vertical: null,
      horizontal: null,
      horizontalsmall: null,
      gallery: null
    };
  }

  onSelectFile = e => {
    // if file is not of allowed extension then show error message
    if (!allowedExtensions.exec(e.target.value)) {
        this.props.showToastMessage("Select Image file of .jpg, .jpeg, .png, .gif extentions.", "error");
        return;
    }

    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        let image = new Image();
        image.src = reader.result;
        image.onload = imageData => {
          const height = imageData.target.height;
          const width = imageData.target.width;
          // image has to be of size 1024 x 1024
          // if it is not of valid size then show error message
          if (height == 1024 && width == 1024) {
            this.setState({ src: reader.result });
          } else {
            this.props.showToastMessage("Image should be of 1024 x 1024 dimensions", "error");
          }
        };
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

// set the cropped image into state
  getCroppedImage = (croppedImage, size) => {
    this.setState({
      [size]: croppedImage
    });
  };

  handleTabChange = (event, value) => {
    // change the Tab Index
    this.setState({
        tabIndex: value
    })
  }

  //  upload image to database
  uploadImage = () => {
      const { vertical, horizontal, horizontalsmall, gallery } = this.state;
      // upload image only when all the dimensions are cropped
      if(vertical && horizontal && horizontalsmall && gallery){
        const imageObj = {
              vertical: vertical,
              horizontal: horizontal,
              horizontalsmall: horizontalsmall,
              gallery: gallery
        }
        this.props.uploadImages(imageObj);
      }
  }

  render() {
    const { vertical, horizontal, src, horizontalsmall, gallery } = this.state;
    let disable = true;
    // enable the upload button only when all the dimensions are cropped
    if(vertical && horizontal && horizontalsmall && gallery){
        disable = false;
    }

    return (
      <div>
        <div className="select-file">
            <h3>Select Image file</h3>
            
            <div className="select-file-container">
                <div>
                    <input type="file" accept="image/*" onChange={this.onSelectFile} />
                    <div className="file-select-msg">Select Image of 1024 x 1024 </div>
                </div>
                
                <div>
                    <Button variant="contained" 
                            color="primary"
                            disabled={disable}
                            onClick={this.uploadImage}
                    >
                        Upload
                    </Button>
                </div>
            </div>
            <hr />
        </div>

        <div className="tab-container">
            <Tabs id="tab-bar" value={this.state.tabIndex}
                classes={{ indicator: this.props.classes.tabsIndicator }}
                onChange={this.handleTabChange}
            >
                <Tab value={1} label="Horizontal (755 x 450)" style={{ flex: 1 }}></Tab>
                <Tab value={2} label="Vertical (365 x 450)" style={{ flex: 1 }}></Tab>
                <Tab value={3} label="Horizontal Small (365 x 212)" style={{ flex: 1 }}></Tab>
                <Tab value={4} label="Gallery (380 x 380)" style={{ flex: 1 }}></Tab>
                <Tab value={5} label="View Uploaded Images" style={{ flex: 1 }}></Tab>
            </Tabs>

            <div style={{ display: this.state.tabIndex === 1 ? "block" : "none"}}>
                {src && (
                    <CustomCropComponent src={src}
                        sendCroppedImage={this.getCroppedImage}
                        height={450} width={755} 
                        size="horizontal"
                    />
                )}
            </div>

            <div style={{ display: this.state.tabIndex === 2 ? "block" : "none"}}>
                {src && (
                    <CustomCropComponent src={src}
                        sendCroppedImage={this.getCroppedImage}
                        height={450} width={365}
                        size="vertical"
                    />
                )}
            </div>

            <div style={{ display: this.state.tabIndex === 3 ? "block" : "none"}}>
                {src && (
                    <CustomCropComponent src={src}
                        sendCroppedImage={this.getCroppedImage}
                        height={212} width={365}
                        size="horizontalsmall"
                    />
                )}
            </div>

            <div style={{ display: this.state.tabIndex === 4 ? "block" : "none"}}>
                {src && (
                    <CustomCropComponent src={src}
                        sendCroppedImage={this.getCroppedImage}
                        height={380} width={380}
                        size="gallery"
                    />
                )}
            </div>

            <div style={{ display: this.state.tabIndex === 5 ? "block" : "none"}}>
                <ImageList />
            </div>
        </div>
        
        {this.props.showToastMsg && <ToastMessage />}
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
    showToastMsg: state.ImageReducer.showToastMsg
});

const mapDispatchToProps = {
    uploadImages,
    showToastMessage
};

const SelectImageContainer = connect(mapStateToProps, mapDispatchToProps)(SelectImage);
export default withStyles(styles)(SelectImageContainer);

