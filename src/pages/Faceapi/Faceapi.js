import {useRef,useEffect, useState} from 'react'
import '../../App.css'
import * as faceapi from 'face-api.js'

function FaceApi(){
  const videoRef = useRef()
  const canvasRef = useRef()
  const idCardRef = useRef();
  const [users,setUsers]=useState([]);

  function getAllUser(){
      fetch('https://athack-back-hiu-2023.vercel.app/user/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error))
  }

  useEffect(()=>{
    startVideo()
    videoRef && loadModels()
    getAllUser();

  },[idCardRef])

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
  

  async function setCardFacedetection(item,videoFacedetection){
      idCardRef.current.src=item.profil;
      const idCardFacedetection = await faceapi.detectSingleFace(idCardRef.current,
        new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks().withFaceDescriptor();

      if(idCardFacedetection && videoFacedetection){
        const distance = faceapi.euclideanDistance(idCardFacedetection.descriptor, videoFacedetection.descriptor);
        if(distance<0.5){
          redirect(videoFacedetection).then(()=>{if(videoFacedetection != undefined){window.location.href = "/mety"}});
        }
      }
  }

  const faceMyDetect = async ()=>{
    const videoFacedetection = await faceapi.detectSingleFace(videoRef.current,
      new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks().withFaceDescriptor();
      users.map((item)=>{
        setInterval(async()=>{
        console.log("huhuhuhuhuhu");
        console.log("gtgtfrfr "+JSON.stringify(item));
        console.log("hihihihihihi");
        setCardFacedetection(item,videoFacedetection);
      },2000)
    })

  }


  return (
    <div className="myapp">
    <h1>Detection de visage</h1>
      <div className="appvide">
          <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
      </div>

      <canvas ref={canvasRef} width="940" height="650"className="appcanvas"/>
      <div className="gallery">
        <img ref={idCardRef} src={require('./img/img.jpg')}  width="200" alt="ID card" height="auto" />
      </div>
    </div>
    )

}

export default FaceApi;