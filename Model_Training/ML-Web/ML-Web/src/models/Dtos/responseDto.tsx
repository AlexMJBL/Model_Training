export interface ResponseDto {
    success: boolean;
    data: {
        label: string;
        confidence: number;
        index: number;
        predictions: {
            [key: string]: number;
        }
    }
}