import {useRef,useEffect, useState} from 'react'
import '../../App.css'
import * as faceapi from 'face-api.js'

function FaceApi(){
  const videoRef = useRef()
  const canvasRef = useRef()
  const idCardRef = useRef();

  useEffect(()=>{
    startVideo()
    videoRef && loadModels()

  },[])

  const startVideo = ()=>{
    navigator.mediaDevices.getUserMedia({video:true})
    .then((currentStream)=>{
      videoRef.current.srcObject = currentStream
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const loadModels = ()=>{
    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models')

      ]).then(()=>{
      faceMyDetect()
    })
  }

  async function redirect(detections){
    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
      faceapi.matchDimensions(canvasRef.current,{
        width:940,
        height:650
      })

      const resized = faceapi.resizeResults(detections,{
         width:940,
        height:650
      })

    faceapi.draw.drawDetections(canvasRef.current,resized)
    faceapi.draw.drawFaceLandmarks(canvasRef.current,resized)
  }
  

  const faceMyDetect = async () => {
    // Fetch user data
    const response = await fetch('https://athack-back-hiu-2023.vercel.app/user/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const users = await response.json();
  
    const intervalId =  setInterval(async () => {
      const videoFacedetection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();
  
      if (videoFacedetection) {
        redirect(videoFacedetection);
  
        for (const user of users) {
          const idCardImg = new Image();
          idCardImg.src = user.profil;
          idCardImg.crossOrigin = "anonymous";
  
          const idCardFacedetection = await faceapi
            .detectSingleFace(idCardImg, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();
  
          if (idCardFacedetection) {
            const distance = faceapi.euclideanDistance(idCardFacedetection.descriptor, videoFacedetection.descriptor);
  
            if (distance <= 0.4) {
              console.log(`Match found for user: ${user.prenom} ${user.nom}`);
              console.log(`Distance: ${distance}`);
              // Redirect or perform any desired action
              clearInterval(intervalId);
              break;
            }
          }
        }
      }
    }, 1000);
  };

  return (
    <div className="myapp">
    <h1>Detection de visage</h1>
      <div className="appvide">
          <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
      </div>

        <canvas ref={canvasRef} width="940" height="650"className="appcanvas"/>
        <img ref={idCardRef} src={require('./img/img.jpg')}  width="200" alt="ID card" height="auto" />
    </div>
    )

}

export default FaceApi;