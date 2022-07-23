import React, { Component } from 'react';

export class CameraFeed extends Component {
    cameras = [];
    stream = null;
    disabled = false;
    /**
     * Processes available devices and identifies one by the label
     * @memberof CameraFeed
     * @instance
     */
    processDevices(devices) {
        devices.forEach(device => {
            console.log(device.label);
            this.setDevice(device);
        });
    }

    /**
     * Sets the active device and starts playing the feed
     * @memberof CameraFeed
     * @instance
     */
    async setDevice(device) {
        const { deviceId } = device;
        await this.stop();
        this.disabled = true;
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } });
        this.videoPlayer.srcObject = this.stream;
        var playPromise = this.videoPlayer.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
              this.disabled = false;
              this.render();
            })
            .catch(error => {
              // Auto-play was prevented
              // Show paused UI.
              console.log(error);
              this.disabled = false;
              this.render();
            });
        }
    }

    /**
     * On mount, grab the users connected devices and process them
     * @memberof CameraFeed
     * @instance
     * @override
     */
    async componentDidMount() {
        // await this.start();
    }

    async start() {
        const cameras = await navigator.mediaDevices.enumerateDevices();
        this.cameras = cameras.filter(cam => cam.label && cam.deviceId);
        this.processDevices(this.cameras);
        this.render();
    }

    async stop() {
       if (this.stream) await this.stream.getTracks().forEach(async(track) => { console.log(track); await track.stop(); });
    }

    /**
     * Handles taking a still image from the video feed on the camera
     * @memberof CameraFeed
     * @instance
     */
    takePhoto = () => {
        const { sendFile } = this.props;
        const context = this.canvas.getContext('2d');
        context.drawImage(this.videoPlayer, 0, 0, 96, 70);
        this.canvas.toBlob(sendFile, "image/jpeg", 1);
    };

    render() {
        return (
            <div className="c-camera-feed">
                {/* {this.cameras.map(cam => <button disabled={this.disabled} key={cam.deviceId} onClick={() => this.setDevice(cam)}>{cam.label}</button>)} */}
                <div className="c-camera-feed__viewer">
                    <video ref={ref => (this.videoPlayer = ref)} width="96" heigh="70" />
                </div>
                <button id="takePhoto" disabled={this.disabled} onClick={this.takePhoto}></button>
                <button id="startCamera" disabled={this.disabled} onClick={async () => await this.start()}></button>
                <button id="stopCamera" disabled={this.disabled} onClick={async () => await this.stop()}></button>
                <div className="c-camera-feed__stage">
                    <canvas width="96" height="70" ref={ref => (this.canvas = ref)} />
                </div>
            </div>
        );
    }
}


// import React from 'react';
// import classes from './Component.module.css';
// import '../../global.css';

// const CameraFeed = (props) => {
//     const videoPlayer = undefined;

//     return (
//         <div className="c-camera-feed">
//             <div className="c-camera-feed__viewer">
//                 <video ref={ref => (this.videoPlayer = ref)} width="680" heigh="360" />
//             </div>
//             <button onClick={this.takePhoto}>Take photo!</button>
//             <div className="c-camera-feed__stage">
//                 <canvas width="680" height="360" ref={ref => (this.canvas = ref)} />
//             </div>
//         </div>
//     );
// };

export default Component;
