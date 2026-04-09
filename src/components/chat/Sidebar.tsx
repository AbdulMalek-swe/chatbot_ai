import { useChat } from '../../contexts/ChatContext';
import { Plus, Trash2, PanelLeftClose, PanelLeftOpen, Megaphone, LayoutGrid, MessageCircle, MoreVertical, LogOut, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useEffect, useRef } from 'react';

const Sidebar = () => {
    const { activeThreadId, createNewChat, setActiveThread, deleteThread } = useChat();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };

        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showUserMenu]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleNewChat = () => {
        navigate('/new-chat');
    };

    const handleSelectThread = (threadId: string) => {
        setActiveThread(threadId);
        navigate(`/chat/${threadId}`);
    };

    const handleDeleteThread = (e: React.MouseEvent, threadId: string) => {
        e.stopPropagation();
        if (confirm('Delete this chat?')) {
            deleteThread(threadId);
            if (activeThreadId === threadId) {
                navigate('/chat');
            }
        }
    };

    const initials = user?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'B';
    const threads = [{ thread_id: '1', title: 'Shawarma Shop' }, { thread_id: '2', title: 'Vibe' },
    { thread_id: '3', title: 'Rock Bank' }, { thread_id: '4', title: 'Real Estate' },
    { thread_id: '5', title: 'Game' }, { thread_id: '6', title: 'Matcha' },
    { thread_id: '7', title: 'Gamble' }, { thread_id: '8', title: 'AI' },

    ]
    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-72'} flex flex-col h-full transition-all duration-300 relative`}>
            <div className="p-6 pb-2">
                <div className="flex items-center justify-between mb-8">
                    {!isCollapsed && (
                        <button onClick={() => navigate('/chat')} className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                                <img src="/logo.png" alt="punk logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">punk</span>
                        </button>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 transition-colors"
                    >
                        {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
                    </button>
                </div>

                <button
                    onClick={handleNewChat}
                    className={`w-full flex items-center gap-3 bg-slate-900 hover:bg-black text-white p-3.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${isCollapsed ? 'justify-center' : ''}`}
                >
                    <Plus size={18} />
                    {!isCollapsed && <span>New Chat</span>}
                </button>
            </div>

            <nav className="px-3 mt-4 flex flex-col gap-1">
                <button
                    onClick={() => navigate('/campaigns')}
                    className={`nav-tab group ${isCollapsed ? 'justify-center px-0' : 'px-4'} h-10 hover:bg-slate-50 transition-colors rounded-lg mb-1`}
                >
                    <Megaphone size={18} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                    {!isCollapsed && <Link to="/campaigns" className="text-sm font-medium text-slate-500 group-hover:text-slate-900">Campaigns</Link>}
                </button>
                <button
                    onClick={() => navigate('/creative')}
                    className={`nav-tab group ${isCollapsed ? 'justify-center px-0' : 'px-4'} h-10 hover:bg-slate-50 transition-colors rounded-lg`}
                >
                    <LayoutGrid size={18} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                    {!isCollapsed && <span className="text-sm font-medium text-slate-500 group-hover:text-slate-900">Creative</span>}
                </button>
            </nav>

            <div className="flex-1 flex flex-col mt-10 min-h-0 overflow-hidden">
                {!isCollapsed && (
                    <div className="px-6 mb-2">
                        <h3 className="text-xs font-bold text-slate-900 tracking-tight">Chat History</h3>
                        <div className="h-[1px] bg-slate-100 w-full mt-4"></div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto px-2 space-y-0.5 custom-scrollbar mt-2">

                    {threads.map((thread) => (
                        <button
                            key={thread.thread_id}
                            onClick={() => handleSelectThread(thread.thread_id)}
                            className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors rounded-lg group relative ${activeThreadId === thread.thread_id ? 'bg-slate-50' : ''}`}
                        >
                            <MessageCircle size={18} className="shrink-0 text-slate-400" />
                            {!isCollapsed && (
                                <span className="truncate flex-1 text-left text-[13px] font-medium text-slate-500 group-hover:text-slate-900">
                                    {thread.title || 'Untitled Chat'}
                                </span>
                            )}

                            {!isCollapsed && (
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2
                                        size={14}
                                        className="text-slate-400 hover:text-red-500"
                                        onClick={(e) => handleDeleteThread(e, thread.thread_id)}
                                    />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 mt-auto relative" ref={menuRef}>
                {showUserMenu && !isCollapsed && (
                    <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-xl border border-slate-100 p-1 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <button
                            onClick={() => {
                                navigate('/profile');
                                setShowUserMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                            <UserIcon size={16} />
                            <span>Profile</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut size={16} />
                            <span>Log out</span>
                        </button>
                    </div>
                )}

                <div
                    onClick={() => !isCollapsed && setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 px-2 py-1 transition-colors cursor-pointer group"
                >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100">
                        {user?.profile_image ? (
                            <img src={user.profile_image} alt={user.full_name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-600 font-bold text-sm">
                                {initials}
                            </div>
                        )}
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-bold text-slate-900 truncate">{user?.full_name || 'Beck'}</p>
                            <p className="text-[11px] text-slate-400 truncate -mt-0.5">{user?.email || 'beck@gmail.com'}</p>
                        </div>
                    )}
                    {!isCollapsed && (
                        <div className="text-slate-900 hover:text-slate-600 p-1">
                            <MoreVertical size={18} />
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
