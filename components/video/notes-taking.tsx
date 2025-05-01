"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistance } from "date-fns";

interface NotesTakingProps {
  lectureId: string;
}

export function NotesTaking({ lectureId }: NotesTakingProps) {
  const [notes, setNotes] = useState<{ id: string; content: string; timestamp: Date }[]>([
    {
      id: "1",
      content: "Flexbox main axis vs cross axis - remember that flex-direction determines which is which!",
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      id: "2",
      content: "display: flex on the parent element, then use justify-content for main axis alignment and align-items for cross axis alignment.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
    }
  ]);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      const newNoteItem = {
        id: Date.now().toString(),
        content: newNote,
        timestamp: new Date()
      };
      
      setNotes([newNoteItem, ...notes]);
      setNewNote("");
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Add a note about this lecture..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={handleAddNote} className="w-full">
              Save Note
            </Button>
          </div>
          
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-medium">Your Notes</h3>
            
            {notes.length > 0 ? (
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="p-4 border rounded-md">
                    <p className="mb-2">{note.content}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistance(note.timestamp, new Date(), { addSuffix: true })}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-6">
                No notes yet. Add your first note above!
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}