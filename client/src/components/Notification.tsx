import React, { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, Info, XCircle, X } from "lucide-react";

export type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationProps {
    id: string;
    message: string;
    type: NotificationType;
    onClose: (id: string) => void;
    duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
    id,
    message,
    type,
    onClose,
    duration = 5000,
}) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => onClose(id), 300); // Wait for animation
    };

    const icons = {
        success: <CheckCircle2 className="text-green-500" size={18} />,
        error: <XCircle className="text-red-500" size={18} />,
        warning: <AlertCircle className="text-amber-500" size={18} />,
        info: <Info className="text-indigo-500" size={18} />,
    };

    const styles = {
        success: "border-green-100 bg-green-50/50 text-green-900",
        error: "border-red-100 bg-red-50/50 text-red-900",
        warning: "border-amber-100 bg-amber-50/50 text-amber-900",
        info: "border-indigo-100 bg-indigo-50/50 text-indigo-900",
    };

    return (
        <div
            className={`
        flex items-center gap-3 p-4 pr-10 rounded-2xl border backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300
        ${styles[type]}
        ${isClosing ? "animate-out fade-out slide-out-to-right-10 fill-mode-forwards" : ""}
      `}
        >
            <div className="shrink-0">{icons[type]}</div>
            <p className="text-sm font-bold tracking-tight leading-tight">{message}</p>
            <button
                onClick={handleClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/5 transition-colors opacity-40 hover:opacity-100"
            >
                <X size={14} />
            </button>
        </div>
    );
};

export const NotificationContainer: React.FC<{
    notifications: { id: string; message: string; type: NotificationType }[];
    removeNotification: (id: string) => void;
}> = ({ notifications, removeNotification }) => {
    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col-reverse gap-3 pointer-events-none max-w-sm w-full">
            {notifications.map((notification) => (
                <div key={notification.id} className="pointer-events-auto">
                    <Notification
                        {...notification}
                        onClose={removeNotification}
                    />
                </div>
            ))}
        </div>
    );
};
