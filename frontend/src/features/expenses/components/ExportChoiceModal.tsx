import { useTranslation } from "react-i18next";

interface ExportChoiceModalProps {
  totalCount: number;
  filteredCount: number;
  onExportAll: () => void;
  onExportFiltered: () => void;
  onCancel: () => void;
}

export default function ExportChoiceModal({
  totalCount,
  filteredCount,
  onExportAll,
  onExportFiltered,
  onCancel,
}: ExportChoiceModalProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t("dashboard.exportChooseTitle")}
        </h2>

        <div className="space-y-2">
          <button
            onClick={onExportFiltered}
            className="w-full text-left px-4 py-3 rounded-lg border border-primary-500 bg-primary-50 dark:bg-primary-500/10 hover:bg-primary-100 dark:hover:bg-primary-500/20 transition"
          >
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {t("dashboard.exportFiltered")}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{filteredCount} {t("dashboard.exportItems")}</p>
          </button>

          <button
            onClick={onExportAll}
            className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {t("dashboard.exportAll")}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{totalCount} {t("dashboard.exportItems")}</p>
          </button>
        </div>

        <button
          onClick={onCancel}
          className="w-full mt-4 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {t("common.cancel")}
        </button>
      </div>
    </div>
  );
}
