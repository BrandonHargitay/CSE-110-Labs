import { Note, Label } from './types';

export const dummyNotesList: Note[] = [
    {
        id: 1,
        title: "Meeting Notes",
        content: "Discuss project timeline",
        label: Label.work,
        isFavorite: false
    },
    {
        id: 2,
        title: "Shopping List",
        content: "Milk, eggs, bread",
        label: Label.personal,
        isFavorite: false
    },
    {
        id: 3,
        title: "Study Plan",
        content: "Review chapter 5",
        label: Label.study,
        isFavorite: false
    },
    {
        id: 4,
        title: "Workout Plan",
        content: "30 minutes cardio, 20 minutes strength training",
        label: Label.personal,
        isFavorite: false
    },
    {
        id: 5,
        title: "Project Ideas",
        content: "Brainstorm new app concepts",
        label: Label.work,
        isFavorite: false
    }
];