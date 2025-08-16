"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditProfileModal({
  isOpen,
  onClose,
  onSave,
  currentUsername,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newUsername: string) => void;
  currentUsername: string;
}) {
  const [username, setUsername] = useState(currentUsername);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className="relative cardthreebg mx-4 p-6 rounded-lg w-full max-w-md shadow-xl text-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex w-full items-center justify-between gap-4  mb-4">
              <h2 className="text-lg md:text-xl font-bold">Edit Username</h2>
              {/* Close Button */}
              <button
                onClick={onClose}
                className="text-white text-xs hover:opacity-80 transition-class bg-[#2121216b] cursor-pointer py-2 px-3 rounded-[4px]"
                aria-label="Close"
              >
                close
              </button>
            </div>

            <input
              title="name"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-md input-bg border focus:border-[#38B9FF] text-white focus:outline-none"
            />
            <div className="text-xs text-[#FACC15] font-medium mt-6">
              Username should consist of alphabets, numbers
            </div>

            <button
              onClick={() => onSave(username)}
              className="w-full mt-4 py-4 bg-[#00C3FE] hover:opacity-80 transition-class rounded text-sm"
            >
              Save
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
