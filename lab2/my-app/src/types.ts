export type Label = "work" | "personal" | "study";

export interface Note {
    id: number;
    title: string;
    content: string;
    label: Label;
    isFavorite: boolean;  // Add this line
}