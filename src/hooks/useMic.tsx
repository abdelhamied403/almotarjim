import { useState, useEffect, useRef } from "react";

type MicrophoneStatus = "idle" | "recording" | "paused" | "stopped";

interface MicrophoneHook {
  status: MicrophoneStatus;
  startRecording: () => void;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  resetRecording: () => void;
  audioBlob: Blob | null;
}

const useMic = (): MicrophoneHook => {
  const [status, setStatus] = useState<MicrophoneStatus>("idle");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/wav" });
        setAudioBlob(null);
        setTimeout(() => {
          setAudioBlob(blob);
        }, 0);
      };

      mediaRecorder.current.start();
      setStatus("recording");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setStatus("idle");
    }
  };

  const pauseRecording = (): void => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      setStatus("paused");
    }
  };
  const resumeRecording = (): void => {
    if (mediaRecorder.current && status === "paused") {
      mediaRecorder.current.start();
      setStatus("recording");
    }
  };

  const stopRecording = (): void => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      setStatus("stopped");
    } else {
      setStatus("idle");
    }
  };

  const resetRecording = (): void => {
    setStatus("idle");
    setAudioBlob(null);
    audioChunks.current = [];
  };

  useEffect(() => {
    return () => {
      if (
        mediaRecorder.current &&
        mediaRecorder.current.state === "recording"
      ) {
        mediaRecorder.current.stop();
      }
    };
  }, []);

  return {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording,
    audioBlob,
  };
};

export default useMic;
