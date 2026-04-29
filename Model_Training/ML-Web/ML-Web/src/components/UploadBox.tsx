interface UploadBoxProps {
    onImageUpload: (image: File) => void;
}

export default function UploadBox({ onImageUpload }: UploadBoxProps) {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onImageUpload(e.target.files[0]);
        }
    };

    return (
        <div className="bg-glass-bg backdrop-blur-[16px] border-2 border-dashed border-[rgba(255,255,255,0.2)] rounded-[24px] p-10 sm:p-[60px_40px] text-center w-full max-w-[550px] shadow-[inset_0_0_0_1px_var(--color-glass-border),0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] relative overflow-hidden group hover:border-accent-cyan hover:shadow-[0_8px_32px_0_rgba(0,240,255,0.3)] hover:-translate-y-1 flex flex-col items-center">
            <svg 
                className="w-16 h-16 mb-5 text-accent-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.4)] transition-transform duration-300 ease-out group-hover:-translate-y-1.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <h2 className="text-[24px] font-semibold text-white mt-0 mb-4">Analyse d'image par IA</h2>
            <p className="text-text-muted text-[16px] mb-[30px] leading-relaxed">Glissez-déposez une image ou cliquez pour parcourir.</p>

            <div className="relative overflow-hidden inline-block group/btn">
                <div className="bg-gradient-to-br from-accent-purple to-accent-cyan text-white py-3 px-7 rounded-full text-[16px] font-semibold cursor-pointer transition-all duration-300 ease-out shadow-[0_4px_15px_rgba(0,240,255,0.3)] inline-flex items-center gap-2 group-hover/btn:scale-105 group-hover/btn:shadow-[0_6px_20px_rgba(0,240,255,0.5)]">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Sélectionner une image
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute left-0 top-0 opacity-0 w-full h-full cursor-pointer z-10"
                />
            </div>
        </div>
    )
}