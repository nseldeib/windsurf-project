'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

interface Note {
  id: string;
  title: string;
  content: string;
  status: 'todo' | 'in-progress' | 'done';
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [isAddingNote, setIsAddingNote] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        router.push('/auth/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Mock data for demo - in real app this would come from Supabase
  useEffect(() => {
    if (session) {
      setNotes([
        {
          id: '1',
          title: 'Setup project',
          content: 'Initialize Next.js with Supabase',
          status: 'done',
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Build authentication',
          content: 'Implement login/signup flow',
          status: 'done',
          created_at: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Create kanban board',
          content: 'Build retro-terminal style interface',
          status: 'in-progress',
          created_at: new Date().toISOString(),
        },
        {
          id: '4',
          title: 'Add database integration',
          content: 'Connect notes to Supabase database',
          status: 'todo',
          created_at: new Date().toISOString(),
        },
      ]);
    }
  }, [session]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        status: 'todo',
        created_at: new Date().toISOString(),
      };
      setNotes([...notes, note]);
      setNewNote({ title: '', content: '' });
      setIsAddingNote(false);
    }
  };

  const moveNote = (noteId: string, newStatus: 'todo' | 'in-progress' | 'done') => {
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, status: newStatus } : note
    ));
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-[#00ff00] font-mono">Loading...</div>
      </div>
    );
  }

  const getStatusNotes = (status: 'todo' | 'in-progress' | 'done') => {
    return notes.filter(note => note.status === status);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4">
      <div className="max-w-7xl mx-auto">
      {/* Terminal Header */}
      <div className="bg-[#1a1a1a] border border-[#00ff00] rounded-t-lg">
        <div className="bg-[#00ff00] text-[#0a0a0a] px-4 py-2 font-mono font-bold">
          ┌─ TERMINAL KANBAN v1.0 ─ {session.user.email} ─┐
        </div>
        <div className="p-4 text-[#00ff00] font-mono">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-[#00ff00]">$</span> <span className="text-[#ffffff]">kanban --status</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setIsAddingNote(!isAddingNote)}
                className="text-[#ffff00] hover:text-[#ffffff] border border-[#ffff00] px-3 py-1 rounded text-sm"
              >
                [+ ADD]
              </button>
              <button
                onClick={handleLogout}
                className="text-[#ff0000] hover:text-[#ffffff] border border-[#ff0000] px-3 py-1 rounded text-sm"
              >
                [LOGOUT]
              </button>
            </div>
          </div>
          
          {/* Add Note Form */}
          {isAddingNote && (
            <div className="bg-[#2a2a2a] border border-[#ffff00] p-4 mb-4 rounded">
              <div className="text-[#ffff00] mb-2">┌─ NEW NOTE ─┐</div>
              <input
                type="text"
                placeholder="Title..."
                value={newNote.title}
                onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                className="w-full bg-[#0a0a0a] text-[#00ff00] border border-[#00ff00] p-2 mb-2 font-mono"
              />
              <textarea
                placeholder="Content..."
                value={newNote.content}
                onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                className="w-full bg-[#0a0a0a] text-[#00ff00] border border-[#00ff00] p-2 mb-2 font-mono h-20 resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={addNote}
                  className="text-[#00ff00] border border-[#00ff00] px-3 py-1 rounded hover:bg-[#00ff00] hover:text-[#0a0a0a]"
                >
                  [SAVE]
                </button>
                <button
                  onClick={() => setIsAddingNote(false)}
                  className="text-[#ff0000] border border-[#ff0000] px-3 py-1 rounded hover:bg-[#ff0000] hover:text-[#0a0a0a]"
                >
                  [CANCEL]
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* TODO Column */}
        <div className="bg-[#1a1a1a] border border-[#ff0000] rounded">
          <div className="bg-[#ff0000] text-[#ffffff] px-4 py-2 font-mono font-bold">
            ┌─ TODO ({getStatusNotes('todo').length}) ─┐
          </div>
          <div className="p-4 space-y-3 min-h-[300px]">
            {getStatusNotes('todo').map(note => (
              <div key={note.id} className="bg-[#2a2a2a] border border-[#666666] p-3 rounded">
                <div className="text-[#ffffff] font-mono font-bold mb-1">{note.title}</div>
                <div className="text-[#cccccc] font-mono text-sm mb-2">{note.content}</div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex gap-2">
                    <button
                      onClick={() => moveNote(note.id, 'in-progress')}
                      className="text-[#ffff00] hover:text-[#ffffff]"
                    >
                      [→PROG]
                    </button>
                    <button
                      onClick={() => moveNote(note.id, 'done')}
                      className="text-[#00ff00] hover:text-[#ffffff]"
                    >
                      [→DONE]
                    </button>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-[#ff0000] hover:text-[#ffffff]"
                  >
                    [DEL]
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IN PROGRESS Column */}
        <div className="bg-[#1a1a1a] border border-[#ffff00] rounded">
          <div className="bg-[#ffff00] text-[#0a0a0a] px-4 py-2 font-mono font-bold">
            ┌─ IN PROGRESS ({getStatusNotes('in-progress').length}) ─┐
          </div>
          <div className="p-4 space-y-3 min-h-[300px]">
            {getStatusNotes('in-progress').map(note => (
              <div key={note.id} className="bg-[#2a2a2a] border border-[#666666] p-3 rounded">
                <div className="text-[#ffffff] font-mono font-bold mb-1">{note.title}</div>
                <div className="text-[#cccccc] font-mono text-sm mb-2">{note.content}</div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex gap-2">
                    <button
                      onClick={() => moveNote(note.id, 'todo')}
                      className="text-[#ff0000] hover:text-[#ffffff]"
                    >
                      [←TODO]
                    </button>
                    <button
                      onClick={() => moveNote(note.id, 'done')}
                      className="text-[#00ff00] hover:text-[#ffffff]"
                    >
                      [→DONE]
                    </button>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-[#ff0000] hover:text-[#ffffff]"
                  >
                    [DEL]
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DONE Column */}
        <div className="bg-[#1a1a1a] border border-[#00ff00] rounded">
          <div className="bg-[#00ff00] text-[#0a0a0a] px-4 py-2 font-mono font-bold">
            ┌─ DONE ({getStatusNotes('done').length}) ─┐
          </div>
          <div className="p-4 space-y-3 min-h-[300px]">
            {getStatusNotes('done').map(note => (
              <div key={note.id} className="bg-[#2a2a2a] border border-[#666666] p-3 rounded">
                <div className="text-[#ffffff] font-mono font-bold mb-1">{note.title}</div>
                <div className="text-[#cccccc] font-mono text-sm mb-2">{note.content}</div>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex gap-2">
                    <button
                      onClick={() => moveNote(note.id, 'todo')}
                      className="text-[#ff0000] hover:text-[#ffffff]"
                    >
                      [←TODO]
                    </button>
                    <button
                      onClick={() => moveNote(note.id, 'in-progress')}
                      className="text-[#ffff00] hover:text-[#ffffff]"
                    >
                      [←PROG]
                    </button>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-[#ff0000] hover:text-[#ffffff]"
                  >
                    [DEL]
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Terminal Footer */}
      <div className="bg-[#1a1a1a] border border-[#00ff00] rounded-b-lg p-4">
        <div className="text-[#00ff00] font-mono text-sm">
          <span className="text-[#00ff00]">$</span> <span className="text-[#888888]">Status: {notes.length} total notes | Ready for input...</span>
        </div>
      </div>
      </div>
    </div>
  );
}
