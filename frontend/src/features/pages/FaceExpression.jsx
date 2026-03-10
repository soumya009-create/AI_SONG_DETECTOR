import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const FaceExpression = ({onClick=()=>{

}}) => {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [mood, setMood] = useState("Click button to detect mood");
  const [detectedMood, setDetectedMood] = useState(null); // Store the detected mood

  const initialize = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );

    const landmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      },
      runningMode: "VIDEO",
      numFaces: 1,
    });

    faceLandmarkerRef.current = landmarker;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    videoRef.current.srcObject = stream;
    await videoRef.current.play();
  };
  

  // 🔴 Detect only once and return mood
  const detectMoodOnce = () => {
    const landmarker = faceLandmarkerRef.current;

    if (!landmarker || !videoRef.current) return;

    const results = landmarker.detectForVideo(videoRef.current, Date.now());

    if (results.faceLandmarks.length > 0) {
      const landmarks = results.faceLandmarks[0];

      const leftMouth = landmarks[61];
      const rightMouth = landmarks[291];
      const topLip = landmarks[13];
      const bottomLip = landmarks[14];
      const nose = landmarks[1];

      const mouthWidth = Math.abs(leftMouth.x - rightMouth.x);
      const mouthOpen = Math.abs(topLip.y - bottomLip.y);

      const mouthLeftDown = leftMouth.y - nose.y;
      const mouthRightDown = rightMouth.y - nose.y;

      let currentMood = "neutral"; // Default mood

      if (mouthLeftDown < 0.05 && mouthWidth > 0.07) {
        setMood("😄 Happy");
        currentMood = "happy";
      } else if (mouthOpen > 0.05) {
        setMood("😲 Surprised");
        currentMood = "surprised";
      } else if (
        mouthOpen < 0.02 &&
        mouthWidth < 0.05 &&
        mouthLeftDown > 0.05 &&
        mouthRightDown > 0.05
      ) {
        setMood("😔 Sad");
        currentMood = "sad";
      } else {
        setMood("😐 Neutral");
        currentMood = "neutral";
      }

      // Store the detected mood
      setDetectedMood(currentMood);

      // Log the current detected mood
      console.log("Current Detected Mood:", currentMood);

      // Return the detected mood
      return currentMood;
    }
  };

  useEffect(() => {
    initialize();
  }, []);
  async function handle() {
   const mood= detectMoodOnce();
    console.log("Returned Mood from handle function:", mood);
    onClick(mood); // Pass the detected mood to the parent component
  }

  return (
    <div className="text-center mt-8">
      <h2 className="text-white text-2xl font-bold">🎭 Face Mood Detector</h2>

      <h3 className="text-white text-lg mt-4">{mood}</h3>

      {detectedMood && (
        <p className="text-gray-300 text-sm mt-2">
          Detected Mood: <span className="text-green-400 font-bold">{detectedMood}</span>
        </p>
      )}

      <video
        ref={videoRef}
        className="w-96 rounded-lg border-2 border-black mt-4"
      />

      <br />
      <br />

      <button
        onClick={()=>{
             handle();
        }}
        className="px-4 py-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Detect Mood
      </button>
    </div>
  );
};

export default FaceExpression;