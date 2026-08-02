import { useTranslation } from "react-i18next";

interface ConfirmDeleteModalProps {
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export default function ConfirmDeleteModal({
  description,
  onConfirm,
  onCancel,
  isDeleting,
}: ConfirmDeleteModalProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white dark:bg-gray-800 p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-2">{t("expenses.deleteTitle")}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {t("expenses.deleteBody", { description })}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
          >
            {isDeleting ? t("expenses.deleting") : t("common.delete")}
          </button>
        </div>
      </div>
    </div>
  );
}
