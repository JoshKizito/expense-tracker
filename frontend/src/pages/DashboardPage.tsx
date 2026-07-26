import { useAuth } from "@/features/auth/hooks/useAuth";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Bonjour, {user?.name} 👋</h1>
        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Déconnexion
        </button>
      </div>
      <p className="text-gray-500 dark:text-gray-400">
        Dashboard réel à venir — Étape 8. Authentification fonctionnelle ✅
      </p>
    </div>
  );
}
