import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser, deleteUser } from '../store/slices/usersSlice';
import { toggleTheme } from '../store/slices/themeSlice';
import type { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { LogOut, Edit, Trash2, ChevronLeft, ChevronRight, Search, Sun, Moon, SortAsc, SortDesc } from 'lucide-react';
import { EditUserModal } from './EditUserModal';
import type { User } from '../types/auth';

export const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, currentPage, totalPages } = useSelector((state: RootState) => state.users);
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchUsers(page));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleDelete = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const filteredAndSortedUsers = users
    .filter(user => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.first_name.toLowerCase().includes(searchLower) ||
        user.last_name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
      const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
      return sortOrder === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center ${isDarkMode ? 'text-red-400' : 'text-red-500'} mt-8`}>
        Error: {error}
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-3xl font-bold">Users</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleThemeToggle}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-800'}`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 w-full rounded-md ${
                isDarkMode
                  ? 'bg-gray-800 text-white border-gray-700 focus:border-indigo-500'
                  : 'bg-white text-gray-900 border-gray-300 focus:border-indigo-500'
              } border focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
            />
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className={`flex items-center px-4 py-2 rounded-md ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
            } border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
          >
            {sortOrder === 'asc' ? (
              <SortAsc className="h-5 w-5 mr-2" />
            ) : (
              <SortDesc className="h-5 w-5 mr-2" />
            )}
            Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedUsers.map((user) => (
            <div
              key={user.id}
              className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <img
                className="w-full h-48 object-cover"
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
              />
              <div className="p-4">
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {user.first_name} {user.last_name}
                </h2>
                <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{user.email}</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className={`p-2 rounded-full ${
                      isDarkMode
                        ? 'text-blue-400 hover:bg-gray-700'
                        : 'text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className={`p-2 rounded-full ${
                      isDarkMode
                        ? 'text-red-400 hover:bg-gray-700'
                        : 'text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-full ${
              isDarkMode
                ? 'text-gray-300 hover:bg-gray-800'
                : 'text-gray-600 hover:bg-gray-100'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full ${
              isDarkMode
                ? 'text-gray-300 hover:bg-gray-800'
                : 'text-gray-600 hover:bg-gray-100'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {editingUser && (
          <EditUserModal
            user={editingUser}
            onClose={() => setEditingUser(null)}
            onSave={(userData) => {
              dispatch(updateUser(userData));
              setEditingUser(null);
            }}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </div>
  );
};