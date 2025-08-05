'use client';

// Import necessary hooks and utilities
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

/**
 * Interface defining the structure of a kanban note/task
 */
interface Note {
  id: string;
  title: string;
  content: string;
  status: 'todo' | 'in-progress' | 'done';
  created_at: string;
}

/**
 * Hack Board Dashboard - Terminal-themed Kanban Board
 * 
 * Main dashboard component that displays a retro terminal-style kanban board
 * with three columns: TODO, IN PROGRESS, and DONE. Users can create, move,
 * and delete tasks with a hacker aesthetic interface.
 */
export default function DashboardPage() {
  // Navigation and authentication state
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  
  // Kanban board state
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [isAddingNote, setIsAddingNote] = useState(false);

  /**
   * Authentication Effect
   * Handles initial session setup and listens for auth state changes
   */
  useEffect(() => {
    // Get initial session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for authentication state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // Redirect to login if user logs out
      if (!session) {
        router.push('/auth/login');
      }
    });

    // Cleanup subscription on component unmount
    return () => subscription.unsubscribe();
  }, [router]);

  /**
   * Demo Data Effect
   * Loads mock kanban data when user is authenticated
   * TODO: Replace with actual Supabase database queries
   */
  useEffect(() => {
    if (session) {
      // Mock data for demonstration - replace with actual DB calls
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

  /**
   * Handle user logout with error handling
   * Signs out from Supabase and redirects to login page
   */
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Force redirect even if logout fails
      router.push('/auth/login');
    }
  };

  /**
   * Add new task to the kanban board
   * Creates a new note with TODO status and resets the form
   */
  const addNote = () => {
    // Validate that both title and content are provided
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(), // Simple ID generation - use UUID in production
        title: newNote.title,
        content: newNote.content,
        status: 'todo', // New tasks start in TODO column
        created_at: new Date().toISOString(),
      };
      
      // Add to notes array and reset form
      setNotes([...notes, note]);
      setNewNote({ title: '', content: '' });
      setIsAddingNote(false);
    }
  };

  /**
   * Move task between kanban columns
   * Updates the status of a specific note
   */
  const moveNote = (noteId: string, newStatus: 'todo' | 'in-progress' | 'done') => {
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, status: newStatus } : note
    ));
  };

  /**
   * Delete task from kanban board
   * Removes note from the notes array
   */
  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  // Enhanced loading state with terminal styling
  if (!session) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="bg-[#1a1a1a] border border-[#00ff00] rounded-lg p-8 text-center">
          <div className="text-[#00ff00] font-mono mb-4">
            <div className="mb-2">┌─ HACK BOARD ─┐</div>
            <div className="text-sm">🔄 INITIALIZING SYSTEM...</div>
          </div>
          <div className="flex justify-center space-x-1 text-[#00ff00]">
            <div className="animate-pulse">█</div>
            <div className="animate-pulse delay-75">█</div>
            <div className="animate-pulse delay-150">█</div>
          </div>
          <div className="text-[#888888] font-mono text-xs mt-4">
            $ auth --verify-session
          </div>
        </div>
      </div>
    );
  }

  /**
   * Filter notes by status for kanban columns
   * Returns array of notes matching the specified status
   */
  const getStatusNotes = (status: 'todo' | 'in-progress' | 'done') => {
    return notes.filter(note => note.status === status);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex justify-center">
      <div className="terminal-content w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Terminal Header */}
        <div className="bg-[#1a1a1a] border border-[#00ff00] rounded-t-lg">
          <div className="bg-[#00ff00] text-[#0a0a0a] px-3 py-2 font-mono font-bold text-sm">
            ┌─ HACK BOARD v1.0 ─ {session.user.email} ─┐
          </div>
          <div className="p-3 text-[#00ff00] font-mono text-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-[#00ff00]">$</span> <span className="text-[#ffffff]">kanban --status</span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsAddingNote(!isAddingNote)}
                  className="text-[#ffff00] hover:text-[#ffffff] border border-[#ffff00] px-2 py-1 rounded text-xs"
                >
                  [+ ADD]
                </button>
                <button
                  onClick={handleLogout}
                  className="text-[#ff0000] hover:text-[#ffffff] border border-[#ff0000] px-2 py-1 rounded text-xs"
                >
                  [LOGOUT]
                </button>
              </div>
            </div>
            
            {/* Add Note Form */}
            {isAddingNote && (
              <div className="bg-[#2a2a2a] border border-[#ffff00] p-3 mb-3 rounded">
                <div className="text-[#ffff00] mb-2">┌─ NEW NOTE ─┐</div>
                <input
                  type="text"
                  placeholder="Title..."
                  value={newNote.title}
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  className="w-full bg-[#0a0a0a] text-[#00ff00] border border-[#00ff00] p-2 mb-2 font-mono text-sm"
                />
                <textarea
                  placeholder="Content..."
                  value={newNote.content}
                  onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                  className="w-full bg-[#0a0a0a] text-[#00ff00] border border-[#00ff00] p-2 mb-2 font-mono text-sm h-16 resize-none"
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
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-6">
          
          {/* TODO Column */}
          <div className="bg-[#1a1a1a] border border-[#ff0000] rounded">
            <div className="bg-[#ff0000] text-[#ffffff] px-4 py-2 font-mono font-bold">
              ┌─ TODO ({getStatusNotes('todo').length}) ─┐
            </div>
            <div className="p-4 space-y-3 min-h-[400px]">
              {getStatusNotes('todo').map(note => (
                <div key={note.id} className="bg-[#2a2a2a] border border-[#666666] p-3 rounded hover:border-[#888888] transition-colors">
                  <div className="text-[#ffffff] font-mono font-bold mb-2">{note.title}</div>
                  <div className="text-[#cccccc] font-mono text-sm mb-3">{note.content}</div>
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
            <div className="p-4 space-y-3 min-h-[400px]">
              {getStatusNotes('in-progress').map(note => (
                <div key={note.id} className="bg-[#2a2a2a] border border-[#666666] p-3 rounded hover:border-[#888888] transition-colors">
                  <div className="text-[#ffffff] font-mono font-bold mb-2">{note.title}</div>
                  <div className="text-[#cccccc] font-mono text-sm mb-3">{note.content}</div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex gap-2">
                      <button
                        onClick={() => moveNote(note.id, 'todo')}
                        className="text-[#ff0000] hover:text-[#ffffff]"
                      >
                        [← TODO]
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
            <div className="p-4 space-y-3 min-h-[400px]">
              {getStatusNotes('done').map(note => (
                <div key={note.id} className="bg-[#2a2a2a] border border-[#666666] p-3 rounded hover:border-[#888888] transition-colors">
                  <div className="text-[#ffffff] font-mono font-bold mb-2">{note.title}</div>
                  <div className="text-[#cccccc] font-mono text-sm mb-3">{note.content}</div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex gap-2">
                      <button
                        onClick={() => moveNote(note.id, 'todo')}
                        className="text-[#ff0000] hover:text-[#ffffff]"
                      >
                        [← TODO]
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
        </div>

        {/* Terminal Footer */}
        <div className="bg-[#1a1a1a] border border-[#00ff00] rounded-b-lg p-4 mt-6">
          <div className="text-[#00ff00] font-mono text-sm">
            <span className="text-[#00ff00]">$</span> <span className="text-[#888888]">Status: {notes.length} total notes | Ready for input...</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
