import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  contentUrl?: string; // lien du PDF ou image
}

export default function Modal({ show, onClose, title, contentUrl }: ModalProps) {
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white dark:bg-slate-900 rounded-xl shadow-xl p-6 max-w-3xl w-[90%] relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl font-bold"
          >
            ×
          </button>

          {title && (
            <h3 className="text-xl font-semibold mb-4 text-center text-blue-500 dark:text-blue-400">
              {title}
            </h3>
          )}

          {contentUrl ? (
            contentUrl.endsWith(".pdf") ? (
              <iframe
                src={contentUrl}
                className="w-full h-[70vh] rounded-md"
                title="Attestation"
              />
            ) : (
              <img
                src={contentUrl}
                alt="Attestation"
                className="w-full rounded-md"
              />
            )
          ) : (
            <p className="text-center text-gray-400">
              Aucun document disponible.
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
