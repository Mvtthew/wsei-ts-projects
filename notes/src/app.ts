import app, {db} from "./Firebase";
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs} from "@firebase/firestore";
import INote from "./types/INote";


class App {
    notes: INote[];

    constructor() {
        this.notes = [];
        this.getNotes();
        this.initCreateNoteButton();
    }

    private async createNote(): Promise<void> {
        const title = (document.getElementById('note-title-input') as HTMLInputElement).value;
        const body = (document.getElementById('note-body-input') as HTMLInputElement).value;
        await addDoc(collection(db, "notes"), {
            title,
            body,
        });
        (document.getElementById('note-title-input') as HTMLInputElement).value = '';
        (document.getElementById('note-body-input') as HTMLInputElement).value = '';
        this.getNotes();
    }

    private initCreateNoteButton(): void {
        document.getElementById('add-note-button').addEventListener('click', () => {
            this.createNote();
        });
    }

    private async deleteNote(noteId): Promise<void> {
       await deleteDoc(doc(db, 'notes', noteId));
       this.getNotes();
    }

    private initDeleteNotes(): void {
        document.querySelectorAll('.delete-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.deleteNote(this.notes[index].id);
            });
        });
    }

    private async getNotes(): Promise<void> {
        const querySnapshot = await getDocs(collection(db, 'notes'));
        querySnapshot.forEach((doc) => {
            this.notes.push({title: (doc.data() as INote).title, body: (doc.data() as INote).body, id: doc.id});
        });
        this.renderNotes();
        this.initDeleteNotes();
    }

    private renderNotes(): void {
        this.notes.forEach((note) => {
            const noteBox = document.createElement('div');
            noteBox.classList.add('card', 'w-100', 'p-4', 'my-2');
            noteBox.innerHTML = `<h5>${note.title}</h5><p class="mb-0">${note.body}</p><button class="delete-btn position-absolute end-0 top-0 m-3 btn btn-danger">x</button>`;
            document.getElementById('notes').appendChild(noteBox);
        })
    }

}

new App();