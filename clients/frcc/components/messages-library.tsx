'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Play, Search, X } from 'lucide-react';
import type { ChurchMessage } from '@/lib/church-updates';
import { safeMediaUrl, youtubeVideoId } from '@/lib/video';
import { publicAsset } from '@/lib/public-asset';

export function MessagesLibrary({ messages }: { messages: ChurchMessage[] }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<ChurchMessage | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const shown = messages.filter((message) =>
    [message.title, message.speaker, message.series]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  useEffect(() => {
    if (selected) dialog.current?.showModal();
  }, [selected]);
  function close() {
    dialog.current?.close();
    setSelected(null);
  }
  return (
    <>
      {messages.length > 1 && (
        <label className="message-search">
          <Search size={20} aria-hidden="true" />
          <span className="sr-only">
            Search messages by title, speaker, or series
          </span>
          <input
            type="search"
            placeholder="Search messages"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      )}
      <p className="sr-only" aria-live="polite">
        {shown.length} messages found
      </p>
      <ul className="recording-grid">
        {shown.map((message) => {
          const videoUrl = safeMediaUrl(message.videoUrl);
          const audioUrl = safeMediaUrl(message.audioUrl);
          const videoId = message.videoUrl
            ? youtubeVideoId(message.videoUrl)
            : null;
          return (
            <li key={message.id} className="recording-item">
              <div className="recording-art">
                <img
                  src={publicAsset('/images/bible-reading.jpg')}
                  alt=""
                  loading="lazy"
                  width="2048"
                  height="1075"
                />
                {videoId && (
                  <button
                    className="play-recording"
                    type="button"
                    onClick={() => setSelected(message)}
                    aria-label={'Play ' + message.title}
                    title={'Play ' + message.title}
                  >
                    <Play size={28} aria-hidden="true" fill="currentColor" />
                  </button>
                )}
              </div>
              <div className="recording-copy">
                {message.series && <p className="eyebrow">{message.series}</p>}
                <h3>{message.title}</h3>
                {message.speaker && <p>{message.speaker}</p>}
                {message.date && (
                  <p>
                    <time dateTime={message.date}>
                      {new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'long',
                        timeZone: 'America/Phoenix',
                      }).format(
                        new Date(
                          message.date.length === 10
                            ? message.date + 'T12:00:00-07:00'
                            : message.date,
                        ),
                      )}
                    </time>
                  </p>
                )}
                {videoId ? (
                  <button
                    className="text-link recording-action"
                    type="button"
                    onClick={() => setSelected(message)}
                  >
                    Watch message
                    <Play size={16} aria-hidden="true" />
                  </button>
                ) : (
                  videoUrl && (
                    <a
                      className="text-link"
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch message
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  )
                )}
                {audioUrl && (
                  <a className="text-link" href={audioUrl}>
                    Listen
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {shown.length === 0 && (
        <div className="empty-state">
          <h3>No matching messages</h3>
          <p>Try another title, speaker, or series.</p>
          <button
            type="button"
            className="button button-dark"
            onClick={() => setQuery('')}
          >
            Clear search
          </button>
        </div>
      )}
      <dialog
        ref={dialog}
        className="message-dialog"
        aria-labelledby="playing-title"
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {selected && (
          <>
            <div className="message-dialog-heading">
              <h2 id="playing-title">{selected.title}</h2>
              <button
                type="button"
                className="icon-button"
                onClick={close}
                aria-label="Close video"
                title="Close video"
              >
                <X size={22} />
              </button>
            </div>
            <div className="video-frame">
              <iframe
                src={
                  'https://www.youtube-nocookie.com/embed/' +
                  youtubeVideoId(selected.videoUrl ?? '') +
                  '?autoplay=1'
                }
                title={selected.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <a
              className="text-link"
              href={selected.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open on YouTube
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </>
        )}
      </dialog>
    </>
  );
}
