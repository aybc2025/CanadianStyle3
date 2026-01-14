import React, { useState, useEffect } from 'react';
import { 
  Lock, AlertCircle, LogOut, Plus, Edit, Trash2, Eye, Play, 
  Calendar, FileText, ArrowRight, Save, Loader2 
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import { onAuthChange } from '../services/adminApi';
import { Puzzle, Difficulty, DIFFICULTY_LABELS, DIFFICULTY_COLORS, CreatePuzzleRequest } from '../../shared/types';

// Admin Login
export const AdminLogin: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAdminStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (success) {
      onSuccess();
    } else {
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-slate-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
            <p className="text-stone-500 mt-1">Ma HaKesher</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard
interface AdminDashboardProps {
  onLogout: () => void;
  onEditPuzzle: (puzzle: Puzzle) => void;
  onNewPuzzle: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  onEditPuzzle,
  onNewPuzzle,
}) => {
  const { puzzles, isLoading, error, loadPuzzles, logout, activatePuzzle, deletePuzzle } = useAdminStore();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadPuzzles();
  }, [loadPuzzles]);

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  const handleDelete = async (puzzleId: string) => {
    if (deleteConfirm === puzzleId) {
      await deletePuzzle(puzzleId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(puzzleId);
    }
  };

  const handleActivate = async (puzzleId: string) => {
    await activatePuzzle(puzzleId);
  };

  const getStatusBadge = (status: Puzzle['status']) => {
    const styles = {
      draft: 'bg-stone-100 text-stone-600',
      active: 'bg-green-100 text-green-700',
      archived: 'bg-slate-100 text-slate-600',
    };
    const labels = {
      draft: 'Draft',
      active: 'Active',
      archived: 'Archived',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const sortedPuzzles = [...puzzles].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  return (
    <div className="min-h-screen bg-stone-50" dir="rtl">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Puzzle Management</h1>
            <p className="text-sm text-stone-500">Ma HaKesher</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-stone-200">
            <p className="text-3xl font-bold text-slate-900">{puzzles.length}</p>
            <p className="text-sm text-stone-500">Total Puzzles</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-stone-200">
            <p className="text-3xl font-bold text-green-600">
              {puzzles.filter(p => p.status === 'active').length}
            </p>
            <p className="text-sm text-stone-500">Active</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-stone-200">
            <p className="text-3xl font-bold text-stone-400">
              {puzzles.filter(p => p.status === 'draft').length}
            </p>
            <p className="text-sm text-stone-500">Drafts</p>
          </div>
        </div>

        <button
          onClick={onNewPuzzle}
          className="w-full mb-6 flex items-center justify-center gap-2 py-4 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700"
        >
          <Plus className="w-5 h-5" />
          <span>New Puzzle</span>
        </button>

        {isLoading && puzzles.length === 0 ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
          </div>
        ) : sortedPuzzles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-stone-200">
            <FileText className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500">No puzzles yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedPuzzles.map((puzzle) => (
              <div
                key={puzzle.id}
                className={`bg-white rounded-xl border-2 p-4 hover:shadow-md transition-shadow ${
                  puzzle.status === 'active' ? 'border-green-300' : 'border-stone-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-slate-900">{puzzle.title}</h3>
                      {getStatusBadge(puzzle.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-stone-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(puzzle.publishDate).toLocaleDateString('he-IL')}
                      </span>
                      <span>{puzzle.groups.length}/4 groups</span>
                    </div>
                    {puzzle.groups.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {puzzle.groups.map((group) => (
                          <span
                            key={group.id}
                            className="text-xs px-2 py-1 rounded"
                            style={{ backgroundColor: DIFFICULTY_COLORS[group.difficulty] + '40' }}
                          >
                            {group.name} ({DIFFICULTY_LABELS[group.difficulty]})
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEditPuzzle(puzzle)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    {puzzle.status !== 'active' && puzzle.groups.length === 4 && (
                      <button
                        onClick={() => handleActivate(puzzle.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        title="Activate (deactivates others)"
                      >
                        <Play className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(puzzle.id)}
                      className={`p-2 rounded-lg ${
                        deleteConfirm === puzzle.id
                          ? 'bg-red-100 text-red-600'
                          : 'text-red-500 hover:bg-red-50'
                      }`}
                      title={deleteConfirm === puzzle.id ? 'Click again to confirm' : 'Delete'}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// Puzzle Editor
interface PuzzleEditorProps {
  puzzle?: Puzzle;
  onBack: () => void;
  onSave: (puzzle: CreatePuzzleRequest) => Promise<void>;
}

interface GroupFormData {
  name: string;
  difficulty: Difficulty;
  words: string[];
}

const emptyGroup: GroupFormData = {
  name: '',
  difficulty: 'easy',
  words: ['', '', '', ''],
};

export const PuzzleEditor: React.FC<PuzzleEditorProps> = ({ puzzle, onBack, onSave }) => {
  const [title, setTitle] = useState(puzzle?.title || 'New Puzzle');
  const [publishDate, setPublishDate] = useState(
    puzzle?.publishDate || new Date().toISOString().split('T')[0]
  );
  const [groups, setGroups] = useState<GroupFormData[]>(
    puzzle?.groups.map(g => ({
      name: g.name,
      difficulty: g.difficulty,
      words: g.words.map(w => w.text),
    })) || []
  );
  const [editingGroupIndex, setEditingGroupIndex] = useState<number | null>(null);
  const [editingGroup, setEditingGroup] = useState<GroupFormData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleAddGroup = () => {
    if (groups.length >= 4) return;
    setEditingGroup({ ...emptyGroup });
    setEditingGroupIndex(groups.length);
  };

  const handleEditGroup = (index: number) => {
    setEditingGroup({ ...groups[index] });
    setEditingGroupIndex(index);
  };

  const handleSaveGroup = () => {
    if (!editingGroup || editingGroupIndex === null) return;

    const filledWords = editingGroup.words.filter(w => w.trim());
    if (filledWords.length !== 4) {
      alert('Each group needs exactly 4 words');
      return;
    }
    if (!editingGroup.name.trim()) {
      alert('Group name is required');
      return;
    }

    const newGroups = [...groups];
    if (editingGroupIndex < groups.length) {
      newGroups[editingGroupIndex] = { ...editingGroup, words: filledWords };
    } else {
      newGroups.push({ ...editingGroup, words: filledWords });
    }
    
    setGroups(newGroups);
    setEditingGroup(null);
    setEditingGroupIndex(null);
  };

  const handleDeleteGroup = (index: number) => {
    setGroups(groups.filter((_, i) => i !== index));
  };

  const validate = (): boolean => {
    const newErrors: string[] = [];
    
    if (!title.trim()) newErrors.push('Title is required');
    if (!publishDate) newErrors.push('Publish date is required');
    if (groups.length !== 4) newErrors.push('Exactly 4 groups required');
    
    // Check for duplicate words
    const allWords = groups.flatMap(g => g.words.map(w => w.toLowerCase().trim()));
    const duplicates = allWords.filter((w, i) => allWords.indexOf(w) !== i);
    if (duplicates.length > 0) {
      newErrors.push(`Duplicate words: ${[...new Set(duplicates)].join(', ')}`);
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    
    setIsSaving(true);
    try {
      await onSave({
        title,
        publishDate,
        groups: groups.map(g => ({
          name: g.name,
          difficulty: g.difficulty,
          words: g.words,
        })),
      });
      onBack();
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Save failed']);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50" dir="rtl">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-stone-100 rounded-lg">
            <ArrowRight className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-slate-900 flex-1">
            {puzzle ? 'Edit Puzzle' : 'New Puzzle'}
          </h1>
          <button
            onClick={handleSave}
            disabled={isSaving || groups.length !== 4}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save</span>
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <ul className="space-y-1">
              {errors.map((err, i) => (
                <li key={i} className="text-sm text-red-600">• {err}</li>
              ))}
            </ul>
          </div>
        )}

        <section className="bg-white rounded-xl border border-stone-200 p-4 space-y-4">
          <h2 className="font-bold text-slate-900">Puzzle Details</h2>
          
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Publish Date</label>
            <input
              type="date"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
        </section>

        <section className="bg-white rounded-xl border border-stone-200 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Groups ({groups.length}/4)</h2>
            {groups.length < 4 && (
              <button
                onClick={handleAddGroup}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Group</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {groups.map((group, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border-2"
                style={{ 
                  borderColor: DIFFICULTY_COLORS[group.difficulty],
                  backgroundColor: DIFFICULTY_COLORS[group.difficulty] + '15',
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900">{group.name}</h3>
                    <span className="text-xs text-stone-500">{DIFFICULTY_LABELS[group.difficulty]}</span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEditGroup(index)}
                      className="px-2 py-1 text-xs bg-white text-slate-600 rounded hover:bg-stone-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteGroup(index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.words.map((word, wi) => (
                    <span key={wi} className="px-2 py-1 bg-white rounded text-sm text-slate-700">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Group Editor Modal */}
        {editingGroup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                {editingGroupIndex !== null && editingGroupIndex < groups.length ? 'Edit Group' : 'New Group'}
              </h3>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Connection Name</label>
                <input
                  type="text"
                  value={editingGroup.name}
                  onChange={(e) => setEditingGroup({ ...editingGroup, name: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="e.g., Colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Difficulty</label>
                <select
                  value={editingGroup.difficulty}
                  onChange={(e) => setEditingGroup({ ...editingGroup, difficulty: e.target.value as Difficulty })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  {Object.entries(DIFFICULTY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">4 Words</label>
                <div className="grid grid-cols-2 gap-2">
                  {editingGroup.words.map((word, index) => (
                    <input
                      key={index}
                      type="text"
                      value={word}
                      onChange={(e) => {
                        const newWords = [...editingGroup.words];
                        newWords[index] = e.target.value;
                        setEditingGroup({ ...editingGroup, words: newWords });
                      }}
                      className="px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder={`Word ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSaveGroup}
                  className="flex-1 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => { setEditingGroup(null); setEditingGroupIndex(null); }}
                  className="flex-1 py-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
