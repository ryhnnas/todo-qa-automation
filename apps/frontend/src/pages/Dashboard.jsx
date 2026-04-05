import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.js';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) navigate('/login');
      else fetchTasks();
    };
    checkUser();
  }, [navigate]);

  const fetchTasks = async () => {
    const { data } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
    setTasks(data || []);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask) return;
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('tasks').insert([{ title: newTask, user_id: user.id, is_completed: false }]);
    setNewTask('');
    fetchTasks();
  };

  // --- FITUR UPDATE (CHECKLIST) ---
  const toggleComplete = async (id, currentStatus) => {
    await supabase.from('tasks').update({ is_completed: !currentStatus }).eq('id', id);
    fetchTasks();
  };

  // --- FITUR DELETE ---
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Hapus tugas ini?");
    if (confirmDelete) {
      await supabase.from('tasks').delete().eq('id', id);
      fetchTasks();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800">My Tasks</h1>
          <button onClick={handleLogout} data-testid="btn-logout" className="text-red-500 font-semibold">Logout</button>
        </div>

        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input 
            className="flex-1 p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
            value={newTask} 
            onChange={e => setNewTask(e.target.value)} 
            data-testid="input-new-task" 
            placeholder="Add a new task..." 
          />
          <button type="submit" data-testid="btn-add-task" className="bg-blue-600 text-white px-6 rounded-xl font-bold">Add</button>
        </form>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {tasks.map(t => (
            <div key={t.id} className="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition">
              <div className="flex items-center gap-4">
                {/* CHECKBOX UNTUK UPDATE */}
                <input 
                  type="checkbox" 
                  checked={t.is_completed} 
                  onChange={() => toggleComplete(t.id, t.is_completed)}
                  data-testid={`check-${t.id}`}
                  className="w-5 h-5 cursor-pointer"
                />
                <span className={`${t.is_completed ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                  {t.title}
                </span>
              </div>
              
              {/* TOMBOL DELETE */}
              <button 
                onClick={() => deleteTask(t.id)} 
                data-testid={`btn-delete-${t.id}`}
                className="text-slate-400 hover:text-red-500 transition p-2"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}