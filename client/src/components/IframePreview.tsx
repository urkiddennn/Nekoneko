import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface IframePreviewProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
    style?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    darkMode?: boolean;
}

const IframePreview: React.FC<IframePreviewProps> = ({
    children,
    title = 'Preview',
    className,
    style,
    contentStyle,
    darkMode = false
}) => {
    const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
    const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!contentRef?.contentWindow) return;

        const doc = contentRef.contentWindow.document;

        // Write the initial document structure with correct DOCTYPE to ensure Standards Mode
        doc.open();
        doc.write(`
            <!DOCTYPE html>
            <html class="${darkMode ? 'dark' : ''}">
                <head>
                    <style>
                        html, body { 
                            margin: 0; 
                            height: 100%;
                            transition: background-color 0.2s ease, color 0.2s ease;
                        }
                        html.dark body {
                            background-color: #020617 !important; /* slate-950 */
                            color: #ffffff !important;
                        }
                        html:not(.dark) body {
                            background-color: #ffffff !important;
                            color: #020617 !important; /* slate-950 */
                        }
                    </style>
                </head>
                <body></body>
            </html>
        `);
        doc.close();

        // Set the mount node to the new body
        setMountNode(doc.body);

        // Copy all styles and links from the main document
        const copyStyles = () => {
            const head = doc.head;

            // Clear existing styles in iframe head to prevent duplication on re-runs (though we just wiped it)
            // But we keep the initial style we just added.

            // Copy link tags (stylesheets, fonts, etc.)
            Array.from(document.querySelectorAll('link')).forEach(link => {
                if (link.rel === 'stylesheet' || link.rel === 'preconnect' || link.rel === 'preload') {
                    const newLink = link.cloneNode(true) as HTMLLinkElement;
                    head.appendChild(newLink);
                }
            });

            // Copy style tags (Tailwind injected styles, etc.)
            Array.from(document.querySelectorAll('style')).forEach(style => {
                const newStyle = style.cloneNode(true);
                head.appendChild(newStyle);
            });
        };

        // Initial copy
        copyStyles();

        // Observe head changes in the main document to sync dynamic style injections
        const observer = new MutationObserver(() => {
            copyStyles();
        });

        observer.observe(document.head, { childList: true, subtree: true });

        setMounted(true);

        return () => observer.disconnect();
    }, [contentRef]);

    useEffect(() => {
        if (!contentRef?.contentWindow) return;
        const html = contentRef.contentWindow.document.documentElement;
        if (darkMode) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }, [darkMode, contentRef, mounted]);

    return (
        <iframe
            title={title}
            ref={setContentRef}
            className={className}
            style={{ ...style, border: 'none' }}
        >
            {mountNode && mounted && createPortal(
                <div style={{ height: '100%', ...contentStyle }}>
                    {children}
                </div>,
                mountNode
            )}
        </iframe>
    );
};

export default IframePreview;
