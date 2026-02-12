import React, { useState, useRef } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Upload, X, Image as ImageIcon, Trash2, Loader2, Check, ExternalLink } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AssetLibraryProps {
    onSelect?: (url: string) => void;
    onClose?: () => void;
}

const AssetLibrary: React.FC<AssetLibraryProps> = ({ onSelect, onClose }) => {
    const { token } = useAuth();
    const assets = useQuery(api.assets.listAssets, { token: token || undefined });
    const userStats = useQuery(api.stats.getUserStats, { token: token || undefined });
    const generateUploadUrl = useMutation(api.assets.generateUploadUrl);
    const saveAsset = useMutation(api.assets.saveAsset);
    const deleteAsset = useMutation(api.assets.deleteAsset);

    const [isUploading, setIsUploading] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        try {
            // 1. Get upload URL
            const postUrl = await generateUploadUrl({ token: token || undefined });

            // 2. Upload to Convex Storage
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });

            if (!result.ok) throw new Error("Upload failed");

            const { storageId } = await result.json();

            // 3. Save metadata
            await saveAsset({
                token: token || undefined,
                storageId,
                name: file.name,
                type: file.type,
                size: file.size,
            });

        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDelete = async (e: React.MouseEvent, id: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this asset?")) return;
        try {
            await deleteAsset({ token: token || undefined, id });
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete asset.");
        }
    };

    const handleSelect = (e: React.MouseEvent, url: string, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (onSelect) {
            onSelect(url);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#111] animate-in fade-in duration-300">
            {/* Header */}
            <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ImageIcon size={18} className="text-indigo-400" />
                    <h2 className="font-black text-xs uppercase tracking-widest text-white">Asset Library</h2>
                </div>
                {onClose && (
                    <button onClick={onClose} className="p-1 hover:bg-white/5 rounded transition-colors text-gray-500 hover:text-white">
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Upload Area */}
            <div className="p-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                    ref={fileInputRef}
                />
                <button
                    onMouseDown={(e) => {
                        e.preventDefault();
                        fileInputRef.current?.click();
                    }}
                    disabled={isUploading}
                    className="w-full flex items-center justify-center gap-2 p-8 border-2 border-dashed border-white/[0.06] hover:border-indigo-500/50 hover:bg-indigo-500/5 rounded-xl transition-all group"
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 size={24} className="animate-spin text-indigo-400" />
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Uploading...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <Upload size={24} className="text-gray-500 group-hover:text-indigo-400 transition-colors" />
                            <span className="text-[10px] font-bold text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors">Click to upload</span>
                        </div>
                    )}
                </button>
            </div>

            {/* Assets Grid */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {assets === undefined ? (
                    <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-square bg-white/[0.02] rounded-lg animate-pulse" />
                        ))}
                    </div>
                ) : assets.length === 0 ? (
                    <div className="h-40 flex flex-col items-center justify-center text-center px-4">
                        <ImageIcon size={32} className="text-white/[0.03] mb-2" />
                        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">No assets yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        {assets.map((asset) => (
                            <div
                                key={asset._id}
                                onMouseDown={(e) => handleSelect(e, asset.url!, asset._id)}
                                className="group relative aspect-square bg-black rounded-lg border border-white/[0.04] overflow-hidden hover:border-indigo-500/50 transition-all cursor-pointer active:scale-95"
                            >
                                {asset.url && (
                                    <img
                                        src={asset.url}
                                        alt={asset.name}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all"
                                    />
                                )}

                                {/* Copied Indicator Overlay */}
                                {copiedId === asset._id && (
                                    <div className="absolute inset-0 bg-indigo-500/80 flex flex-col items-center justify-center gap-1 z-20 animate-in fade-in zoom-in duration-200">
                                        <Check size={20} className="text-white" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Copied!</span>
                                    </div>
                                )}

                                {/* Overlay Actions */}
                                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-center justify-end gap-2 z-10">
                                    <button
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            window.open(asset.url!, '_blank');
                                        }}
                                        className="p-1.5 bg-white/[0.1] text-white rounded hover:bg-white/20 transition-all"
                                        title="View Original"
                                    >
                                        <ExternalLink size={12} />
                                    </button>
                                    <button
                                        onMouseDown={(e) => handleDelete(e, asset._id)}
                                        className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 transition-all"
                                        title="Delete"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer usage info */}
            <div className="p-4 border-t border-white/[0.06] bg-black/40">
                {userStats && (
                    <div className="space-y-2">
                        <div className="flex justify-between items-end">
                            <span className="text-[9px] text-gray-400 uppercase font-black tracking-widest leading-none">
                                Storage Space
                            </span>
                            <span className="text-[10px] text-white font-bold leading-none">
                                {Math.round((userStats.storage.used / (1024 * 1024)) * 10) / 10}MB / 40MB
                            </span>
                        </div>
                        <div className="w-full h-1 bg-white/[0.03] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                                style={{ width: `${Math.min(100, (userStats.storage.used / userStats.storage.limit) * 100)}%` }}
                            />
                        </div>
                        <p className="text-[8px] text-gray-600 uppercase font-bold tracking-tighter">
                            Approx. {Math.max(0, Math.round((40 - (userStats.storage.used / (1024 * 1024))) * 10) / 10)}MB remaining
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssetLibrary;
