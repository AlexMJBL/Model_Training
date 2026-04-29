import { useState } from 'react';
import UploadBox from '../components/UploadBox';
import Result from '../components/Result';
import type { ResponseDto } from '../models/Dtos/responseDto';
import { mlService } from '../services/mlService';

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  
  const [resultV3, setResultV3] = useState<ResponseDto | null>(null);
  const [errorV3, setErrorV3] = useState<string | null>(null);
  const [loadingV3, setLoadingV3] = useState(false);
  
  const [resultV1, setResultV1] = useState<ResponseDto | null>(null);
  const [errorV1, setErrorV1] = useState<string | null>(null);
  const [loadingV1, setLoadingV1] = useState(false);

  const [resultOverfit, setResultOverfit] = useState<ResponseDto | null>(null);
  const [errorOverfit, setErrorOverfit] = useState<string | null>(null);
  const [loadingOverfit, setLoadingOverfit] = useState(false);
  
  const [imageSent, setImageSent] = useState(false);

  const handleImageUpload = (imageFile: File) => {
    setImage(imageFile);
    setImageSent(true);

    setLoadingV3(true);
    setErrorV3(null);
    mlService.predictImage({ image: imageFile })
      .then(res => setResultV3(res))
      .catch(err => setErrorV3(err.message || "Erreur modèle V3."))
      .finally(() => setLoadingV3(false));

    setLoadingV1(true);
    setErrorV1(null);
    mlService.predictImageV1({ image: imageFile })
      .then(res => setResultV1(res))
      .catch(err => setErrorV1(err.message || "Erreur modèle V1."))
      .finally(() => setLoadingV1(false));

    setLoadingOverfit(true);
    setErrorOverfit(null);
    mlService.predictImageOverfit({ image: imageFile })
      .then(res => setResultOverfit(res))
      .catch(err => setErrorOverfit(err.message || "Erreur modèle Overfit."))
      .finally(() => setLoadingOverfit(false));
  };

  const handleReset = () => {
    setImage(null);
    setResultV3(null);
    setErrorV3(null);
    setResultV1(null);
    setErrorV1(null);
    setResultOverfit(null);
    setErrorOverfit(null);
    setImageSent(false);
  };

  return (
    <main className="flex-1 flex justify-center items-center py-[60px] px-5 relative">
      {!imageSent ? (
        <UploadBox onImageUpload={handleImageUpload} />
      ) : (
        <div className="flex flex-col items-center w-full max-w-[1600px]">
          <div className="mb-8">
            <button
                onClick={handleReset}
                className="bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)] text-white py-2 px-6 rounded-full text-[15px] font-semibold cursor-pointer transition-all duration-300 ease-out inline-flex items-center gap-2 hover:scale-105 hover:shadow-[0_4px_15px_rgba(255,255,255,0.1)] backdrop-blur-md"
            >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Analyser une autre image
            </button>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 w-full justify-center items-start">
              <Result
                title="Modèle V1"
                image={image}
                result={resultV1}
                error={errorV1}
                loading={loadingV1}
              />
              <Result
                title="Modèle V3"
                image={image}
                result={resultV3}
                error={errorV3}
                loading={loadingV3}
              />
              <Result
                title="Overfit"
                image={image}
                result={resultOverfit}
                error={errorOverfit}
                loading={loadingOverfit}
              />
          </div>
        </div>
      )}
    </main>
  );
}
