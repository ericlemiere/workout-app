import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  body: string;
  confirmLabel: string;
  reverse?: boolean;
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  body,
  confirmLabel,
  reverse = false,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-navy/80 backdrop-blur-sm flex items-end justify-center z-50 pb-10 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-charcoal rounded-3xl p-6"
          >
            <h2 className="text-offwhite text-xl font-bold mb-1">{title}</h2>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">{body}</p>
            <div className={`flex ${reverse ? "flex-row-reverse" : "flex-row"} gap-3`}>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl border border-slate-700 bg-slate-700 text-slate-200 font-semibold active:bg-slate-600"
              >
                Cancel
              </button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={onConfirm}
                className="flex-1 py-3 rounded-2xl border border-electric-orange text-electric-orange font-semibold active:bg-electric-orange/20"
              >
                {confirmLabel}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
