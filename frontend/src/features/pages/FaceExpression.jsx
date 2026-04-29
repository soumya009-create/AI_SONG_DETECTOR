import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const moodStyles = {
  happy: {
    label: "Happy",
    tone: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  },
  surprised: {
    label: "Surprised",
    tone: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  },
  sad: {
    label: "Sad",
    tone: "border-rose-300/30 bg-rose-300/10 text-rose-100",
  },
  neutral: {
    label: "Neutral",
    tone: "border-slate-300/20 bg-slate-300/10 text-slate-100",
  },
};


const FaceExpression = ({
  onClick = () => {},
}) => {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [mood, setMood] = useState("Ready to detect a mood");
  const [detectedMood, setDetectedMood] = useState(null);
  const [statusMessage, setStatusMessage] = useState(
    "Position a face clearly in the frame, then capture the current expression."
  );
  const [isInitializing, setIsInitializing] = useState(true);
  const [cameraError, setCameraError] = useState("");

  const initialize = async () => {
    setIsInitializing(true);
    setCameraError("");

    try {
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

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      
      // Wait for video metadata to load before playing
      await new Promise((resolve) => {
        videoRef.current.onloadedmetadata = () => {
          resolve();
        };
      });
      
      await videoRef.current.play();
      setStatusMessage(
        "Camera ready. Capture an expression whenever you want to refresh the mood."
      );
      setIsInitializing(false);
    } catch (error) {
      console.error("Face detector initialization failed:", error);
      setCameraError(
        "Camera access is unavailable. Allow camera permissions and refresh the page."
      );
      setMood("Camera unavailable");
      setIsInitializing(false);
    }
  };

// ...existing code...

  const detectMoodOnce = () => {
    const landmarker = faceLandmarkerRef.current;

    if (!landmarker || !videoRef.current) {
      return null;
    }

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

      let currentMood = "neutral";

      if (mouthLeftDown < 0.05 && mouthWidth > 0.07) {
        setMood("Happy expression detected");
        currentMood = "happy";
      } else if (mouthOpen > 0.05) {
        setMood("Surprised expression detected");
        currentMood = "surprised";
      } else if (
        mouthOpen < 0.02 &&
        mouthWidth < 0.05 &&
        mouthLeftDown > 0.05 &&
        mouthRightDown > 0.05
      ) {
        setMood("Sad expression detected");
        currentMood = "sad";
      } else {
        setMood("Neutral expression detected");
        currentMood = "neutral";
      }

      setDetectedMood(currentMood);
      setStatusMessage(
        `Captured a ${currentMood} mood. The result can now be used to load a matching song.`
      );

      return currentMood;
    }

    setDetectedMood(null);
    setMood("No face detected");
    setStatusMessage(
      "No face was detected in the frame. Center the face and try one more capture."
    );
    return null;
  };

  useEffect(() => {
    initialize();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      faceLandmarkerRef.current?.close?.();
    };
  }, []);

  function handle() {
    const currentMood = detectMoodOnce();
    if (currentMood) {
      onClick(currentMood);
    }
  }

  const activeMood =
    (detectedMood && moodStyles[detectedMood]) || {
      label: isInitializing ? "Starting" : "Ready",
      tone: "border-white/10 bg-white/5 text-slate-100",
    };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
            Detector status
          </p>
          <p className="mt-2 text-xl font-semibold text-white">{mood}</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            {cameraError || statusMessage}
          </p>
        </div>

        <div
          className={`inline-flex w-max items-center rounded-full border px-4 py-2 text-sm font-semibold ${activeMood.tone}`}
        >
          {activeMood.label}
        </div>
      </div>

      <div className="surface-subtle p-4 sm:p-5">
        <div className="overflow-hidden rounded-[22px] border border-white/10 bg-slate-950/80 shadow-[0_20px_60px_rgba(2,8,23,0.35)]">
          <video
            ref={videoRef}
            className="aspect-video w-full object-cover"
            muted
            playsInline
          />
        </div>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid gap-3 sm:grid-cols-3 lg:flex-1">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Camera
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {cameraError ? "Unavailable" : isInitializing ? "Starting" : "Live"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Capture mode
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                Single snapshot
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Current mood
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {detectedMood || "Not captured yet"}
              </p>
            </div>
          </div>

          <button
            onClick={handle}
            className="primary-button min-w-[180px]"
            disabled={isInitializing || Boolean(cameraError)}
          >
            {isInitializing ? "Starting..." : "Detect mood"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaceExpression;
