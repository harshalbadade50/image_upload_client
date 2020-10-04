import React, { Component } from "react";

export function PreviewComponent(props) {
    return(
        <div className="preview-section">
            <h4>Preview: </h4>
            <img alt="Crop" style={{ maxWidth: "100%" }} src={props.croppedImage} />
        </div>
    )
}