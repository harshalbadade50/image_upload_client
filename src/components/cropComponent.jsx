import React, { Component } from "react";
import { connect } from "react-redux";
import ReactCrop from "react-image-crop";

import { PreviewComponent } from "./previewComponent.js";

import "react-image-crop/dist/ReactCrop.css";

class CustomCropComponent extends Component {
  constructor() {
    super();
    this.state = {
      crop: {
        unit: "%",
        width: 30,
        aspect: 16 / 9
      },
      croppedImg: null
    };
    this.useDefaultSize = true;
  }

  // do not use size sent through props once image is loaded
  componentDidUpdate = () => {
    this.useDefaultSize = false;
  };

  // callback fn of ReactCrop component
  onImageLoaded = image => {
    this.imageRef = image;
  };

  // callback fn of ReactCrop component
  // once crop event is completed get the cropped image
  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  // callback fn of ReactCrop component
  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

// once crop event is completed get the cropped image
  async makeClientCrop(crop) {
    if (this.imageRef) {
      const croppedImage = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({
        croppedImg: croppedImage
      });
      this.props.sendCroppedImage(croppedImage, this.props.size);
    }
  }

  getCroppedImg(image, crop, fileName) {
    crop.width = this.useDefaultSize ? this.props.width : crop.width;
    crop.height = this.useDefaultSize ? this.props.height : crop.height;

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");

    // draw cropped image in canvas in order to get it's blob data
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        //window.URL.revokeObjectURL(this.fileUrl);
        //this.fileUrl = window.URL.createObjectURL(blob);

        // convert blob to base64 data
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          let base64String = reader.result;
          resolve(base64String);
        };
      }, "image/jpeg");
    });
  }

  render() {
    return (
      <div className="crop-section">
        <h4>Crop Image as per need: </h4>
        {this.props.src && (
          <ReactCrop
            src={this.props.src}
            crop={this.state.crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}

        <PreviewComponent croppedImage={this.state.croppedImg} />
      </div>
    );
  }
}

const mapStateToProps = () => ({});
export default connect(mapStateToProps)(CustomCropComponent);
