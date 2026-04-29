import type { ResponseDto } from '../models/Dtos/responseDto';

interface ResultProps {
    title?: string;
    image: File | null;
    result: ResponseDto | null;
    error: string | null;
    loading: boolean;
}

export default function Result({ title = "Résultat de l'analyse", image, result, error, loading }: ResultProps) {
    const loadingClass = loading 
        ? 'animate-pulse-glow border-accent-cyan shadow-[0_0_30px_rgba(0,240,255,0.8)]' 
        : 'border-[rgba(255,255,255,0.2)] shadow-[inset_0_0_0_1px_var(--color-glass-border),0_8px_32px_0_rgba(0,0,0,0.3)] hover:border-accent-cyan hover:shadow-[0_8px_32px_0_rgba(0,240,255,0.3)] hover:-translate-y-1';

    const sortedPredictions = result?.data?.predictions 
        ? Object.entries(result.data.predictions)
            .filter(([_, prob]) => Math.round(prob * 1000) / 10 > 0)
            .sort((a, b) => b[1] - a[1]) 
        : [];

    return (
        <div className={`bg-glass-bg backdrop-blur-[16px] border-2 border-dashed rounded-[24px] p-8 sm:p-[40px] text-center w-full max-w-[550px] transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] relative overflow-hidden group flex flex-col items-center ${loadingClass}`}>
            <h2 className="text-[24px] font-semibold text-white mt-0 mb-6">{title}</h2>

            {image && (
                <div className="mb-6 relative w-full flex justify-center">
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Aperçu de l'image"
                        className="max-w-full max-h-[220px] rounded-xl object-cover shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-glass-border"
                    />
                    {loading && (
                        <div className="absolute inset-0 bg-[rgba(11,15,25,0.6)] flex justify-center items-center rounded-xl backdrop-blur-[4px]">
                            <div className="text-accent-cyan font-semibold text-lg flex items-center gap-2">
                                Analyse en cours... <span className="animate-[pulse-glow-text_1s_infinite]">✨</span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {error && (
                <div className="bg-[rgba(255,77,77,0.1)] border border-error-color p-3 rounded-lg text-error-color mb-5 w-full">
                    <strong>Erreur :</strong> {error}
                </div>
            )}

            {!loading && !error && result && (
                <div className="bg-[rgba(0,0,0,0.2)] p-5 rounded-xl text-left mb-6 w-full">
                    <p className="text-[1.2em] m-0 mb-5 text-text-main text-center">
                        Prédiction : <strong className="text-accent-cyan text-[1.4em] capitalize ml-1">{result.data.label}</strong>
                    </p>
                    <div className="flex flex-col gap-4">
                        {sortedPredictions.map(([label, prob]) => {
                            const score = Math.round(prob * 1000) / 10;
                            return (
                                <div key={label}>
                                    <div className="flex justify-between text-[14px] text-text-muted mb-1.5 capitalize">
                                        <span>{label}</span>
                                        <span>{score}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full transition-all duration-1000 ease-out" 
                                            style={{ width: `${score}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}