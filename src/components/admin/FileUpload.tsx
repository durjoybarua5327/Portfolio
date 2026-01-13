"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Upload, FileText, X } from 'lucide-react';

interface FileUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    accept?: string;
    bucket?: string;
}

export default function FileUpload({ value, onChange, label = "Upload File", accept = ".pdf", bucket = 'portfolio-assets' }: FileUploadProps) {
    const [uploading, setUploading] = useState(false);

    const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select a file to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `resume_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
            onChange(data.publicUrl);

        } catch (error: any) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">{label}</label>
            <div className="flex items-center gap-4">
                <label className="flex items-center justify-center px-4 py-2 border border-white/10 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-all gap-2">
                    {uploading ? (
                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    ) : (
                        <Upload className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">
                        {uploading ? 'Uploading...' : 'Choose File'}
                    </span>
                    <input
                        type="file"
                        className="hidden"
                        accept={accept}
                        onChange={uploadFile}
                        disabled={uploading}
                    />
                </label>

                {value && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-md border border-primary/20 text-xs text-primary max-w-[200px] truncate">
                        <FileText size={14} />
                        <span className="truncate">{value.split('/').pop()}</span>
                        <button onClick={() => onChange('')} className="hover:text-red-400 ml-1">
                            <X size={14} />
                        </button>
                    </div>
                )}
            </div>
            {value && <p className="text-xs text-muted-foreground break-all">{value}</p>}
        </div>
    );
}
